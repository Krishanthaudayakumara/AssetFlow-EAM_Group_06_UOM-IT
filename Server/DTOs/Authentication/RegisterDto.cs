using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class RegisterDto
    {
         [Required]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}