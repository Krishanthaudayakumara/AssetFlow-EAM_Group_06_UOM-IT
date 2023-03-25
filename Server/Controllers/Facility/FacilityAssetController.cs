using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models.Facility;
using Server.Models.Inventory;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilityAssetController : ControllerBase
    {
        private readonly DataContext _context;

        public FacilityAssetController(DataContext context)
        {
            _context = context;
        }

        // POST: api/FacilityAsset
        [HttpPost]
        public async Task<ActionResult<FacilityAssetDTO>> PostFacilityAsset(CreateFacilityAssetDTO createFacilityAssetDTO)
        {
            var asset = await _context.Assets.FindAsync(createFacilityAssetDTO.AssetId);

            if (asset == null)
            {
                return NotFound("Asset not found");
            }

            asset.Status = "assigned to facility";

            var facilityAsset = new FacilityAsset
            {
                AssetId = createFacilityAssetDTO.AssetId,
                AssetConditionStatus = createFacilityAssetDTO.AssetConditionStatus,
                WorkstationId = createFacilityAssetDTO.WorkstationId,
                AssignedDate = createFacilityAssetDTO.AssignedDate,
                ReceivedDate = createFacilityAssetDTO.ReceivedDate
            };

            _context.FacilityAssets.Add(facilityAsset);
            await _context.SaveChangesAsync();

            var facilityAssetDTO = new FacilityAssetDTO
            {
                Id = facilityAsset.Id,
                AssetId = facilityAsset.AssetId,
                AssetConditionStatus = facilityAsset.AssetConditionStatus,
                WorkstationId = facilityAsset.WorkstationId,
                AssignedDate = facilityAsset.AssignedDate,
                ReceivedDate = facilityAsset.ReceivedDate
            };

            return CreatedAtAction(nameof(PostFacilityAsset), new { id = facilityAssetDTO.Id }, facilityAssetDTO);
        }
    }
}
