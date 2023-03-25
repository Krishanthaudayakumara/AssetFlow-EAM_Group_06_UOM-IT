using Server.Models.Inventory;



namespace Server.Models.Facility
{
    public class FacilityAsset
    {
        public int Id{get; set;}
        public int AssetId{ get; set; }
        public Asset Asset { get; set; }


               
         
        public string  AssetConditionStatus { get; set; }

        public int WorkstationId{get; set;}
        
        public DateTime AssignedDate { get; set; }
        public DateTime ReceivedDate{get;set;}
        
        public Workstation Workstation{get; set;}
        public int SubcategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public string Vendor{ get; set; }

        public string Description { get; set; }



        
        

        
        
       


                 


        
    }
}