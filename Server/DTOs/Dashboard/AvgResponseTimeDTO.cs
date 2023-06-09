using System;

namespace Server.DTOs.Dashboard
{
    public class AvgResponseTimeDTO
    {
        public int TicketId { get; set; }

        public TimeSpan AvgResponseTime { get; set; }
    }
}
