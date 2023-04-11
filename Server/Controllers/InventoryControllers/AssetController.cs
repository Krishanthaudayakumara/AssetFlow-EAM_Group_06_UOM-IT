using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AssetController : ControllerBase
    {
        private readonly DataContext _context;
        public AssetController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{StockId}")]
        public async Task<IActionResult> GetAsset(int id)
        {
            var asset = await _context.Assets.FirstOrDefaultAsync(X => X.Id == id);
            if (asset is null)
            {
                return NotFound();
            }
            var AssetToReturn = new AssetToReturn
            {
                Id = asset.Id,
                Barcode = asset.Barcode,
                Description = asset.Description,
                Vendor = asset.Vendor,
                Status = asset.Status,
                condition = asset.condition,
                WarrentyExpiration = asset.WarrentyExpiration,
                StockId = asset.StockId
            };
            return Ok(AssetToReturn);
        }
        [HttpPost]
        public async Task<IActionResult> AddAsset([FromBody] AssetToInsert assetToInsert)
        {
            if (assetToInsert is null)
            {
                return BadRequest();
            }
            var ast = new Asset
            {
                Description = assetToInsert.Description,
                Vendor = assetToInsert.Vendor,
                Status = assetToInsert.Status,
                condition = assetToInsert.condition,
                WarrentyExpiration = assetToInsert.WarrentyExpiration,
                StockId = assetToInsert.StockId

            };
            try
            {
                await _context.Assets.AddAsync(ast);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(ast);
        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateAsset(int id, [FromBody] AssetToUpdate assetToUpdate)
        {
            var UpdateAsset = await _context.Assets.FirstOrDefaultAsync(x => x.Id == id);
            if (UpdateAsset is null)
            {
                return NotFound();
            }
            UpdateAsset.Description = assetToUpdate.Description;
            UpdateAsset.Vendor = assetToUpdate.Vendor;
            UpdateAsset.Status = assetToUpdate.Status;
            UpdateAsset.condition = assetToUpdate.condition;
            UpdateAsset.WarrentyExpiration = assetToUpdate.WarrentyExpiration;



            try
            {
                _context.Update(UpdateAsset);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);

            }
            return Ok();
        }
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var deleteAsset = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteAsset is null)
            {
                return NotFound();
            }
            _context.Categories.Remove(deleteAsset);
            await _context.SaveChangesAsync();

            return Ok();

        }

    }
}