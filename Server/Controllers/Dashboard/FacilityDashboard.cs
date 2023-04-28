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
    }
}