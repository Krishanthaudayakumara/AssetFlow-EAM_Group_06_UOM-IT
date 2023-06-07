using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{

    public class AssetStockDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ArrivalDate { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string ImageUrl { get; set; }
    }
}
