using System;
using System.Collections.Generic;

namespace Server.DTOs
{
    public class FacilityAssetToInsert
    {
        public int AssetId { get; set; }

       public string? AssetConditionStatus { get; set; }
       public DateTime? ReceivedDate { get; set; }
        public String? AssignStatus { get; set; }





        
    }
}