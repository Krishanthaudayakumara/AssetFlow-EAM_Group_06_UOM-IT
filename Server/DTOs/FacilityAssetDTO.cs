namespace Server.DTOs
{
    public class FacilityAssetDTO
{
    public int Id { get; set; }
    public int AssetId { get; set; }
    public string AssetConditionStatus { get; set; }
    public int WorkstationId { get; set; }
    public DateTime AssignedDate { get; set; }
    public DateTime ReceivedDate { get; set; }
}
}