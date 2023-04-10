using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public EmployeeController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Department)
                .ToListAsync();
            return employees;
        }


        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.User)
                .Include(e => e.Department)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }


        // POST: api/Employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeDto employeeDto)
        {
            // Check if email already exists
            var emailExists = await _userManager.FindByEmailAsync(employeeDto.Email);
            if (emailExists != null)
            {
                return BadRequest("Email already exists");
            }

            // Check if phone number already exists
            var phoneNumberExists = await _context.Employees.AnyAsync(e => e.PhoneNumber == employeeDto.PhoneNumber);
            if (phoneNumberExists)
            {
                return BadRequest("Phone number already exists");
            }

            // Check if username already exists
            var usernameExists = await _userManager.FindByNameAsync(employeeDto.UserName);
            if (usernameExists != null)
            {
                return BadRequest("Username already exists");
            }

            var employee = new Employee
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                MiddleName = employeeDto.MiddleName,
                DepartmentId = employeeDto.DepartmentId,
                Email = employeeDto.Email,
                PhoneNumber = employeeDto.PhoneNumber,
                DateOfBirth = employeeDto.DateOfBirth,
                HireDate = employeeDto.HireDate,
                JobTitle = employeeDto.JobTitle,
                User = new User { UserName = employeeDto.UserName, Email = employeeDto.Email, Role = "employee" }
            };

            _context.Employees.Add(employee);

            var result = await _userManager.CreateAsync(employee.User, employeeDto.Password);
            if (!result.Succeeded)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return BadRequest(result.Errors);
            }

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }


        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeDto employeeDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
            employee.MiddleName = employeeDto.MiddleName;
            employee.DepartmentId = employeeDto.DepartmentId;
            employee.Email = employeeDto.Email;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.DateOfBirth = employeeDto.DateOfBirth;
            employee.HireDate = employeeDto.HireDate;
            employee.JobTitle = employeeDto.JobTitle;


            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportEmployees()
        {
            var employees = await _context.Employees.ToListAsync();

            // Create the excel file
            var excelPackage = new ExcelPackage();
            var worksheet = excelPackage.Workbook.Worksheets.Add("Employees");

            // Add the headers
            worksheet.Cells[1, 1].Value = "First Name";
            worksheet.Cells[1, 2].Value = "Last Name";
            worksheet.Cells[1, 3].Value = "Email";
            worksheet.Cells[1, 4].Value = "Phone Number";
            worksheet.Cells[1, 5].Value = "Date of Birth";
            worksheet.Cells[1, 6].Value = "Hire Date";
            worksheet.Cells[1, 7].Value = "Job Title";
            worksheet.Cells[1, 8].Value = "Department";

            // Add the data
            var row = 2;
            foreach (var employee in employees)
            {
                worksheet.Cells[row, 1].Value = employee.FirstName;
                worksheet.Cells[row, 2].Value = employee.LastName;
                worksheet.Cells[row, 3].Value = employee.Email;
                worksheet.Cells[row, 4].Value = employee.PhoneNumber;
                worksheet.Cells[row, 5].Value = employee.DateOfBirth;
                worksheet.Cells[row, 6].Value = employee.HireDate;
                worksheet.Cells[row, 7].Value = employee.JobTitle;
                worksheet.Cells[row, 8].Value = employee.Department == null ? "" : employee.Department.Name;
                row++;
            }

            // Set the content type and filename
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var fileName = "employees.xlsx";

            // Convert the excel package to a byte array
            var byteArray = excelPackage.GetAsByteArray();

            // Return the excel file
            return File(byteArray, contentType, fileName);
        }

        [HttpGet("download/sample")]
        public IActionResult DownloadSampleFile()
        {
            // Create the excel file
            var excelPackage = new ExcelPackage();
            var worksheet = excelPackage.Workbook.Worksheets.Add("Sample Employees");

            // Add the headers
            worksheet.Cells[1, 1].Value = "First Name";
            worksheet.Cells[1, 2].Value = "Last Name";
            worksheet.Cells[1, 3].Value = "Middle Name";
            worksheet.Cells[1, 4].Value = "Email";
            worksheet.Cells[1, 5].Value = "Phone Number";
            worksheet.Cells[1, 6].Value = "Date of Birth";
            worksheet.Cells[1, 7].Value = "Hire Date";
            worksheet.Cells[1, 8].Value = "Job Title";
            worksheet.Cells[1, 9].Value = "Department Name";
            worksheet.Cells[1, 10].Value = "Username";
            worksheet.Cells[1, 11].Value = "Password";

            // Add sample data
            worksheet.Cells[2, 1].Value = "John";
            worksheet.Cells[2, 2].Value = "Doe";
            worksheet.Cells[2, 3].Value = "James";
            worksheet.Cells[2, 4].Value = "john.doe@example.com";
            worksheet.Cells[2, 5].Value = "1234567890";
            worksheet.Cells[2, 6].Value = new DateTime(1990, 1, 1);
            worksheet.Cells[2, 7].Value = new DateTime(2021, 1, 1);
            worksheet.Cells[2, 8].Value = "Software Engineer";
            worksheet.Cells[2, 9].Value = "Engineering";
            worksheet.Cells[2, 10].Value = "johndoe";
            worksheet.Cells[2, 11].Value = "Password123!";

            // Set the content type and filename
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var fileName = "employees_sample.xlsx";

            // Convert the excel package to a byte array
            var byteArray = excelPackage.GetAsByteArray();

            // Return the excel file
            return File(byteArray, contentType, fileName);
        }



        [HttpPost("upload")]
        public async Task<IActionResult> UploadEmployees(IFormFile file)
        {
            // Check if file is null or empty
            if (file == null || file.Length == 0)
            {
                return BadRequest("File not selected or empty");
            }

            // Check if file is not an excel file
            var extension = Path.GetExtension(file.FileName);
            if (extension != ".xlsx" && extension != ".xls")
            {
                return BadRequest("Invalid file format, only Excel files are allowed");
            }

            // Read the uploaded file into a memory stream
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                // Load the excel file into an ExcelPackage object
                using (var excelPackage = new ExcelPackage(stream))
                {
                    var worksheet = excelPackage.Workbook.Worksheets.First();

                    // Check if the worksheet has the correct headers
                    var headers = new string[]
                    {
                "First Name", "Last Name", "Middle Name",
                "Email", "Phone Number", "Date of Birth",
                "Hire Date", "Job Title", "Department Name",
                "Username", "Password"
                    };

                    if (!headers.All(h => worksheet.Cells[1, Array.IndexOf(headers, h) + 1].Value.ToString() == h))
                    {
                        return BadRequest("Invalid excel file format");
                    }


                    // Loop through the rows in the worksheet and create new employees with user accounts
                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var firstName = worksheet.Cells[row, 1].Value?.ToString();
                        var lastName = worksheet.Cells[row, 2].Value?.ToString();
                        var middleName = worksheet.Cells[row, 3].Value?.ToString();
                        var email = worksheet.Cells[row, 4].Value?.ToString();
                        var phoneNumber = worksheet.Cells[row, 5].Value?.ToString();
                        var dateOfBirth = worksheet.Cells[row, 6].Value as DateTime?;
                        var hireDate = worksheet.Cells[row, 7].Value as DateTime?;
                        var jobTitle = worksheet.Cells[row, 8].Value?.ToString();
                        var departmentName = worksheet.Cells[row, 9].Value?.ToString();
                        var username = worksheet.Cells[row, 10].Value?.ToString();
                        var password = worksheet.Cells[row, 11].Value?.ToString();

                        // Check if required fields are present
                        if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) ||
                            string.IsNullOrEmpty(email) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                        {
                            continue;
                        }

                        // Check if email and username are unique
                        if (await _context.Employees.AnyAsync(e => e.Email == email) ||
                            await _context.Users.AnyAsync(u => u.UserName == username))
                        {
                            continue;
                        }

                        // Get or create the department
                        var department = await _context.Departments.FirstOrDefaultAsync(d => d.Name == departmentName);
                        if (department == null)
                        {
                            department = new Department { Name = departmentName, Description = "Department description goes here" };
                            _context.Departments.Add(department);
                            await _context.SaveChangesAsync();
                        }


                        // Create the employee
                        var employee = new Employee
                        {
                            FirstName = firstName,
                            LastName = lastName,
                            MiddleName = middleName,
                            Email = email,
                            PhoneNumber = phoneNumber,
                            DateOfBirth = dateOfBirth.HasValue ? (DateTime)dateOfBirth : DateTime.MinValue,
                            HireDate = hireDate.HasValue ? (DateTime)hireDate : DateTime.MinValue,
                            JobTitle = jobTitle,
                            DepartmentId = department.Id,
                            User = new User { UserName = username, Email = email, Role = "employee" }
                        };


                        // Add the employee to the database
                        _context.Employees.Add(employee);
                        var result = await _userManager.CreateAsync(employee.User, password);

                        if (!result.Succeeded)
                        {
                            _context.Employees.Remove(employee);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }

            // Return success message
            return Ok("Employees uploaded successfully");
        }


        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
