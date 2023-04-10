using System;
using System.Collections.Generic;


namespace Server.Models.Support
{
    public class Agent
    {
        public int Id { get; set; }
        public string ProfileImage { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
        public string AgentStatus { get; set; }
        public DateTime JoinDate { get; set; }      
        public ICollection<Ticket> Tickets { get; set; }
    }
}