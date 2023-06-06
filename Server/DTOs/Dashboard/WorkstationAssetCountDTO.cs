namespace Server.DTOs.Dashboard
{
    public class WorkstationAssetCountDTO
    {
        public int WorkstationId { get; set; }
        public int NotAssignedCount { get; set; }
        public int AssignedCount { get; set; }
    }
}