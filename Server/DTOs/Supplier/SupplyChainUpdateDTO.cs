namespace Server.DTOs
{
    public class SupplyChainUpdateDTO
    {
        public int SupplierId { get; set; }
        public string AssetName { get; set; }
        public int SubCategoryId { get; set; }
        public string Status { get; set; }
        public int LowQuantityThreshold { get; set; }

            public int OrderQuantity { get; set; }

    }
}