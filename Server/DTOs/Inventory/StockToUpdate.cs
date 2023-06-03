using System;
using System.Collections.Generic;

namespace Server.DTOs
{

      public class StockToUpdate
    {
        public int SubCategoryId { get; set; }
        public string PurchasedDate { get; set; }
        public int Cost { get; set; }
        public string WarrantyExpiring { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }
    }
}