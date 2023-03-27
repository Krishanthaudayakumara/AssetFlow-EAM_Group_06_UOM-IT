namespace Server.Models.Facility
{
    public class FacilityAsset
    {
        public int Id{get; set;}
        public string ItemName {get; set;}
        public string ModelNo{get;set;}
        public string Description {get; set;}
        public int ItemCount{get; set;}
        public string  AssetStatus { get; set; }
        public int WorkstationId{get; set;}
        public string Manufacturer { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime RecievedDate{get;set;}
        public Workstation Workstation{get; set;}
       


     }
}
   