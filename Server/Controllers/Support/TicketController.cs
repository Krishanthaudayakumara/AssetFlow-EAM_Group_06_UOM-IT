using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;
using System.Linq;
namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly DataContext _context;
        public TicketController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            var allTickets = await _context.Tickets.ToListAsync();
            return Ok(allTickets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var ticket = await _context.Tickets.Include(t => t.Reply).FirstOrDefaultAsync(x => x.Id == id);

            if (ticket is null)
            {
                return NotFound();
            }


            return Ok(ticket);
        }
        [HttpGet("team/{teamId}")]
        public IActionResult GetTicketsByTeam(int teamId)
        {
            var team = _context.Teams
                .Include(t => t.IssueType)
                .FirstOrDefault(t => t.Id == teamId);

            if (team != null)
            {
                var tickets = _context.Tickets
                    .Where(t => t.IssueTypeId == team.IssueTypeId)
                    .ToList();

                return Ok(tickets);
            }

            return NotFound();
        }

        [HttpGet("api/tickets/{id}/reply")]
        public async Task<IActionResult> GetTicketReply(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Reply)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
            {
                return NotFound(); // Ticket with the given ID was not found
            }

            if (ticket.Reply == null)
            {
                return NotFound(); // Ticket has no associated reply
            }

            return Ok(ticket.Reply);
        }

        [HttpGet("api/agents/{id}/ticket")]
        public async Task<IActionResult> GetAgentTicket(int id)
        {
            var agent = await _context.Agents
                .Include(t => t.Tickets)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (agent == null)
            {
                return NotFound(); // Ticket with the given ID was not found
            }

            if (agent.Tickets == null)
            {
                return NotFound(); // Ticket has no associated reply
            }

            return Ok(agent.Tickets);
        }
        [HttpPost]
        public async Task<IActionResult> AddTicket([FromBody] TicketToInsert ticketToInsert)
        {
            if (ticketToInsert is null)
            {
                return BadRequest();
            }
            var ticket = new Ticket
            {
                EmployeeId = ticketToInsert.EmployeeId,
                Email = ticketToInsert.Email,
                IssueTypeId = ticketToInsert.IssueTypeId,
                Problem = ticketToInsert.Problem,
                TicketStatus = "Not Assign",
                SubmitDate = DateTime.UtcNow,

            };
            try
            {
                await _context.Tickets.AddAsync(ticket);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(ticket);
        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateTicket(int id, [FromBody] TicketToUpdate ticketToUpdate)
        {
            var updateTicket = await _context.Tickets.FirstOrDefaultAsync(x => x.Id == id);
            if (updateTicket is null)
            {
                return NotFound();
            }
            updateTicket.AgentId = ticketToUpdate.AgentId;
            updateTicket.TicketStatus = ticketToUpdate.TicketStatus;

            try
            {
                _context.Update(updateTicket);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);

            }
            return Ok();
        }
        [HttpPut("team/{teamId}")]
        public async Task<IActionResult> UpdateTicketsByTeam(int teamId, [FromBody] TicketToUpdate ticketToUpdate)
        {
            var tickets = _context.Tickets
                .Where(t => t.IssueTypeId == teamId)
                .ToList();

            if (tickets.Count == 0)
            {
                return NotFound();
            }

            foreach (var ticket in tickets)
            {
                ticket.AgentId = ticketToUpdate.AgentId;
                ticket.TicketStatus = ticketToUpdate.TicketStatus;
            }

            try
            {
                _context.UpdateRange(tickets);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var deleteTicket = await _context.Tickets.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteTicket is null)
            {
                return NotFound();
            }
            _context.Tickets.Remove(deleteTicket);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}