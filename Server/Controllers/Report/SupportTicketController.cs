using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs.Report;
using Server.Data;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportTicketController : ControllerBase
    {
        private readonly DataContext _context;

        public SupportTicketController(DataContext context)
        {
            _context = context;
        }

        // GET: api/SupportTicket
       [HttpGet]
public async Task<ActionResult<IEnumerable<SupportTicketReport>>> GetSupportTickets()
{
    var supportTickets = await _context.Tickets
        .Include(t => t.Employee)
        .Include(t => t.Reply)
        .Include(t => t.Agent)
        .Include(t => t.Feedback)
        .ToListAsync();

    var supportTicketReports = supportTickets.Select(t => new SupportTicketReport
    {
        TicketId = t.Id,
        CreatedByEmployeeFirstName = t.Employee.FirstName, // Retrieve the Employee's first name
        Problem = t.Problem,
        Reply = t.Reply?.Text, // Null-conditional operator to avoid null reference exception
        AgentFirstName = t.Agent?.FirstName, // Null-conditional operator to avoid null reference exception
        Rating = t.Feedback?.Rating // Null-conditional operator to avoid null reference exception
    });

    return Ok(supportTicketReports);
}

    }
}
