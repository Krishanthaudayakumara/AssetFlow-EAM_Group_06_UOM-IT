using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs.Dashboard;

namespace Server.Controllers
{   [ApiController]
    [Route("[controller]")]
    public class FacilityDashboardController : ControllerBase
    {
      private readonly DataContext _context;

        public FacilityDashboardController(DataContext context)
        {
            _context = context;
        }
        
        [HttpGet("total-buildings")]
        public ActionResult<TotalBuilding> GetTotalBuildings()
        {
            int totalBuildings = _context.Buildings.Count();
            TotalBuilding totalBuildingDTO = new TotalBuilding { TotalBuildings = totalBuildings };
            return Ok(totalBuildingDTO);
        }
        [HttpGet("total-facility-assets")]
        public ActionResult<TotalFacilityAsset> GetTotalFacilityAssets()
        {
            int totalFacilityAssets = _context.FacilityAssets.Count();
            TotalFacilityAsset totalFacilityAssetDTO = new TotalFacilityAsset { TotalFacilityAssets = totalFacilityAssets };
            return Ok(totalFacilityAssetDTO);
        }
         [HttpGet("total-workstations")]
        public ActionResult<TotalWorkstation> GetTotalWorkstations()
        {
            int totalWorkstations = _context.Workstations.Count();
            TotalWorkstation totalWorkstationDTO = new TotalWorkstation { TotalWorkstations = totalWorkstations };
            return Ok(totalWorkstationDTO);
        }
         [HttpGet("asset-status")]
        public ActionResult<FacilityStatusDTO> GetAssetStatusCounts()
        {
            var assetStatusCounts = new FacilityStatusDTO
            {
                NewCount = _context.FacilityAssets.Count(asset => asset.AssetConditionStatus == "New"),
                UseCount = _context.FacilityAssets.Count(asset => asset.AssetConditionStatus == "Use"),
                DamageCount = _context.FacilityAssets.Count(asset => asset.AssetConditionStatus == "Damage")
            };

            return Ok(assetStatusCounts);
        }
        [HttpGet]
        public ActionResult<AssetAssignmentStatusDTO[]> GetAssetAssignmentStatusCounts()
        {
            var assignCount = _context.FacilityAssets.Count(a => a.AssignStatus == "Assign");
            var notAssignCount = _context.FacilityAssets.Count(a => a.AssignStatus == "Not Assign");

            var assignmentStatusDTOs = new[]
            {
                new AssetAssignmentStatusDTO { AssignmentStatus = "Assign", Count = assignCount },
                new AssetAssignmentStatusDTO { AssignmentStatus = "Not Assign", Count = notAssignCount }
            };

            return assignmentStatusDTOs;
        }
    }
}