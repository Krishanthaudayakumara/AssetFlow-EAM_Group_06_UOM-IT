namespace Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int SupplyChainId { get; set; }
        public SupplyChain SupplyChain { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
        public bool IsCompleted { get; set; }
    }
}
