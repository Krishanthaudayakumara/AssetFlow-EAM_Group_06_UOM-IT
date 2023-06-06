using System;
using System.Collections.Generic;
using System;

namespace Server.Controllers.InventoryControllers

{
    public class AssetToReturn
    {
        public int Id { get; set; }
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
