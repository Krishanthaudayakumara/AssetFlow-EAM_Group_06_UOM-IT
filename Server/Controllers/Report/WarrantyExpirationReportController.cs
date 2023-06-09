using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;
using Server.Models;

namespace Server.Controllers.Report
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarrantyExpirationReportController : ControllerBase
    {
        private readonly DataContext _context;

        public WarrantyExpirationReportController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetWarrantyExpirationReport()
        {

            {
                var assets = _context.Set<Asset>()
                    .Include(a => a.Stock)
                    .Where(a => a.WarrantyExpiration.Date <= DateTime.Today)
                    .ToList();

                var report = new List<WarrantyExpirationReportDTO>();

                foreach (var asset in assets)
                {
                    var dto = new WarrantyExpirationReportDTO
                    {
                        AssetId = asset.Id,
                        Barcode = asset.Barcode,
                        Description = asset.Description,
                        Vendor = asset.Stock.Supplier.Name,
                        WarrantyExpiration = asset.WarrantyExpiration,
                        Status = asset.Status,
                        PurchasedDate = asset.Stock.ArrivalDate,
                        Cost = asset.Stock.Cost,
                        SupplierId = asset.Stock.SupplierId,
                        Amount = asset.Stock.Quantity
                    };

                    report.Add(dto);
                }

                return Ok(report);
            }

        }
    }
}