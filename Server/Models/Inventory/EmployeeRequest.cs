using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class EmployeeRequest
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public string Request { get; set; }
        public ICollection<Assign> Assigns { get; set; }

    }
}