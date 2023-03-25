using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models.Facility;
using Server.Models.Inventory;
using AutoMapper
;








namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]



    public class FacilityAssetController : ControllerBase
    {
        

        private readonly DataContext _context;

        public FacilityAssetController(DataContext context )
        {
            
            _context = context;

        }

       /* [HttpGet("{id}")]
        public async Task<IActionResult> GetAsset(int id)
        {
            var asset = await _context.FacilityAssets.FirstOrDefaultAsync(x => x.Id == id);
            if (asset is null)
            {
                return NotFound();
            }

            var facAssetToReturn = new FacAssetToReturn
            {
                Id = asset.Id,
                
                
               // ItemCount = asset.Itemount,



            };

            return Ok(facAssetToReturn);

        }


        [HttpGet]
        public async Task<IActionResult> GetAllbuildings ()
        {
            var allbuildings = await _context.Buildings.ToListAsync();
            return Ok(allbuildings);
        }
       [HttpPost]
        public async Task<IActionResult> AddAsset([FromBody] FacAssetToInsert facAssetToInsert)
        {
            if (facAssetToInsert is null)
            {
                return BadRequest();
            }

            var fati = new FacilityAsset
            {
                
                
                
                
                AssignedDate = facAssetToInsert.AssignedDate,
                ReceivedDate = facAssetToInsert.StartDate,
                WorkstationId = facAssetToInsert.WorkstationId

            };
            try
            {
                await _context.FacilityAssets.AddAsync(fati);
                await _context.SaveChangesAsync();
            }

            catch (System.Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);

            }

            return Ok(fati);
        }

        [HttpDelete("delete-asset-by-id/{id}")]

        public async Task<IActionResult> DeleteAsset(int id)
        {
            var deleteAsset = await _context.FacilityAssets.FindAsync(id);
            if (deleteAsset is null)
            {
                return NotFound();
            }

            _context.FacilityAssets.Remove(deleteAsset);
            await _context.SaveChangesAsync();



            return NoContent();

        }

        [HttpPut("{id}")]



        public async Task<IActionResult> UpdateAsset(int id, FacAssetToInsert FacToUpdate)
        {
            var updateAsset = await _context.FacilityAssets.FirstOrDefaultAsync(x => x.Id == id);
            if (updateAsset is null)
            {
                return NotFound();
            }

            //updateAsset.ItemName = FacToUpdate.ItemName;
            
            //updateAsset.ItemCount = FacToUpdate.ItemCount;


            await _context.SaveChangesAsync();



            return Ok(updateAsset);

        }*/

 /*       [HttpPost]
public async Task<IActionResult> CreateFacilityAssets()
{
    try
    {
        // Get all issued assets
        var issuedAssets = _context.Assets.Where(a => a.Status == "Issued").ToList();

        // Create FacilityAsset records for each issued asset
        foreach (var asset in issuedAssets)
        {
            var facilityAsset = new FacilityAsset
            {
                AssetId = asset.Id,
                SubcategoryId = asset.SubCategoryId,
                Description = asset.Description,
                Vendor = asset.Vendor,
                 AssetConditionStatus = "New",
                AssignedDate = DateTime.Now,
                ReceivedDate = DateTime.Now

            
                
                
                
            };

            _context.FacilityAssets.Add(facilityAsset);
        }

        await _context.SaveChangesAsync();

        return Ok();
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}*/

/*[HttpPost]
public async Task<IActionResult> CreateFacilityAssets()
{
    try
    {
        // Get all issued assets
        var issuedAssets = _context.Assets.Where(a => a.Status == "Issued").ToList();

        // Create FacilityAsset records for each issued asset
        foreach (var asset in issuedAssets)
        {
            var facilityAsset = new FacilityAsset();

            // Map Asset properties to FacilityAsset DTO
            var assetDto = new AssetTransferDto
            {
                AssetId = asset.Id,
                SubcategoryId = asset.SubCategoryId,
                Description = asset.Description,
                Vendor = asset.Vendor,
                WarrantyExpiration = asset.WarrentyExpiration
            };

            // Map Asset DTO to FacilityAsset entity
            _mapper.Map(assetDto, facilityAsset);

            // Set other FacilityAsset properties as needed
            facilityAsset.AssetConditionStatus = "New";
            facilityAsset.AssignedDate = DateTime.Now;
            facilityAsset.ReceivedDate = DateTime.Now;

            _context.FacilityAssets.Add(facilityAsset);
        }

        await _context.SaveChangesAsync();

        return Ok();
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}*/

 
    }
}

