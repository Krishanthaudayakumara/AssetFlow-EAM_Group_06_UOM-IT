

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
        public async Task<IActionResult>AddWorkstation([FromBody]WorkstationToInsert workstationToInsert){
            if(workstationToInsert is null){
                return BadRequest();
            }
            var wti = new Workstation{
                WorkstationName= workstationToInsert.WorkstationName,
                 Floor=workstationToInsert.Floor,
                 BuildingId=workstationToInsert.BuildingId
                              
                
            };
            try{
                await _context.Workstations.AddAsync(wti);
                await _context.SaveChangesAsync();
            }
            catch(System.Exception ex){
                Console.Write(ex.Message);
                return StatusCode(500) ;

            }
             return Ok(wti);

            
        }


         
          [HttpGet("{id}")]
        public async Task <IActionResult> GetWorkstation(int id){
        var w= await _context.Workstations.Include(x=>x.FacilityAssets).FirstOrDefaultAsync(x => x.Id==id);
        if(w is null){
            return NotFound();
        }

        var workstationToReturn = new WorkstationToReturn{
            Id= w.Id,   
            WorkstationName=w.WorkstationName,
            Floor=w.Floor,
            BuildingId=w.BuildingId
                            


        };

        return Ok(w);

    }
     [HttpGet]
        public async Task<IActionResult> GetAllWorkstation()
        {
            var allworkstations = await _context.Workstations.ToListAsync();
            return Ok(allworkstations);
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

        updateWorkstation.WorkstationName=WorkstationToUpdate.WorkstationName;
        
        
        await _context.SaveChangesAsync();
        

        
        return Ok(updateWorkstation);

    }

    



            




        
        
    }
}