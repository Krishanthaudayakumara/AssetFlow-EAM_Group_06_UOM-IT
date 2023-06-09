using Microsoft.AspNetCore.Http;

namespace Server.DTOs.Support
{
    public class AgentToInsert
    {
        public IFormFile ProfileImage { get; set; }   
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public int TeamId { get; set; }
        public string AgentStatus { get; set; } 
     

    }
}