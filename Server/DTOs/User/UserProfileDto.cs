using Server.DTOs;
using Server.Models;

namespace Server.Dtos
{
    public class UserProfileDto
    {
        public UserDto User { get; set; }
        public List<AccessLog> AccessLogs { get; set; }
        public EmployeeDto Employee { get; set; }
    }
}
