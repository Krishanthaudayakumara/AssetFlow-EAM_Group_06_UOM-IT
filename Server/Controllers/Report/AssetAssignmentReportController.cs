using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.Report;

namespace Server.Controllers.Report
{   [ApiController]
    [Route("api/[controller]")]
    public class AssetAssignmentReportController : ControllerBase
    
    {   private readonly DataContext _context;
        private object await_context;

        public AssetAssignmentReportController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("asset-assignment-report")]
        public async Task<IActionResult> GetAssetAssignmentReport()
        {
            var report = await _context.FacilityAssets
                .Include(a => a.Workstation)
                .ThenInclude(w => w.Building)
                .Include(a => a.Asset)
                .Select(a => new AssetAssignmentReportDTO
                {
                    AssetId = a.AssetId,
                    AssetConditionStatus = a.AssetConditionStatus,
                    WorkstationType = a.Workstation.WorkstationName,
                    AssignStatus = a.AssignStatus,
                    AssignedDate = a.AssignedDate,
                    ReceivedDate = a.ReceivedDate,
                    BuildingName = a.Workstation.Building.BuildingName,
                    FloorNo = a.Workstation.Building.FloorNo
                })
                .ToListAsync();

            return Ok(report);
        }

       
}


}



    
