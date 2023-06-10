using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs.Facility
{
    public class AssignTaskToInsert
    {
         public string TaskType { get; set; }
        public string? TaskStatus { get; set; }
        public int BuildingId { get; set; }


        
    }
}