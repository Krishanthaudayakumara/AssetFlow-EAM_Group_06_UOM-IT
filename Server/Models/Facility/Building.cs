
using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Building
    {
        public int Id {get; set;}
        public string BuildingName {get; set;}
        
        public int FloorNo{get; set;}
        public ICollection<Workstation> Workstations{get; set;}

        
    }
}