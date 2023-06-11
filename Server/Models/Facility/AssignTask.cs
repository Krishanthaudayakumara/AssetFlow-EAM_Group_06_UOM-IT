using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Facility
{
    public class AssignTask
    {
         public int Id {get; set;}
         public string TaskType { get; set; }
         public DateTime? TaskDate { get; set; }
         public string? TaskStatus { get; set; }
         public int? ExternalWorkerId { get; set; }
        public ExternalWorker? ExternalWorker { get; set; }
        public int BuildingId { get; set; } // Foreign key
        public Building Building { get; set; } // Navigation property
         
        
    }
}