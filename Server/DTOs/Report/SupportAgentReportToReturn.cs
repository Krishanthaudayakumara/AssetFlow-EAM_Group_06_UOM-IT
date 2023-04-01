namespace Server.DTOs.Report
{
    public class SupportAgentReportToReturn
    {
        public string AgentFirstName { get; set; }

        public string AgentLastName { get; set; }

        public int TeamId { get; set; }

        public int OpenedTickets { get; set; }

        public int SolvedTickets { get; set; }

        public int PendingTickets { get; set; }
    }
}
