
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models.Facility;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacilityAssetController:ControllerBase
    {
        private readonly DataContext _context;
         public  FacilityAssetController(DataContext context){
            _context=context;
         }

          [HttpGet("{id}")]
        public async Task <IActionResult> GetAsset(int id){
        var asset= await _context.FacilityAssets.FirstOrDefaultAsync(x => x.Id==id);
        if(asset is null){
            return NotFound();
        }

        var facAssetToReturn = new FacAssetToReturn{
            Id=asset.Id,
            ItemName=asset.ItemName,
            Description=asset.Description,
            ItemCount=asset.ItemCount,
            Status=asset.Status


        };

        return Ok(facAssetToReturn);

    }
     [HttpPost]
         public async Task <IActionResult> AddAsset([FromBody] FacAssetToInsert facAssetToInsert){
            if( facAssetToInsert is null){
                return BadRequest();
            }

            var fati = new FacilityAsset{
               ItemName   = facAssetToInsert.ItemName ,
               Description =facAssetToInsert.Description,
               ItemCount=facAssetToInsert.ItemCount,
               Status=facAssetToInsert.Status,
               WorkstationId=facAssetToInsert.WorkstationId
               
            };
            try{
                await _context.FacilityAssets.AddAsync(fati);
                await _context.SaveChangesAsync();
            }

            catch(System.Exception ex){
                Console.Write(ex.Message);
                return StatusCode(500) ;

            }

              return Ok(fati);
         }

            

        
    }
    
}