using System.Collections.Generic;

namespace Server.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }

        public ICollection<Stock> Stocks { get; set; }

    }

}