

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.DTOs.Facility;
using Server.Models;
using System.Linq;

namespace Server.Controllers.Facility
{

    [ApiController]
    [Route("api/[controller]")]

    public class WorkstationController : ControllerBase
    {
        private readonly DataContext _context;
        public WorkstationController(DataContext context)
        {
            _context = context;
        }

      [HttpPost]
public async Task<IActionResult> AddWorkstation([FromBody] WorkstationToInsert workstationToInsert)
{
    if (workstationToInsert is null)
    {
        return BadRequest();
    }
    
    // Check if a workstation with the same name, building, and floor already exists
    bool workstationExists = await _context.Workstations
        .AnyAsync(w => w.WorkstationName == workstationToInsert.WorkstationName &&
                       w.BuildingId == workstationToInsert.BuildingId &&
                       w.Floor == workstationToInsert.Floor);

    if (workstationExists)
    {
        return Conflict("A workstation with the same name already exists in the same building and floor.");
    }

    var wti = new Workstation
    {
        WorkstationName = workstationToInsert.WorkstationName,
        Floor = workstationToInsert.Floor,
        BuildingId = workstationToInsert.BuildingId
    };

    try
    {
        await _context.Workstations.AddAsync(wti);
        await _context.SaveChangesAsync();
    }
    catch (System.Exception ex)
    {
        Console.Write(ex.Message);
        return StatusCode(500);
    }
    
    return Ok(wti);
}




        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkstation(int id)
        {
            var w = await _context.Workstations.Include(x => x.FacilityAssets).FirstOrDefaultAsync(x => x.Id == id);
            if (w is null)
            {
                return NotFound();
            }

            var workstationToReturn = new WorkstationToReturn
            {
                Id = w.Id,
                WorkstationName = w.WorkstationName,
                Floor = w.Floor,
                BuildingId = w.BuildingId



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

        public async Task<IActionResult> DeleteWorkstation(int id)
        {
            var deleteWorkstation = await _context.Workstations.FindAsync(id);
            if (deleteWorkstation is null)
            {
                return NotFound();
            }

             try
            {
                _context.Workstations.Remove(deleteWorkstation);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
                {
                    return Conflict("unable to delete as it is  used by anothe table.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();

        }

        [HttpPut("{id}")]



        public async Task<IActionResult> UpdateWorkstation(int id,  WorkstationToUpdate workstationToUpdate)
        {
            var updateWorkstation = await _context.Workstations.FirstOrDefaultAsync(x => x.Id == id);
            if (updateWorkstation is null)
            {
                return NotFound();
            }

            updateWorkstation.WorkstationName = workstationToUpdate.WorkstationName;


            await _context.SaveChangesAsync();



            return Ok(updateWorkstation);

        }

        [HttpGet("GetSubCategoryCount/{workstationId}")]
        public async Task<int> GetSubCategoryCount(int workstationId)
        {
        try
        {
         var subCategoryCount = await _context.FacilityAssets
         .Where(a => a.WorkstationId == workstationId)
         .Select(a => a.Asset.Stock.SubCategory)
                            .Distinct()
        .CountAsync();

        return subCategoryCount;
         }
        catch (Exception ex)
        {
          Console.WriteLine(ex.Message); // Or log the exception
          return -1; // Return a default value or handle the exception accordingly
        }
         }


       


        [HttpGet("GetItemCountPerSubCategory/{workstationId}")]
public async Task<IActionResult> GetItemCountPerSubCategory(int workstationId)
{
    try
    {
        var itemCountPerSubCategory = await _context.FacilityAssets
            .Where(a => a.WorkstationId == workstationId)
            .GroupBy(a => a.Asset.Stock.SubCategory)
            .Select(g => new SubCategoryCountDto
            {
                SubCategoryType = g.Key.Name,
                ItemCount = g.Count()
            })
            .ToListAsync();

        return Ok(itemCountPerSubCategory);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message); // Or log the exception
        return StatusCode(500); // Return an appropriate error response
    }
}







    }
}