using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
    public class User : IdentityUser
    {
        public string? Role { get; set; }
        public bool IsDeleted { get; set; }
    }
}
