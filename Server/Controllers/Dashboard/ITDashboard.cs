using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs.Dashboard;
using Server.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ITDashboardController : ControllerBase
    {
        private readonly DataContext _context;

        public ITDashboardController(DataContext context)
        {
            _context = context;
        }
 // code for monthly ticket count 
        [HttpGet("monthly-ticket-counts")]
        public IActionResult GetMonthlyTicketCounts()
        {
            var ticketCounts =
                _context
                    .Tickets
                    .GroupBy(t => t.SubmitDate.Month)
                    .Select(g =>
                        new RecordCountDto {
                            Month =
                                CultureInfo
                                    .CurrentCulture
                                    .DateTimeFormat
                                    .GetMonthName(g.Key),
                            Count = g.Count()
                        })
                    .ToList();

            return Ok(ticketCounts);
        }
 // code for available agent count
        [HttpGet("available-agent-count")]
        public IActionResult GetAvailableAgentCount()
        {
            var availableAgentCount =
                _context.Agents.Count(a => a.AgentStatus == "Available");

            var availableAgentCountDTO =
                new AvailableAgentCountDTO {
                    AvailableAgentCount = availableAgentCount
                };

            return Ok(availableAgentCountDTO);
        }
 // code for solved ticket count
        [HttpGet("solved-ticket-count")]
        public IActionResult GetSolvedTicketCount()
        {
            var solvedTicketCount =
                _context.Tickets.Count(t => t.TicketStatus == "Solved");

            var solvedTicketCountDTO =
                new SolvedTicketCountDTO {
                    SolvedTicketCount = solvedTicketCount
                };

            return Ok(solvedTicketCountDTO);
        }
 // code for average response time
        [HttpGet("avg-response-time")]
        public async Task<ActionResult<IEnumerable<TimeSpan>>>
        GetAverageResponseTime()
        {
            var tickets =
                await _context
                    .Tickets
                    .Include(t => t.Reply)
                    .Where(t => t.Reply != null)
                    .ToListAsync();

            var avgResponseTimes =
                tickets.Select(t => t.Reply.ReplyDate - t.SubmitDate).ToList();

            return Ok(avgResponseTimes);
        }
 // code for monthly ticket satisfaction
        [HttpGet]
        public ActionResult<IEnumerable<TicketSatisfactionDTO>>
        GetTicketSatisfactionByMonth()
        {
            var feedbacks = _context.Feedbacks.Include(f => f.Ticket);

            var satisfactionByMonth =
                feedbacks
                    .GroupBy(f =>
                        new { f.CreatedDate.Year, f.CreatedDate.Month })
                    .Select(group =>
                        new TicketSatisfactionDTO {
                            Month = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMMM "),
                            GoodCount = group.Count(f => f.Rating == "Good"),
                            BetterCount =group.Count(f => f.Rating == "Better"),
                            WorstCount = group.Count(f => f.Rating == "Worst")
                        })
                    .ToList();

            return satisfactionByMonth;
        }
    }
}
