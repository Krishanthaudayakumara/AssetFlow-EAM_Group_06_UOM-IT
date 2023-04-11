namespace Server.DTOs
{

    public class StockToUpdate
    {
        public String PurchasedDate { get; set; }
        public int Cost { get; set; }
        public String WarrantyExpiring { get; set; }
        public int SupplierId { get; set; }
        public int Amount { get; set; }
    }
}