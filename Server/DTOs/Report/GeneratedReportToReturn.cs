using System;
using System.Collections.Generic;

namespace Server.DTOs.Report
{
    public class GeneratedReportToReturn
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string ReportName { get; set; }

        public string ReportType { get; set; }

        public string ReportFormat { get; set; }

        public string GeneratedBy { get; set; }

        public string Note { get; set; }
    }
}
