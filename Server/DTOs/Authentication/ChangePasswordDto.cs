using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class ChangePasswordDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string PreviousPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
        
    }

}