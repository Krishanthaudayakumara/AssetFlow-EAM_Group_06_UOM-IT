namespace Server.DTOs.Report
{
    public class WarrantyExpirationReportDTO
    {
      public int AssetId { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }//
        public string WarrantyExpiration { get; set; }
        public string Status { get; set; }
        public string PurchasedDate { get; set; }
        public int Cost { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }  
    }
}