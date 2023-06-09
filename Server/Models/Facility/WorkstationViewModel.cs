using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Facility
{
    public class WorkstationViewModel
    {
        public int Id{ get; set; }
        public string BuildingName{ get; set; }
        
        public string type { get; set; }
        public int Floor { get; set; }
    }
}