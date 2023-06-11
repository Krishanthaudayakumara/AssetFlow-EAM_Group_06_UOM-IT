using System.ComponentModel.DataAnnotations;
using System;
using Server.Models.Facility;

namespace Server.Models
{
    public class ExternalWorker 
    {
         public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? MiddleName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public string? JobTitle { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public bool IsDeleted { get; internal set; }
         public ICollection<AssignTask> AssignTasks { get; set; }
    }
}