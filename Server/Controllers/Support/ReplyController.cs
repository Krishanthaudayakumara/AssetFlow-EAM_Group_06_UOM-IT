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
        public async Task<IActionResult> AddReply([FromBody] ReplyToInsert replyToInsert)
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
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateReply(int id, [FromBody] ReplyToUpdate replyToUpdate)
        {
            var updateReply = await _context.Replys.FirstOrDefaultAsync(x => x.Id == id);
            if (updateReply is null)
            {
                return NotFound();
            }
            updateReply.Text = replyToUpdate.Text;
            
            try
            {
                _context.Update(updateReply);
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
        public async Task<IActionResult> DeleteReply(int id)
        {
            var deleteReply = await _context.Replys.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteReply is null)
            {
                return NotFound();
            }
            _context.Replys.Remove(deleteReply);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}