using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;
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
                SubmitDate = ticketToInsert.SubmitDate,
                AgentId = null,
                TicketStatus = ticketToInsert.TicketStatus,             

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