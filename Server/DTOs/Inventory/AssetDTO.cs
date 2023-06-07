using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class AssetDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int StockId { get; set; }
        public string Status { get; set; }
        public DateTime WarrantyExpiration { get; set; }
        public string ImageUrl { get; set; }
    }
}
