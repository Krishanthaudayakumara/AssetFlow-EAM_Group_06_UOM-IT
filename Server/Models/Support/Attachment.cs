namespace Server.Models.Support
{
    public class Attachment
    {
    public int Id { get; set; }
    public string Filename { get; set; }
    public string FileType { get; set; }
    public int FileSize { get; set; }
    public DateTime CreatedDate { get; set; }
    public int TicketId { get; set; }
    public Ticket Ticket { get; set; } 

    }
}