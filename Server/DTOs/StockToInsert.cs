namespace Server.DTOs
{

    public class StockToInsert
    {
        public int StockId { get; set; }
        public int SubCategoryId { get; set; }
        public String PurchasedDate { get; set; }
        public int Cost { get; set; }
        public String WarrantyExpiring { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }
    }
}