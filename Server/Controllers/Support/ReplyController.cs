using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;


namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReplyController : ControllerBase
    {
         private readonly DataContext _context;

        public ReplyController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllReply()
        {
            var allReply = await _context.Replys.ToListAsync();
            return Ok(allReply);
        }
         [HttpPost]
        public async Task<IActionResult> AddIssueType([FromBody] ReplyToInsert replyToInsert)
        {
            if (replyToInsert is null)
            {
                return BadRequest();
            }
            var reply = new Reply
            {
                TicketId = replyToInsert.TicketId,
                Text = replyToInsert.Text,
                ReplyDate = replyToInsert.ReplyDate,
                

            };
            try
            {
                await _context.Replys.AddAsync(reply);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(reply);
        }
    }
}