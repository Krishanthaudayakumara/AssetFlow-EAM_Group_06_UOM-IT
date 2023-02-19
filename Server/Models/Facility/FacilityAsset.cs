namespace Server.Models.Facility
{
    public class FacilityAsset
    {
        public int Id{get; set;}
        public string ItemName {get; set;}
        public string Description {get; set;}
        public int ItemCount{get; set;}
        public string Status {get; set;}
        public int WorkstationId{get; set;}
        public Workstation Workstation{get; set;}


                 


        
    }
}