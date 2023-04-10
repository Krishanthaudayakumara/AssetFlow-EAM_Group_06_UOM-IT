using System;

namespace Server.DTOs.Support
{
    public class ReplyToInsert
    {
        public string Text { get; set; }
        public DateTime ReplyDate { get; set; }
        public int TicketId { get; set; }
    }
}