using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;
using Server.Models;

namespace Server.Controllers.Report
{   [ApiController]
    [Route("api/[controller]")]
    public class WarrentyExpirationReportController : ControllerBase
    {
        private readonly DataContext _context;

        public WarrentyExpirationReportController (DataContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult GetWarrantyExpirationReport()
        {
            
            {
                var assets = _context.Set<Asset>()
                    .Include(a => a.Stock)
                    .Where(a => a.WarrentyExpiration.Date <= DateTime.Today)
                    .ToList();

                var report = new List<WarrentyExpirationReportDTO>();

                foreach (var asset in assets)
                {
                    var dto = new WarrentyExpirationReportDTO{
                        AssetId = asset.Id,
                        Barcode = asset.Barcode,
                        Description = asset.Description,
                        Vendor = asset.Vendor,
                        WarrantyExpiration = asset.WarrentyExpiration,
                        Status = asset.Status,
                        PurchasedDate = asset.Stock.PurchasedDate,
                        Cost = asset.Stock.Cost,
                        SupplierId = asset.Stock.SupplierId,
                        Amount = asset.Stock.Amount
                    };

                    report.Add(dto);
                }

                return Ok(report);
            }
          
    }
}}