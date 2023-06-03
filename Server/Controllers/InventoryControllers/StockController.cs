using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : ControllerBase
    {
        private readonly DataContext _context;

        public StockController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockToReturn>>> GetStocks()
        {
            var stocks = await _context.Stocks.ToListAsync();

            var stockToReturnList = new List<StockToReturn>();

            foreach (var stock in stocks)
            {
                var stockToReturn = new StockToReturn
                {
                    StockId = stock.StockId,
                    SubCategoryId = stock.SubCategoryId,
                    PurchasedDate = stock.PurchasedDate,
                    Cost = stock.Cost,
                    WarrantyExpiring = stock.WarrantyExpiring,
                    SupplierId = stock.SupplierId,
                    Amount = stock.Amount
                };

                stockToReturnList.Add(stockToReturn);
            }

            return Ok(stockToReturnList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockToReturn>> GetStock(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            var stockToReturn = new StockToReturn
            {
                StockId = stock.StockId,
                SubCategoryId = stock.SubCategoryId,
                PurchasedDate = stock.PurchasedDate,
                Cost = stock.Cost,
                WarrantyExpiring = stock.WarrantyExpiring,
                SupplierId = stock.SupplierId,
                Amount = stock.Amount
            };

            return Ok(stockToReturn);
        }

        [HttpPost]
        public async Task<ActionResult<StockToReturn>> AddStock(StockToInsert stockToInsert)
        {
            var stock = new Stock
            {
                SubCategoryId = stockToInsert.SubCategoryId,
                PurchasedDate = stockToInsert.PurchasedDate,
                Cost = stockToInsert.Cost,
                WarrantyExpiring = stockToInsert.WarrantyExpiring,
                SupplierId = stockToInsert.SupplierId,
                Amount = stockToInsert.Amount
            };

            _context.Stocks.Add(stock);
            await _context.SaveChangesAsync();

            var stockToReturn = new StockToReturn
            {
                StockId = stock.StockId,
                SubCategoryId = stock.SubCategoryId,
                PurchasedDate = stock.PurchasedDate,
                Cost = stock.Cost,
                WarrantyExpiring = stock.WarrantyExpiring,
                SupplierId = stock.SupplierId,
                Amount = stock.Amount
            };

            return CreatedAtAction(nameof(GetStock), new { id = stock.StockId }, stockToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStock(int id, StockToUpdate stockToUpdate)
        {
            var stock = await _context.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            stock.PurchasedDate = stockToUpdate.PurchasedDate;
            stock.Cost = stockToUpdate.Cost;
            stock.WarrantyExpiring = stockToUpdate.WarrantyExpiring;
            stock.SupplierId = stockToUpdate.SupplierId;
            stock.Amount = stockToUpdate.Amount;

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
