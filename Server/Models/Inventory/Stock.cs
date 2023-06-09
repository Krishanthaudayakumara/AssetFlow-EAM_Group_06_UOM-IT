using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Stock
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public int SubCategoryId { get; set; }

        public SubCategory SubCategory { get; set; }

        public int SupplierId { get; set; }

        public Supplier Supplier { get; set; }

        public string ImageUrl { get; set; }

        public float Cost { get; set; }

        public DateTime ArrivalDate { get; set; }

        public ICollection<Asset> Assets { get; set; }
        
        public int? SupplyChainId { get; set; } // Nullable foreign key
        public SupplyChain? SupplyChain { get; set; } // Navigation property
    }
}
