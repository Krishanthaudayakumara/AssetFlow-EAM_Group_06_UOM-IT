
using System;
using System.Collections.Generic;

namespace Server.DTOs
{
    public class FacAssetToInsert
    {
        public string ItemName {get; set;}
        public string Description {get; set;}
        public int ItemCount{get; set;}
        public string Status {get; set;}
        public string Manufacturer { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime StartDate{get;set;}
        public int WorkstationId{get; set;}
        
    }
}