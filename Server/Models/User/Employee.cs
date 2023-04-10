using Server.Models.Support;

namespace Server.Models.User
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}