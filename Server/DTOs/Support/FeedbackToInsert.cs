namespace Server.DTOs.Support
{
    public class FeedbackToInsert
    {
       public string Rating{ get; set; }
       public string Comment { get; set; }
       public int TicketId { get; set; }
    }
}