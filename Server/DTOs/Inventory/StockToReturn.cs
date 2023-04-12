using System;
using System.Collections.Generic;

namespace Server.DTOs
{

    public class StockToReturn
    {
        public int stockId { get; set; }
        public int SubCategoryId { get; set; }
        public String PurchasedDate { get; set; }
        public int Cost { get; set; }
        public String WarrantyExpiring { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }
    }
}