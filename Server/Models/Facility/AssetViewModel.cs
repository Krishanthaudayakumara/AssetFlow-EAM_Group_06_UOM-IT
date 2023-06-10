

namespace Server.Models
{
    public class AssetViewModel
    {
     public int AssetId { get; set; }
     public string AssetName { get; set; }

    public string Description { get; set; }

     public string SubCategoryType { get; set; }

     public string CategoryType{ get; set; }

    public string StockImageUrl { get; set; }



   
     // public string Supplier { get; set; }
     // public int  SubCategoryId { get; set; }
     // public int CategoryId{ get; set; }
     public int FacilityAssetId { get; set; }
    }
}