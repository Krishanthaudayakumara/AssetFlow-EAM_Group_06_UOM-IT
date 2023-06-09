namespace Server.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int SupplyChainId { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
        public bool IsCompleted { get; set; }
    }
}
