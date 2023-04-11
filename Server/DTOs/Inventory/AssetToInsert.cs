namespace Server.DTOs
{

    public class AssetToInsert
    {
        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string condition { get; set; }
        public DateTime WarrentyExpiration { get; set; }
        public int StockId { get; set; }

    }
}