namespace Server.DTOs.Report
{
    public class WarrantyExpirationReportDTO
    {
      public int AssetId { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }//
        public DateTime WarrantyExpiration { get; set; }
        public string Status { get; set; }
        public DateTime PurchasedDate { get; set; }
        public float Cost { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }  
    }
}