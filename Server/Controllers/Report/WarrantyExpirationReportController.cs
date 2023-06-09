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
     
          [HttpGet("warranty-expiration")]
        public ActionResult<List<WarrantyExpirationReportDTO>> GetWarrantyExpirationReport()
        {
            List<WarrantyExpirationReportDTO> report = _context.Assets
                .Include(a => a.Stock.Supplier) // Include the Supplier for the Vendor
                .Select(a => new WarrantyExpirationReportDTO
                {
                    AssetId = a.Id,
                    Barcode = a.Barcode,
                    Description = a.Description,
                    WarrantyExpiration = a.WarrantyExpiration,
                    Vendor = a.Stock.Supplier.Name
                })
                .ToList();

            return report;
        }

    }
    }
