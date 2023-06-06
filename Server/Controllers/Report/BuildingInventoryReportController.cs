using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;

namespace Server.Controllers.Report
{   [ApiController]
    [Route("api/[controller]")]
    public class BuildingInventoryReportController : ControllerBase
    {
       private readonly DataContext _context;
        private object await_context;

        public BuildingInventoryReportController(DataContext context)
        {
            _context = context;
        } 
        [HttpGet("building-inventory-report")]
        public async Task<IActionResult> GetBuildingInventoryReport()
        {
            var report = await _context.Buildings
                .Include(b => b.Workstations)
                .ThenInclude(w => w.FacilityAssets)
                .Select(b => new BuildingInventoryReportDTO
                {
                    BuildingName = b.BuildingName,
                    FloorNo = b.FloorNo,
                    NumWorkstations = b.Workstations.Count,
                    NumAssets = b.Workstations.SelectMany(w => w.FacilityAssets).Count()
                })
                .ToListAsync();

            return Ok(report);
            }
}}