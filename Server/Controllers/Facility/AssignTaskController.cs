
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

    public class AssignTaskController : ControllerBase
    {
        private readonly DataContext _context;
        public AssignTaskController(DataContext context)
        {
            _context = context;

        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] AssignTaskToInsert assignTaskToInsert)
        {
            if (assignTaskToInsert is null)
            {
                return BadRequest();
            }

            var existingTask = await _context.AssignTasks.FirstOrDefaultAsync(x => x.TaskType == assignTaskToInsert.TaskType);
            if (existingTask != null)
            {
                return Conflict("Task with the same TaskType already exists.");
            }

            var ati = new AssignTask
            {
                TaskType = assignTaskToInsert.TaskType,
                TaskStatus = assignTaskToInsert.TaskStatus,
                BuildingId = assignTaskToInsert.BuildingId
            };

            try
            {
                await _context.AssignTasks.AddAsync(ati);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }

            return Ok(ati);
        }

        [HttpGet]
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

        [HttpPut("Task/{id}")]
        public async Task<IActionResult> UpdateTaskStatus(int id, TaskToUpdate taskToUpdate)
        {
            var changeTaskStatus = await _context.AssignTasks.FirstOrDefaultAsync(x => x.Id == id);

            if (changeTaskStatus == null)
            {
                return NotFound();
            }


            changeTaskStatus.TaskStatus = "Completed";

            await _context.SaveChangesAsync();



            return Ok(changeTaskStatus);
        }

        [HttpDelete("delete-asset-by-id/{id}")]

        public async Task<IActionResult> DeleteTask(int id)
        {
            var deleteTask = await _context.AssignTasks.FindAsync(id);
            if (deleteTask is null)
            {
                return NotFound();
            }

            _context.AssignTasks.Remove(deleteTask);
            await _context.SaveChangesAsync();



            return NoContent();

        }

        [HttpPut("TaskType/{id}")]
        public async Task<IActionResult> UpdateTaskType(int id, TaskTypeToUpdate taskTypeToUpdate)
        {
            var changeTaskType = await _context.AssignTasks.FirstOrDefaultAsync(x => x.Id == id);

            if (changeTaskType == null)
            {
                return NotFound();
            }


            changeTaskType.TaskType = taskTypeToUpdate.TaskType;

            await _context.SaveChangesAsync();



            return Ok(changeTaskType);
        }








    }
}










