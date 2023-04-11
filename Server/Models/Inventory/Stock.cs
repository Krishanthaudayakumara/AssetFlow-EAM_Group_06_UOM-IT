namespace Server.Models
{
    public class Stock
    {
        public int StockId { get; set; }
        public int SubCategoryId { get; set; }
        //public SubCategory SubCategory { get; set; }

        public String PurchasedDate { get; set; }
        public int Cost { get; set; }
        public String WarrantyExpiring { get; set; }
        public int SupplierId { get; set; }
        //public Supplier Supplier{get;set;}
        public int Amount { get; set; }
        //public ICollection<Asset> Assets { get; set; }


    }
}