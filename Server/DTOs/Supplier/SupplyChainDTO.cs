using Server.Models;

namespace Server.DTOs
{
    public class SupplyChainDTO
    {
        public int Id { get; set; }
        public SupplierDto Supplier { get; set; }
        public string AssetName { get; set; }
        public SubCategoryDTO SubCategory { get; set; }
        public string Status { get; set; }
        public int LowQuantityThreshold { get; set; }
        public int OrderQuantity { get; set; }

        public string AssetImage { get; set; } // Add AssetImage property

    }
}
