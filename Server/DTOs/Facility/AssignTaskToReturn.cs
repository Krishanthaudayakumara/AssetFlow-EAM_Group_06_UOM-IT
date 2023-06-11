using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs.Facility
{
    public class AssignTaskToReturn
    {
        public int Id {get; set;}
         public string TaskType { get; set; }
         public DateTime? TaskDate { get; set; }
         public string? TaskStatus { get; set; }
         public int? ExternalWorkerId { get; set; }
        
        
    }
}