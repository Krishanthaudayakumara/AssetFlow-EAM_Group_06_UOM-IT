using System.ComponentModel.DataAnnotations;


namespace Server.DTOs.Facility
{
    public class AssinCleaningStaffViewModel
    {
        public int AssignTaskId { get; set; }
        public string TaskType { get; set; }
        public DateTime? TaskDate { get; set; }
        public string? TaskStatus { get; set; }
       
        public string BuildingName { get; set; }
        

    }    
        
       

      
    
}