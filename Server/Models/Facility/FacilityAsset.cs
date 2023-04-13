using Server.Models;
using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class FacilityAsset
    {
        public int Id { get; set; }
        public int AssetId { get; set; }
        public Asset Asset { get; set; }
        public string? AssetConditionStatus { get; set; }
        public int? WorkstationId { get; set; }

        public String? AssignStatus { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ReceivedDate { get; set; }
        public Workstation? Workstation { get; set; }
    }
}
