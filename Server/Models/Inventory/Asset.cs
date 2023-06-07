using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Asset
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string? Barcode { get; set; }


        public string Status { get; set; }

        public string Condition { get; set; }

        public DateTime WarrantyExpiration { get; set; }

        public int StockId { get; set; }

        public Stock Stock { get; set; }

        public string ImageUrl { get; set; }
        public FacilityAsset FacilityAsset { get; set; }
    }
}
