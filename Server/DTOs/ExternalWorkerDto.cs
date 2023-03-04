using System;

namespace Server.Dtos
{
    public class ExternalWorkerDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public string JobTitle { get; set; }
        public int DepartmentId { get; set; }
    }
}
