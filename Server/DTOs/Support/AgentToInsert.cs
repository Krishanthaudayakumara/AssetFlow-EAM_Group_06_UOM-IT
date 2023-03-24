namespace Server.DTOs.Support
{
    public class AgentToInsert
    {
        public string FirstName { get; set; }
        public string LaststName { get; set; }
        public string Contact { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public DateTime JoinDate { get; set; }
        public int TeamId { get; set; }
        public string AgentStatus { get; set; }
        public IFormFile ProfileImage { get; set; }       
     

    }
}