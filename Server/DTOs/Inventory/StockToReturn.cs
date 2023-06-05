using System;
using System.Collections.Generic;

namespace Server.DTOs
{

    public class StockToReturn
    {
        public int StockId { get; set; }
        public string SubCategoryType { get; set; }
        public string PurchasedDate { get; set; }
        public int Cost { get; set; }
        public string WarrantyExpiring { get; set; }
        public string SupplierName { get; set; }
        public int Amount { get; set; }
    }
}