using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System;

namespace Server.DTOs.Facility
{
    public class AssignTaskToInsert
    {
        public int BuildingId { get; set; }
        public string TaskType { get; set; }
        public string TaskStatus { get; set; }
    }
}
