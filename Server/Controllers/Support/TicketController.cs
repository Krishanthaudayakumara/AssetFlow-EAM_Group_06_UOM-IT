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
    }
}