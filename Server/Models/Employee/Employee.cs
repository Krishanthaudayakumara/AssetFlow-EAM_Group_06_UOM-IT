using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Server.Models.Support;

namespace Server.Models
{
    public class Employee
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
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public string? JobTitle { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

        public ICollection<Ticket> Tickets { get; set; }

        
        public ICollection<Assign> Assigns { get; set; }
         public ICollection<EmployeeRequest> employeeRequests { get; set; }

    }
}
