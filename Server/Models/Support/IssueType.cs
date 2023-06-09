using System;
using System.Collections.Generic;


namespace Server.Models.Support
{
    public class IssueType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}