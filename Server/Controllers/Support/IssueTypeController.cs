using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Support;
using Server.Models.Support;

namespace Server.Controllers.Support
{
    [ApiController]
    [Route("Api/[controller]")]
    public class IssueTypeController : ControllerBase
    {
        private readonly DataContext _context;
        public IssueTypeController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllIssueTypes()
        {
            var allIssueTypes = await _context.IssueTypes.ToListAsync();
            return Ok(allIssueTypes);
        }
        [HttpPost]
        public async Task<IActionResult> AddIssueType([FromBody] IssueTypeToInsert issueTypeToInsert)
        {
            if (issueTypeToInsert is null)
            {
                return BadRequest();
            }
            var issue = new IssueType
            {
                Name = issueTypeToInsert.Name,
                

            };
            try
            {
                await _context.IssueTypes.AddAsync(issue);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(issue);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssueType(int id)
        {
            var deleteIssueType = await _context.IssueTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteIssueType is null)
            {
                return NotFound();
            }
            _context.IssueTypes.Remove(deleteIssueType);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}