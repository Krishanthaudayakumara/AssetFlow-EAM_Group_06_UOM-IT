using System;
using System.Collections.Generic;

namespace Server.DTOs
{
    public class FacilityAssetToInsert
    {
        public int AssetId { get; set; }

       public string? AssetConditionStatus { get; set; }
       public DateTime? ReceivedDate { get; set; }
        public string? AssignStatus { get; set; }
        public int? WorkstationId { get; set; }

        public DateTime? AssignedDate { get; set; }







        
    }
}