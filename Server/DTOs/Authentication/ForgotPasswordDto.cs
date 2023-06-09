using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }

}