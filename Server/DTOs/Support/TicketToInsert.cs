using System;

namespace Server.DTOs.Support
{
    public class TicketToInsert
    {
        public int EmployeeId { get; set; }
        public string Email { get; set; }
        public int IssueTypeId { get; set; }
        public string Problem { get; set; }
       


    }
}