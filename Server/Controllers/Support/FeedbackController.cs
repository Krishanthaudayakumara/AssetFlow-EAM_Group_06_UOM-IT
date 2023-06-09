using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;
using Microsoft.Data.SqlClient;

namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly DataContext _context;
        public FeedbackController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFeedback()
        {
            var allFeedback = await _context.Feedbacks.ToListAsync();
            return Ok(allFeedback);
        }


        [HttpPost]
        public async Task<IActionResult> AddFeedback([FromBody] FeedbackToInsert feedbackToInsert)
        {
            if (feedbackToInsert is null)
            {
                return BadRequest();
            }

            var feedback = new Feedback
            {
                Rating = feedbackToInsert.Rating,
                Comment = feedbackToInsert.Comment,
                TicketId = feedbackToInsert.TicketId,  
                CreatedDate = DateTime.UtcNow,             
                
            };
             try
            {
                await _context.Feedbacks.AddAsync(feedback);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(feedback);
        }
        
        }
    }