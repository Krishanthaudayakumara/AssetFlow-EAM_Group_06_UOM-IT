

using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs;
using Server.Models.Facility;

namespace Server.Controllers.Facility
{
    
    [ApiController]
    [Route("[controller]")]
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




        
        
    }
}