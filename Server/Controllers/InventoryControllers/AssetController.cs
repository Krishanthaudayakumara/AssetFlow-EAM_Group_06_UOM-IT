using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AssetController(DataContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAssets()
        {
            var assets = await _context.Assets.Include(a => a.Stock).ToListAsync();
            return Ok(assets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await _context.Assets.Include(a => a.Stock).FirstOrDefaultAsync(a => a.Id == id);

            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset(AssetDTO assetDTO)
        {
            var asset = new Asset
            {
                Name = assetDTO.Name,
                Description = assetDTO.Description,
                Barcode = GenerateBarcode(assetDTO.StockId),
                StockId = assetDTO.StockId,
                Status = "In Stock",
                WarrantyExpiration = assetDTO.WarrantyExpiration,
                ImageUrl = assetDTO.ImageUrl
            };

            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsset", new { id = asset.Id }, asset);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsset(int id, AssetDTO assetDTO)
        {
            if (id != assetDTO.Id)
            {
                return BadRequest();
            }

            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            asset.Name = assetDTO.Name;
            asset.Description = assetDTO.Description;
            asset.Status = assetDTO.Status;
            asset.WarrantyExpiration = assetDTO.WarrantyExpiration;
            asset.ImageUrl = assetDTO.ImageUrl;

            _context.Entry(asset).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string GenerateBarcode(int stockId)
        {
            var assetCount = _context.Assets.Count(a => a.StockId == stockId) + 1;
            var barcode = $"cat-{stockId}-ast-{assetCount}";
            return barcode;
        }
    }
}
