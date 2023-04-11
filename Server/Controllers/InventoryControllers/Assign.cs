using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AssignController : ControllerBase
    {
        private readonly DataContext _context;
        public AssignController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{AssetId}")]
        public async Task<IActionResult> GetAssign(int id)
        {
            var assign = await _context.Assigns.FirstOrDefaultAsync(X => X.AssetId == id);
            if (assign is null)
            {
                return NotFound();
            }
            var AssignToReturn = new AssignToReturn
            {
                AssignId = assign.AssignId,
                EmployeeId = assign.EmployeeId,
                AssetId = assign.AssetId,
                AssignTime = assign.AssignTime,
                ReqID = assign.ReqID,
            };
            return Ok(AssignToReturn);
        }
        [HttpPost]
        public async Task<IActionResult> AddAssign([FromBody] AssignToInsert assignToInsert)
        {
            if (assignToInsert is null)
            {
                return BadRequest();
            }
            var asg = new Assign
            {
                EmployeeId = assignToInsert.EmployeeId,
                AssetId = assignToInsert.AssetId,
                AssignTime = assignToInsert.AssignTime,
                ReqID = assignToInsert.ReqID,

            };
            try
            {
                await _context.Assigns.AddAsync(asg);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(asg);
        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateAssign(int id, [FromBody] AssignToUpdate assignToUpdate)
        {
            var UpdateAssign = await _context.Assigns.FirstOrDefaultAsync(x => x.ReqID == id);
            if (UpdateAssign is null)
            {
                return NotFound();
            }
            UpdateAssign.EmployeeId = assignToUpdate.EmployeeId;
            UpdateAssign.AssetId = assignToUpdate.AssetId;
            UpdateAssign.AssignTime = assignToUpdate.AssignTime;
            UpdateAssign.ReqID = assignToUpdate.ReqID;



            try
            {
                _context.Update(UpdateAssign);
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
        public async Task<IActionResult> DeleteAssign(int id)
        {
            var deleteAssign = await _context.Assigns.FirstOrDefaultAsync(x => x.ReqID == id);
            if (deleteAssign is null)
            {
                return NotFound();
            }
            _context.Assigns.Remove(deleteAssign);
            await _context.SaveChangesAsync();

            return Ok();

        }
    }
}