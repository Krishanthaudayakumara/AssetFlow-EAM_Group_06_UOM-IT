namespace Server.Models
{
    public class Workstation
    {
        public int Id{get; set;}
    
        public string WorkstationName {get; set;}
        public int Floor { get; set; }
        public ICollection<FacilityAsset>FacilityAssets{get; set;}
        public int BuildingId {get; set;}
        public Building Building{get; set;}
        
    }
}