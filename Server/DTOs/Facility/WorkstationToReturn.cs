
namespace Server.DTOs
{
    public class WorkstationToReturn
    {
        public int Id{get; set;}
        public string WorkstationName {get; set;}
        public int Floor { get; set; }

        public int BuildingId {get; set;}
        
    }
}