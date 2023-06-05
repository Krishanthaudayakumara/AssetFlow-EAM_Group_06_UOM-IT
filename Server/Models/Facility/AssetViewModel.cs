

namespace Server.Models
{
    public class AssetViewModel
    {
     public int AssetId { get; set; }
     public string Description{ get; set; }
     public string Vendor { get; set; }
     public int  SubCategoryId { get; set; }
     public string CategoryId{ get; set; }/// int -> string 
     public int FacilityAssetId { get; set; }
    }
}