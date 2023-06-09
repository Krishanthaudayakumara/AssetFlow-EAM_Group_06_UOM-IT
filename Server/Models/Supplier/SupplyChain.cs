using System;

namespace Server.Models
{
    public class SupplyChain
    {
        public int Id { get; set; }

        public int SupplierId { get; set; }

        public Supplier Supplier { get; set; }

        public string AssetName { get; set; }

        public int SubCategoryId { get; set; }

        public SubCategory SubCategory { get; set; }

        public string Status { get; set; }

        public int LowQuantityThreshold { get; set; }

        public int OrderQuantity { get; set; }

    }
}
