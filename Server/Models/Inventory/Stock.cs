using System;

namespace Server.Models
{
    public class Stock
    {
        public int StockId { get; set; }
     //  public int SubCategoryId { get; set; }
        public string SubCategoryType { get; set; }
       // public SubCategory SubCategory { get; set; }
        public string PurchasedDate { get; set; }
        public int Cost { get; set; }
        public string WarrantyExpiring { get; set; }
        public string SupplierName { get; set; }
       // public Supplier Supplier { get; set; }
        public int Amount { get; set; }
    }
}
