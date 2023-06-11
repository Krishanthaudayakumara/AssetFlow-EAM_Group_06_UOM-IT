namespace Server.DTOs.Report
{
    public class AssetAssignmentReportDTO
    { 
    public int AssetId { get; set; }
    public string AssetConditionStatus { get; set; }
    public string WorkstationType { get; set; }
    public string AssignStatus { get; set; }
    public DateTime? AssignedDate { get; set; }
    public DateTime? ReceivedDate { get; set; }
    public string BuildingName { get; set; }
    public int? FloorNo { get; set; }

    }
}