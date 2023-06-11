
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.DTOs.Facility;
using Server.Models;
using Server.Models.Facility;

namespace Server.Controllers.Facility
{
     [ApiController]
        [Route("api/[controller]")]

    public class AssignTaskController :ControllerBase
    {
        private readonly DataContext _context;
        public AssignTaskController (DataContext context){
            _context=context;
            
        }

         [HttpPost]
        public async Task<IActionResult>AddTask([FromBody]AssignTaskToInsert assignTaskToInsert){
            if(assignTaskToInsert is null){
                return BadRequest();
            }
            var ati = new AssignTask{
                TaskType= assignTaskToInsert.TaskType,
                TaskStatus="NotAssign",
                BuildingId=1007
                              
                
            };
            try{
                await _context.AssignTasks.AddAsync(ati);
                await _context.SaveChangesAsync();
            }
            catch(System.Exception ex){
                Console.Write(ex.Message);
                return StatusCode(500) ;

            }
             return Ok(ati);

            
        }

       [ HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var alltasks = await _context.AssignTasks.ToListAsync();
            return Ok(alltasks);
        }

    








        
        [HttpPut("{id}")]
public async Task<IActionResult> UpdateAssignTask(int id, AssignTaskToUpdate assignTaskToUpdate)
{
    var existingAssignTask = await _context.AssignTasks.FirstOrDefaultAsync(x => x.Id == id);
    if (existingAssignTask == null)
    {
        return NotFound();
    }

    existingAssignTask.TaskDate = assignTaskToUpdate.TaskDate;
    existingAssignTask.TaskStatus = assignTaskToUpdate.TaskStatus;
    existingAssignTask.ExternalWorkerId = assignTaskToUpdate.ExternalWorkerId;
    existingAssignTask.BuildingId = assignTaskToUpdate.BuildingId;

        await _context.SaveChangesAsync();
    
   

    return Ok(existingAssignTask);
}



      
        }
}







 
        
 
