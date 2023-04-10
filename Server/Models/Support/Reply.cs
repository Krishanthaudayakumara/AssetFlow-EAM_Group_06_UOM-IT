using System;


namespace Server.Models.Support
{
    public class Reply
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime ReplyDate { get; set; }
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}