namespace Server.DTOs.Dashboard
{
    public class EmployeeTableDTO
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public DateTime HireDate { get; set; }
    }
}