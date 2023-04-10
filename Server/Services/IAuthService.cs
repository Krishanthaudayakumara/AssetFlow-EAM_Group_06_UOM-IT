using Server.Models;
using Server.DTOs;

using System.Threading.Tasks;

namespace Server.Services
{
    public interface IAuthService
    {
        Task<string> GenerateJwtToken(User user);
        Task<User> Login(string email, string password);
        Task<User> Register(RegisterDto registerDto);
    }
}
