using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly CloudinaryService _cloudinaryService;

        public StockController(DataContext context, IWebHostEnvironment hostEnvironment, CloudinaryService cloudinaryService)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            var stocks = await _context.Stocks
                .Include(s => s.Category)
                .Include(s => s.SubCategory)
                .Include(s => s.Supplier)
                .ToListAsync();

            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock(int id)
        {
            var stock = await _context.Stocks
                .Include(s => s.Category)
                .Include(s => s.SubCategory)
                .Include(s => s.Supplier)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock);
        }

        [HttpPost]
        public async Task<ActionResult<Stock>> CreateStock([FromForm] StockDTO stockDTO)
        {
            var stock = new Stock
            {
                Name = stockDTO.Name,
                Description = stockDTO.Description,
                Quantity = stockDTO.Quantity,
                CategoryId = stockDTO.CategoryId,
                SubCategoryId = stockDTO.SubCategoryId,
                SupplierId = stockDTO.SupplierId,
                Cost = stockDTO.Cost,
                ArrivalDate = stockDTO.ArrivalDate
            };

            if (stockDTO.Image != null)
            {
                stock.ImageUrl = await _cloudinaryService.UploadImage(stockDTO.Image);
            }
            else
            {
                stock.ImageUrl = null;
            }

            _context.Stocks.Add(stock);
            await _context.SaveChangesAsync();

            var assets = new List<Asset>();
            for (int i = 0; i < stockDTO.Quantity; i++)
            {
                var asset = new Asset
                {
                    Name = stockDTO.Name,
                    StockId = stock.Id,
                    Status = "In Stock",
                    WarrantyExpiration = DateTime.Now.AddYears(1),
                    ImageUrl = stock.ImageUrl,
                    Description = stockDTO.Description,
                    Condition = "new"
                };
                _context.Assets.Add(asset);
                assets.Add(asset);
            }

            await _context.SaveChangesAsync();

            foreach (var asset in assets)
            {
                asset.Barcode = GenerateBarcode(stockDTO.SubCategoryId, asset.Id);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStock", new { id = stock.Id }, stock);
        }

        [HttpGet("{id}/barcode")]
        public async Task<ActionResult<IEnumerable<BarCodeDTO>>> GetStockAssets(int id)
        {
            var stock = await _context.Stocks
                .Include(s => s.Assets)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (stock == null)
            {
                return NotFound();
            }

            var assetInfoList = stock.Assets.Select(asset => new BarCodeDTO
            {
                Id = asset.Id,
                Barcode = asset.Barcode,
                Name = asset.Name
            }).ToList();

            return Ok(assetInfoList);
        }


        private string GenerateBarcode(int subcategoryId, int assetId)
        {
            var barcode = $"cat-{subcategoryId}-ast-{assetId}";
            return barcode;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStock(int id, [FromForm] StockDTO stockDTO)
        {
            if (id != stockDTO.Id)
            {
                return BadRequest();
            }

            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            stock.Name = stockDTO.Name;
            stock.Description = stockDTO.Description;
            stock.CategoryId = stockDTO.CategoryId;
            stock.SubCategoryId = stockDTO.SubCategoryId;
            stock.SupplierId = stockDTO.SupplierId;
            stock.Cost = stockDTO.Cost;
            stock.ArrivalDate = stockDTO.ArrivalDate;

            if (stockDTO.Image != null)
            {
                stock.ImageUrl = await _cloudinaryService.UploadImage(stockDTO.Image);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStock(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockExists(int id)
        {
            return _context.Stocks.Any(s => s.Id == id);
        }
    }
}
