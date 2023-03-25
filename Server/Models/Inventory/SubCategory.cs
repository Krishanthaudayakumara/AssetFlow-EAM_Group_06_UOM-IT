

using Server.Models.Facility;

namespace Server.Models.Inventory
{
    public class SubCategory
    {
        public int Id{ get; set; }
        public String SubCategoryType { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Asset> Assets { get; set; }
         public ICollection<FacilityAsset> FacilityAssets { get; set; }


        
    }
}