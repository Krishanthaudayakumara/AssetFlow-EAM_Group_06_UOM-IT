namespace Server.DTOs.Support
{
    public class AgentToReturn
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }        
        public DateTime JoinDate { get; set; }
        public int TeamId { get; set; }
        public string AgentStatus { get; set; }
        
    }
}