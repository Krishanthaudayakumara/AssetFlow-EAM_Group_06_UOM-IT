using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs.Report;
using Server.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupportAgentReportController : ControllerBase
    {
        private readonly DataContext _context;

        public SupportAgentReportController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupportAgentReportToReturn>>> GetSupportAgentReport()
        {
            var supportAgentReports = await _context.Agents
                .Include(a => a.Team) // Include the Team navigation property
                .Select(a => new SupportAgentReportToReturn
                {
                    AgentFirstName = a.FirstName,
                    AgentLastName = a.LastName,
                    TeamName = a.Team.Name, // Retrieve the Team name
                    JoinDate = a.JoinDate,
                    OpenedTickets = a.Tickets.Count(t => t.TicketStatus == "Opened"),
                    SolvedTickets = a.Tickets.Count(t => t.TicketStatus == "Solved"),
                    PendingTickets = a.Tickets.Count(t => t.TicketStatus == "Pending")
                })
                .ToListAsync();

            return supportAgentReports;
        }

        }
    }

