using Server.Models;
using System;


namespace Server.Models.Support
{
    public class Ticket
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public string Email { get; set; }
        public int IssueTypeId { get; set; }
        public IssueType IssueType { get; set; }
        public string Problem { get; set; }
        public DateTime SubmitDate { get; set; }
        public Reply Reply { get; set; }
        public int? AgentId { get; set; }
        public Agent Agent { get; set; }
        public Feedback Feedback { get; set; }
        public string TicketStatus { get; set; }
        

    }
}