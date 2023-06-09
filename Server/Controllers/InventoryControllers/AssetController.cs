using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System;
using System.Collections.Generic;
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
        private readonly CloudinaryService _cloudinaryService;

        public AssetController(DataContext context, IWebHostEnvironment hostEnvironment, CloudinaryService cloudinaryService)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAssetDTO>>> GetAssets()
        {
            var assets = await _context.Assets
                .Include(a => a.Stock)
                    .ThenInclude(s => s.Supplier)
                .ToListAsync();

            var assetDTOs = assets.Select(asset => new GetAssetDTO
            {
                Id = asset.Id,
                Name = asset.Name,
                Description = asset.Description,
                Barcode = asset.Barcode,
                StockId = asset.StockId,
                Status = asset.Status,
                Condition = asset.Condition,
                WarrantyExpiration = asset.WarrantyExpiration,
                ImageUrl = asset.ImageUrl,
                Stock = new AssetStockDTO
                {
                    Id = asset.Stock.Id,
                    Name = asset.Stock.Name,
                    ArrivalDate = asset.Stock.ArrivalDate,
                    SupplierId = asset.Stock.SupplierId,
                    SupplierName = asset.Stock.Supplier.Name,
                    ImageUrl = asset.Stock.ImageUrl
                }
            }).ToList();

            return Ok(assetDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetAssetDTO>> GetAsset(int id)
        {
            var asset = await _context.Assets
                .Include(a => a.Stock)
                    .ThenInclude(s => s.Supplier)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (asset == null)
            {
                return NotFound();
            }

            var assetDTO = new GetAssetDTO
            {
                Id = asset.Id,
                Name = asset.Name,
                Description = asset.Description,
                Barcode = asset.Barcode,
                StockId = asset.StockId,
                Status = asset.Status,
                Condition = asset.Condition,
                WarrantyExpiration = asset.WarrantyExpiration,
                ImageUrl = asset.ImageUrl,
                Stock = new AssetStockDTO
                {
                    Id = asset.Stock.Id,
                    Name = asset.Stock.Name,
                    ArrivalDate = asset.Stock.ArrivalDate,
                    SupplierId = asset.Stock.SupplierId,
                    SupplierName = asset.Stock.Supplier.Name,
                    ImageUrl = asset.Stock.ImageUrl
                }
            };

            return Ok(assetDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Asset>> CreateAsset([FromForm] AssetDTO assetDTO)
        {
            if (assetDTO.StockId <= 0)
            {
                return BadRequest("Invalid StockId");
            }

            var stock = await _context.Stocks.FindAsync(assetDTO.StockId);
            if (stock == null)
            {
                return NotFound("Stock not found");
            }

            var asset = new Asset
            {
                Name = assetDTO.Name,
                Description = assetDTO.Description,
                Barcode = GenerateBarcode(assetDTO.StockId),
                StockId = assetDTO.StockId,
                Status = assetDTO.Status,
                Condition = assetDTO.Condition,
                WarrantyExpiration = assetDTO.WarrantyExpiration,
                Stock = stock
            };

            if (assetDTO.Image != null)
            {
                asset.ImageUrl = await _cloudinaryService.UploadImage(assetDTO.Image);
            }

            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsset", new { id = asset.Id }, asset);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsset(int id, [FromForm] AssetDTO assetDTO)
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

            if (assetDTO.StockId <= 0)
            {
                return BadRequest("Invalid StockId");
            }

            var stock = await _context.Stocks.FindAsync(assetDTO.StockId);
            if (stock == null)
            {
                return NotFound("Stock not found");
            }

            asset.Name = assetDTO.Name;
            asset.Description = assetDTO.Description;
            asset.Status = assetDTO.Status;
            asset.Condition = assetDTO.Condition;
            asset.WarrantyExpiration = assetDTO.WarrantyExpiration;
            asset.StockId = assetDTO.StockId;
            asset.Stock = stock;

            if (assetDTO.Image != null)
            {
                asset.ImageUrl = await _cloudinaryService.UploadImage(assetDTO.Image);
            }

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
