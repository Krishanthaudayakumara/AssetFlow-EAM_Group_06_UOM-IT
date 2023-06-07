using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services; // Add the namespace for the CloudinaryService
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
        private readonly CloudinaryService _cloudinaryService; // Add the CloudinaryService

        public StockController(DataContext context, IWebHostEnvironment hostEnvironment, CloudinaryService cloudinaryService)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _cloudinaryService = cloudinaryService; // Inject the CloudinaryService
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
        {
            var stocks = await _context.Stocks.Include(s => s.Category).Include(s => s.SubCategory).Include(s => s.Supplier).ToListAsync();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stock>> GetStock(int id)
        {
            var stock = await _context.Stocks.Include(s => s.Category).Include(s => s.SubCategory).Include(s => s.Supplier).FirstOrDefaultAsync(s => s.Id == id);

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
                CategoryId = stockDTO.CategoryId,
                SubCategoryId = stockDTO.SubCategoryId,
                SupplierId = stockDTO.SupplierId,
                ArrivalDate = DateTime.Now
            };

            if (stockDTO.Image != null)
            {
                stock.ImageUrl = await _cloudinaryService.UploadImage(stockDTO.Image); // Use the CloudinaryService to upload the image
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
                    Description = stockDTO.Description
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

            // Update the stock's image if a new image is provided
            if (stockDTO.Image != null)
            {
                stock.ImageUrl = await _cloudinaryService.UploadImage(stockDTO.Image); // Use the CloudinaryService to upload the image
            }

            _context.Entry(stock).State = EntityState.Modified;
            await _context.SaveChangesAsync();

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
    }
}
