using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;

namespace Server.Controllers.Report
{
  /* [ApiController]
    [Route("api/[FacilityAssetController]")]
    public class FacilityAssetController : ControllerBase
    {
        private readonly DataContext _context;

        public FacilityAssetController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacilityReportToReturn>>> GetFacilityReport()
        {
            var facilityAssets = await _context.FacilityAssets
                .Include(f => f.Workstation)
                .ToListAsync();

            var facilityReport = facilityAssets
                .GroupBy(f => f.ItemName)
                .Select(g => new FacilityReportToReturn
                {
                    ItemID = g.First().Id,
                    ItemName = g.Key,
                    ItemCount = g.Sum(f => f.ItemCount),
                    DamageAssetCount = g.Count(f => f.AssetStatus == "Damage"),
                    UseAssetCount = g.Count(f => f.AssetStatus == "In Use"),
                    NewAssetCount = g.Count(f => f.AssetStatus == "New")
                });

            return Ok(facilityReport);
        }
    }*/
}