namespace Server.DTOs.Dashboard
{
    public class TicketSatisfactionDTO
    {
        public string Month { get; set; }

        public int GoodCount { get; set; }

        public int BetterCount { get; set; }

        public int WorstCount { get; set; }
    }
}
