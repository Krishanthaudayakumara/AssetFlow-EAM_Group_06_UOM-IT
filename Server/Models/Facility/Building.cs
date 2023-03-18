namespace Server.Models.Facility
{
    public class Building
    {
        public int Id {get; set;}
        public string BuildingName {get; set;}
        
        public int FloorNo{get; set;}
        public ICollection<Workstation>Workstations{get; set;}

        
    }
}