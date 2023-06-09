namespace Server.DTOs
{
    public class AssetSummaryDTO
    {
        public string AssetName { get; set; }
        public int TotalCount { get; set; }
        public Dictionary<string, int> StatusCounts { get; set; }
        public Dictionary<string, int> ConditionCounts { get; set; }
        public string? ImageUrl { get; set; }


    }
}
