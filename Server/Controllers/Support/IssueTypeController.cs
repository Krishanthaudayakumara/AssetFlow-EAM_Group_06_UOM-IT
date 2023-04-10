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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssueType(int id)
        {
            var issue = await _context.IssueTypes.Include(x => x.Teams).Include(x => x.Tickets).FirstOrDefaultAsync(x => x.Id == id);

            if (issue is null)
            {
                return NotFound();
            }


            return Ok(issue);
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
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateIssueType(int id, [FromBody] IssueTypeToUpdate issueTypeToUpdate)
        {
            var updateIssueType = await _context.IssueTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (updateIssueType is null)
            {
                return NotFound();
            }
            updateIssueType.Name = issueTypeToUpdate.Name;
           
            try
            {
                _context.Update(updateIssueType);
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