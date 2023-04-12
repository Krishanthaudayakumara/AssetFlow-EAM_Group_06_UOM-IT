using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class StockController : ControllerBase
    {
        private readonly DataContext _context;
        public StockController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStocks()
        {
            var allStocks = await _context.Stocks.ToListAsync();
            return Ok(allStocks);
        }

        [HttpPost]
        public async Task<IActionResult> AddStock([FromBody] StockToInsert stockToInsert)
        {
            if (stockToInsert is null)
            {
                return BadRequest();
            }
            var st = new Stock
            {
                StockId = stockToInsert.StockId,
                SubCategoryId = stockToInsert.SubCategoryId,
                PurchasedDate = stockToInsert.PurchasedDate,
                WarrantyExpiring = stockToInsert.WarrantyExpiring,
                SupplierId = stockToInsert.SupplierId,
                Amount = stockToInsert.Amount

            };
            try
            {
                await _context.Stocks.AddAsync(st);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);
            }
            return Ok(st);
        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateStock(int id, [FromBody] StockToUpdate stockToUpdate)
        {
            var UpdateStock = await _context.Stocks.FirstOrDefaultAsync(x => x.StockId == id);
            if (UpdateStock is null)
            {
                return NotFound();
            }
            UpdateStock.PurchasedDate = stockToUpdate.PurchasedDate;
            UpdateStock.Cost = stockToUpdate.Cost;
            UpdateStock.WarrantyExpiring = stockToUpdate.WarrantyExpiring;
            UpdateStock.SupplierId = stockToUpdate.SupplierId;
            UpdateStock.Amount = stockToUpdate.Amount;



            try
            {
                _context.Update(UpdateStock);
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
        public async Task<IActionResult> DeleteStock(int id)
        {
            var deleteStock = await _context.Stocks.FirstOrDefaultAsync(x => x.StockId == id);
            if (deleteStock is null)
            {
                return NotFound();
            }
            _context.Stocks.Remove(deleteStock);
            await _context.SaveChangesAsync();

            return Ok();
            }
    }}