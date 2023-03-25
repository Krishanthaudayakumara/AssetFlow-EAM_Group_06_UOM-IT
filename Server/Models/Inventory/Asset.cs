

namespace Server.Models.Inventory
{
    public class Asset
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string condition { get; set; }
        public DateTime WarrentyExpiration { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public ICollection<Assign> Assigns { get; set; }



    }
}
    
