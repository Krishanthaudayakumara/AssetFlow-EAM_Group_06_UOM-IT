
namespace Server.Models.Facility
{
    public class Workstation
    {
        public int Id{get; set;}
        public string type {get; set;}
        public ICollection<FacilityAsset>FacilityAssets{get; set;}
        public int BuildingId {get; set;}
        public Building Building{get; set;}



        
    }
}