using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class EmployeeRequestController : ControllerBase
    {
        private readonly DataContext _context;
        public EmployeeRequestController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRequests()
        {
            var allRequests = await _context.EmployeeRequests.ToListAsync();
            return Ok(allRequests);
        }
        [HttpPost] 
       public async Task<IActionResult> AddRequest([FromBody]  RequestToInsert requestToInsert){
        if(requestToInsert is null){
            return BadRequest();
        }
        var req = new EmployeeRequest{
                EmployeeId = requestToInsert.EmployeeId,
                Request = requestToInsert.Request,
           
        };
        try{
            await _context.EmployeeRequests.AddAsync(req);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception ex){
            Console.Write(ex.Message);
            return StatusCode(500);
        }
        return Ok(req);
       }
       [HttpPut("{id}")]

        public async Task<IActionResult> UpdateRequest(int id, [FromBody] RequestToUpdate requestToUpdate)
        {
            var UpdateRequest = await _context.EmployeeRequests.FirstOrDefaultAsync(x => x.Id == id);
            if (UpdateRequest is null)
            {
                return NotFound();
            }
            UpdateRequest.EmployeeId = requestToUpdate.EmployeeId;
            UpdateRequest.Request = requestToUpdate.Request;
            


            try
            {
                _context.Update(UpdateRequest);
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
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var deleteRequest = await _context.EmployeeRequests.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteRequest is null)
            {
                return NotFound();
            }
            _context.EmployeeRequests.Remove(deleteRequest);
            await _context.SaveChangesAsync();

            return Ok();

        }

    }
}