using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
        public string WarrantyExpiration { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public ICollection<Assign> Assigns { get; set; }
        public FacilityAsset FacilityAsset { get; set; }
        public string BarcodeImageBase64 { get; set; }
    }
    
   public class AssetToCreate
    {
        public string Barcode { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
        public string WarrantyExpiration { get; set; }
        public int StockId { get; set; }
        public string BarcodeImageBase64 { get; set; }
    }
}
