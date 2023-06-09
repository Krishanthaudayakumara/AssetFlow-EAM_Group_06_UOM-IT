using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Dtos;
using Server.DTOs;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly DataContext _context;
        private readonly IEmailService _emailService;


        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, DataContext context, IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _emailService = emailService; // Assign the field
        }



        [HttpPost("register")]

        public async Task<IActionResult> Register(RegisterDto model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return BadRequest("Username already exists");
            }

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
            {
                return BadRequest("Email already exists");
            }

            var user = new User
            {
                Email = model.Email,
                UserName = model.Username,
                Role = model.Role
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Read the HTML template
            var emailTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates/WelcomeEmailTemplate.html");
            var emailTemplate = await System.IO.File.ReadAllTextAsync(emailTemplatePath);

            var emailContent = emailTemplate.Replace("{{Email}}", model.Email).Replace("{{Password}}", model.Password);

            // Send the HTML email
            await _emailService.SendEmailAsync(user.Email, "Welcome to Assetflow", emailContent, true);

            return Ok(new AuthResponseDto { Message = "Registration successful" });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest(new AuthResponseDto { Message = "Invalid username or password", IsSuccess = false });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return BadRequest(new AuthResponseDto { Message = "Invalid username or password", IsSuccess = false });
            }

            // Update last access time
            user.LastAccess = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            // Create access log entry
            var accessLog = new AccessLog
            {
                AccessTime = DateTime.UtcNow,
                IPAddress = HttpContext.Connection.RemoteIpAddress.ToString(),
                UserId = user.Id
            };
            await _context.AccessLogs.AddAsync(accessLog);
            await _context.SaveChangesAsync();


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("very_secret_key_for_jwt_token");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var authResponse = new AuthResponseDto
            {
                Token = tokenString,
                IsSuccess = true,
                Expiration = token.ValidTo,
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Role = user.Role
                }
            };

            return Ok(authResponse);
        }


        [HttpGet("auth-status")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AuthStatus()
        {
            var currentUser = HttpContext.User;
            var userId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = currentUser.FindFirst(ClaimTypes.Name)?.Value;
            var userEmail = currentUser.FindFirst(ClaimTypes.Email)?.Value;
            var userRole = currentUser.FindFirst(ClaimTypes.Role)?.Value;

            return Ok("autherized");
        }

        [HttpGet("users")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.Where(u => !u.IsDeleted).Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.UserName,
                Email = u.Email,
                Role = u.Role,
                LastAccess = u.LastAccess

            }).ToListAsync();

            return Ok(users);
        }

        [HttpDelete("users/{userId}")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.IsDeleted = true; // set the IsDeleted property
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        //get deleted users
        [HttpGet("users/deleted")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetDeletedUsers()
        {
            var deletedUsers = await _userManager.Users.Where(u => u.IsDeleted).Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.UserName,
                Email = u.Email,
                Role = u.Role
            }).ToListAsync();

            return Ok(deletedUsers);
        }

        // under delete
        [HttpDelete("users/deleted/{userId}")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteDeletedUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }


        //restore deleted user
        [HttpPost("users/deleted/{userId}/restore")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> RestoreDeletedUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.IsDeleted = false;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }



        [HttpPut("users/{userId}")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateUser(string userId, UpdateUserDto model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.UserName = model.Username;
            user.Email = model.Email;
            user.Role = model.Role;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        //logout
        [HttpPost("logout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new AuthResponseDto { Message = "Logged out successfully" });
        }



        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);

            // Manually construct the URL to ensure proper encoding
            var resetPasswordUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/auth/reset-password?userId={user.Id}&token={encodedToken}";

            await _emailService.SendEmailAsync(user.Email, "Reset Password", $"Please reset your password by clicking here: {resetPasswordUrl}", true);

            return Ok("Password reset link has been sent to your email.");
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var decodedToken = HttpUtility.UrlDecode(model.Token);
            var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Your password has been reset successfully.");
        }

        [HttpPost("change-password")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Invalid username");
            }

            var result = await _userManager.ChangePasswordAsync(user, model.PreviousPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Password changed successfully.");
        }


        [HttpGet("users/{userId}/access-log")]
        public async Task<IActionResult> GetUserAccessLog(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var accessLogs = await _context.AccessLogs
                .Where(log => log.UserId == userId)
                .ToListAsync();

            return Ok(accessLogs);
        }


        [HttpGet("users/{username}")]
        public async Task<IActionResult> GetUserProfile(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            var userProfile = new UserProfileDto
            {
                User = new UserDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Role = user.Role
                },
                AccessLogs = await _context.AccessLogs
                    .Where(log => log.UserId == user.Id)
                    .Select(log => new AccessLog
                    {
                        Id = log.Id,
                        AccessTime = log.AccessTime,
                        IPAddress = log.IPAddress,
                        UserId = log.UserId
                    })
                    .ToListAsync(),
                Employee = await _context.Employees
                    .Where(e => e.UserId == user.Id)
                    .Select(e => new EmployeeDto
                    {
                        Id = e.Id,
                        FirstName = e.FirstName,
                        LastName = e.LastName,
                        MiddleName = e.MiddleName,
                        Email = e.Email,
                        PhoneNumber = e.PhoneNumber,
                        DateOfBirth = e.DateOfBirth,
                        HireDate = e.HireDate,
                        JobTitle = e.JobTitle,
                        DepartmentId = e.DepartmentId,
                        UserName = e.User.UserName,
                        Password = null
                    })
                    .FirstOrDefaultAsync()
            };

            Console.WriteLine(userProfile);

            return Ok(userProfile);
        }


    }
}
