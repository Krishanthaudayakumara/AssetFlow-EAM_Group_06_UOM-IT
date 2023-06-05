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
        public async Task<Boolean> CreateAssetsInFacility()
        {
            try
            {
                var assets = (await _context.Assets.ToListAsync()).FindAll(a => a.Status == "Issued");
                assets.ForEach(async a =>
                {
                    Console.WriteLine(a.Description);
                    var fa = new FacilityAsset();
                    fa.Asset = a;
                    var result = await _context.FacilityAssets.AddAsync(fa);
                    Console.WriteLine(result);
                });
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
                var assets = await _context.FacilityAssets.Include(a => a.Asset).ThenInclude(a => a.Stock).ToListAsync();

                if (assets != null)
                {
                    foreach (var asset in assets)
                    {
                        var assetView = new AssetViewModel
                        {
                            AssetId = asset.Asset.Id,
                            Description = asset.Asset.Description,
                            Vendor = asset.Asset.Vendor,
                            SubCategoryId = asset.Asset.StockId,
                            CategoryId = asset.Asset.Stock.SubCategoryType,///,,,,,,,,,,,,,,,,,,,,
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

        [HttpPost("FacilityAsset")]
        public async Task<IActionResult> AddFacAsset([FromBody]FacilityAssetToInsert facilityAssetToInsert){
            if(facilityAssetToInsert is null){
                return BadRequest();
            }

            var fAsset = await _context.FacilityAssets.Where(fa => fa.AssetId== facilityAssetToInsert.AssetId).FirstOrDefaultAsync();
            
            try{
                if (fAsset == null)
                    return BadRequest();

                fAsset.AssetConditionStatus = facilityAssetToInsert.AssetConditionStatus;
                fAsset.ReceivedDate = facilityAssetToInsert.ReceivedDate;
                fAsset.AssignStatus=facilityAssetToInsert.AssignStatus;

                await _context.SaveChangesAsync();
            }
            catch(System.Exception ex){
                Console.Write(ex.Message);
                return BadRequest(ex.Message);
            }

            return Ok(fAsset);
        }

         [HttpGet("GetAllFacilityAssets")]
        public async Task<IActionResult> GetAllFacilityAssets()
        {
            var allFacilityAssets = await _context.FacilityAssets.ToListAsync();
            return Ok(allFacilityAssets);
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

