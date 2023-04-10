using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? MiddleName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public DateTime HireDate { get; set; }
        public string? JobTitle { get; set; }
        [Required]
        public int DepartmentId { get; set; }
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}