using System;
using System.Collections.Generic;
using Server.Models.Support;

namespace Server.DTOs.Support
{
    public class TeamToReturn
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set;}
         public DateTime CreateDate { get; set; }
        public ICollection<Agent> Agents { get; set; }
    }
}