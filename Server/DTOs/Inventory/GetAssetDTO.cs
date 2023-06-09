using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class GetAssetDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Barcode { get; set; }
    public int StockId { get; set; }
    public string Status { get; set; }
    public string Condition { get; set; } // Add this property
    public DateTime WarrantyExpiration { get; set; }
    public string ImageUrl { get; set; }
    public AssetStockDTO Stock { get; set; }
}

}
