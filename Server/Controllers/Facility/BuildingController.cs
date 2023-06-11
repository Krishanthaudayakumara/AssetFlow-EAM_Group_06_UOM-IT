

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;

namespace Server.Controllers.Facility
{
    [ApiController]
    [Route("api/[Controller]")]
    public class BuildingController:ControllerBase
    {
        
        private readonly DataContext _context;
        public BuildingController (DataContext context){
            _context=context;
            
        }
 [HttpPost]
public async Task<IActionResult> AddBuilding([FromBody]BuildingToInsert buildingToInsert)
{
    if (buildingToInsert is null)
    {
        return BadRequest();
    }

    // Check if building with the same name, floor number, and address already exists
    bool buildingExists = await _context.Buildings
    .AnyAsync(b =>
        b.BuildingName == buildingToInsert.BuildingName &&
        b.FloorNo == buildingToInsert.FloorNo &&
        b.Address == buildingToInsert.Address);

    if (buildingExists)
    {
        return Conflict("Building with the same name, floor number, and address already exists.");
    }

    var bti = new Building
    {
        BuildingName = buildingToInsert.BuildingName,
        FloorNo = buildingToInsert.FloorNo,
        Address = buildingToInsert.Address
    };

    try
    {
        await _context.Buildings.AddAsync(bti);
        await _context.SaveChangesAsync();
    }
    catch (System.Exception ex)
    {
        Console.Write(ex.Message);
        return StatusCode(500);
    }

    return Ok(bti);
}




        [HttpGet("{id}")]
        public async Task <IActionResult> GetBuilding (int id){
                    
            var b= await _context.Buildings.Include(x=>x.Workstations).FirstOrDefaultAsync(x => x.Id==id);
            if(b is null){
            return NotFound();
           }
           var buildingToReturn = new BuildingToReturn{
            Id= b.Id,   
            BuildingName =b.BuildingName ,
             FloorNo=b.FloorNo
                                   


        };
         return Ok(b);


       }
       [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var allbuildings = await _context.Buildings.ToListAsync();
            return Ok(allbuildings);
        }

        [HttpDelete("delete-asset-by-id/{id}")]

        public async Task <IActionResult> DeleteBuilding(int id){
            var deleteBuilding = await _context.Buildings .FindAsync(id);
        if(deleteBuilding is null){
            return NotFound();
        }

          try
            {
                _context.Buildings.Remove(deleteBuilding);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
                {
                    return Conflict("Unable to delete the building as it is being used by a another table.");
                }
                else
                {
                    throw;
                }
            }

        
        return NoContent();

    }
    [HttpPut("{id}")]

     

        public async Task <IActionResult> UpdateBuilding(int id, BuildingToInsert BuildingToUpdate){
        var updateBuilding= await _context.Buildings .FirstOrDefaultAsync(x => x.Id==id);
        if(updateBuilding is null){
            return NotFound();
        }

        updateBuilding.BuildingName=BuildingToUpdate.BuildingName;
        updateBuilding.FloorNo=BuildingToUpdate.FloorNo;
        
        
        await _context.SaveChangesAsync();
        

        
        return Ok(updateBuilding);
        }

    }
}