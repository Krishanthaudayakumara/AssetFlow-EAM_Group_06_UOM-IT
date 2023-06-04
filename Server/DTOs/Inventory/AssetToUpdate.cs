using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class AssetToUpdate
    {
         public int Id { get; set; }
        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
        public string WarrantyExpiration { get; set; }
        public int StockId { get; set; }
        public string? BarcodeImageBase64 { get; set; }
    }
}




