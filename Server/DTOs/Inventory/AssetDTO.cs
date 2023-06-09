using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class AssetDTO
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public int StockId { get; set; }

        public string Status { get; set; }

        public string Condition { get; set; }

        [Required]
        public DateTime WarrantyExpiration { get; set; }

        public IFormFile Image { get; set; }
    }
}

