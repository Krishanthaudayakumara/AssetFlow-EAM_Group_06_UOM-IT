namespace Server.DTOs.Report
{
    public class FacilityReportToReturn
    {
        public int ItemID { get; set; }

        public string ItemName { get; set; }

        public int ItemCount { get; set; }

        public int DamageAssetCount { get; set; }

        public int UseAssetCount { get; set; }

        public int NewAssetCount { get; set; }
    }
}
