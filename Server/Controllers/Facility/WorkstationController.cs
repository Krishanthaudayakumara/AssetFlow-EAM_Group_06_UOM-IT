

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers.Facility
{
    
    [ApiController]
    [Route("api/[controller]")]
    
    public class WorkstationController :ControllerBase
    {
        private readonly DataContext _context;
         public  WorkstationController(DataContext context){
            _context=context;
         }
         [HttpPost]
         public async Task <IActionResult> AddWorkstation([FromBody] WorkstationToInsert wti){
            if(wti is null){
                return BadRequest();
            }

            var ws = new Workstation{
                type = wti.type

            };
            
            try{
                await _context.Workstations.AddAsync(ws);
                await _context.SaveChangesAsync();
            }
            catch(System.Exception ex){
                Console.Write(ex.Message);
                return StatusCode(500) ;

            }

            return Ok(ws);

         }

         
          [HttpGet("{id}")]
        public async Task <IActionResult> GetWorkstation(int id){
        var w= await _context.Workstations.Include(x=>x.FacilityAssets).FirstOrDefaultAsync(x => x.Id==id);
        if(w is null){
            return NotFound();
        }

        var workstationToReturn = new WorkstationToReturn{
            Id= w.Id,   
            type=w.type
                            


        };

        return Ok(w);

    }

    [HttpDelete("delete-asset-by-id/{id}")]

           public async Task <IActionResult> DeleteWorkstation(int id){
        var deleteWorkstation= await _context.Workstations .FindAsync(id);
        if(deleteWorkstation is null){
            return NotFound();
        }

        _context.Workstations.Remove(deleteWorkstation);
        await _context.SaveChangesAsync();
        

        
        return NoContent();

    }

    [HttpPut("{id}")]

     

        public async Task <IActionResult> UpdateWorkstation(int id, WorkstationToInsert WorkstationToUpdate){
        var updateWorkstation= await _context.Workstations .FirstOrDefaultAsync(x => x.Id==id);
        if(updateWorkstation is null){
            return NotFound();
        }

        updateWorkstation.type=WorkstationToUpdate.type;
        
        
        await _context.SaveChangesAsync();
        

        
        return Ok(updateWorkstation);

    }

    



            




        
        
    }
}