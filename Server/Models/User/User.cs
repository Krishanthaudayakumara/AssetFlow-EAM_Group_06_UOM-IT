

using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
    public class User : IdentityUser
    {
        public string? Role { get; set; }
        // Other properties like email, first name, last name, etc.
    }
}
