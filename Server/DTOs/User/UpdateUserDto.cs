using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
   public class UpdateUserDto
   {
      public string Id { get; set; }

      [Required]
      public string Username { get; set; }

      [Required]
      [EmailAddress]
      public string Email { get; set; }

      [Required]
      public string Role { get; set; }
   }
}
