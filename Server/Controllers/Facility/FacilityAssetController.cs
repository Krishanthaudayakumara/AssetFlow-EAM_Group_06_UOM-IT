using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Models;




namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]



    public class FacilityAssetController : ControllerBase
    {


        private readonly DataContext _context;


        public FacilityAssetController(DataContext context)
        {

            _context = context;
        }

        [HttpPost]
        public async Task<bool> CreateAssetsInFacility()
        {
            try
            {
                var assets = await _context.Assets.Where(a => a.Status == "Issued").ToListAsync();

                foreach (var asset in assets)
                {
                    Console.WriteLine(asset.Description);

                    var fa = new FacilityAsset
                    {
                        Asset = asset,
                        AssetConditionStatus = "New",
                        AssignStatus = "Not Assign",
                        ReceivedDate = DateTime.Today
                    };

                    await _context.FacilityAssets.AddAsync(fa);
                }

                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet]
        public async Task<List<AssetViewModel>> GetAsset()
        {
            try
            {
                List<AssetViewModel> assetViewsList = new List<AssetViewModel>();
                var assets = await _context.FacilityAssets
                    .Include(a => a.Asset)
                    .ThenInclude(a => a.Stock)
                    .ThenInclude(s => s.SubCategory)
                    .ThenInclude(sc => sc.Category)
                    .ToListAsync();

                if (assets != null)
                {
                    foreach (var asset in assets)
                    {
                        var assetView = new AssetViewModel
                        {
                            AssetId = asset.Asset.Id,
                            Description = asset.Asset.Description,
                            Vendor = asset.Asset.Vendor,
                            SubCategoryType = asset.Asset.Stock.SubCategory.SubCategoryType,
                            CategoryType = asset.Asset.Stock.SubCategory.Category.CategoryType,
                            FacilityAssetId = asset.Id
                        };

                        assetViewsList.Add(assetView);
                    }
                }

                return assetViewsList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message); // Or log the exception
                return null; // Or an empty list, depending on your preference
            }
        }


       

        [HttpGet("GetAllFacilityAssets")]
        public async Task<IActionResult> GetAllFacilityAssets()
        {
            var allFacilityAssets = await _context.FacilityAssets.ToListAsync();
            return Ok(allFacilityAssets);
        }


 [HttpPut("{id}")]

     

        public async Task <IActionResult> UpdateFacilityAsset(int id,FacilityAssetToInsert FacilityAssetToUpdate){
        var updateFacAsset= await _context.FacilityAssets .FirstOrDefaultAsync(x => x.Id==id);
        if(updateFacAsset is null){
            return NotFound();
        }

        updateFacAsset.AssignedDate=FacilityAssetToUpdate.AssignedDate;
        updateFacAsset.WorkstationId=FacilityAssetToUpdate.WorkstationId;
        updateFacAsset.AssignStatus=FacilityAssetToUpdate.AssignStatus;
        
        
        await _context.SaveChangesAsync();
        

        
        return Ok(updateFacAsset);
        }




        /*  [HttpGet("{id}")]
          public async Task<IActionResult> GetAsset(int id)
          {
              var asset = await _context.FacilityAssets.FirstOrDefaultAsync(x => x.Id == id);
              if (asset is null)
              {
                  return NotFound();
              }

              var facAssetToReturn = new FacAssetToReturn
              {
                  //Id = asset.Id,


                 // ItemCount = asset.Itemount,



              };

              return Ok(facAssetToReturn);

          }*/


        /* [HttpGet]
         public async Task<IActionResult> GetAllbuildings ()
         {
             var allbuildings = await _context.Buildings.ToListAsync();
             return Ok(allbuildings);
         }
        /*[HttpPost]
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
         }*/







    }
}

