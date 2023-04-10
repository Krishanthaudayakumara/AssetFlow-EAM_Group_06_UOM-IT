using System;

namespace Server.DTOs.Support
{
    public class TicketToInsert
    {
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public int IssueTypeId { get; set; }
        public string Problem { get; set; }
        public DateTime SubmitDate { get; set; }
        public int AgentId { get; set; }
        public string TicketStatus { get; set; }

    }
}