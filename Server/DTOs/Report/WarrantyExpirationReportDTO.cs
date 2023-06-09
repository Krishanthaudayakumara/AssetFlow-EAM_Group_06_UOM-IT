namespace Server.DTOs.Report
{
    public class WarrantyExpirationReportDTO
    {
       public int AssetId { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public DateTime WarrantyExpiration { get; set; }
        public string Vendor { get; set; }
    }
}