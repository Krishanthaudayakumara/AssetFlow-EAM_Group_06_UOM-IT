using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.DTOs.Dashboard;
using System.Linq;

namespace Server.Controllers.Dashboard
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryDashboardController : ControllerBase
    {
        private readonly DataContext _context;

        public InventoryDashboardController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("inventory-asset-count")]
        public ActionResult<InventoryAssetCountDTO> GetTotalInventoryAssetCount()
        {
            int totalCount = _context.Assets.Count();
            var totalCountDto = new InventoryAssetCountDTO
            {
                TotalCount = totalCount
            };
            return Ok(totalCountDto);
        }
         [HttpGet("category-count")]
        public ActionResult<CategoryCountDTO> GetTotalCategoryCount()
        {
            int totalCount = _context.Categories.Count();
            var totalCountDto = new CategoryCountDTO
            {
                TotalCategoreyCount = totalCount
            };
            return Ok(totalCountDto);
        }
        [HttpGet("subcategory-count")]
        public ActionResult<SubCategoryCountDTO> GetTotalSubCategoryCount()
        {
            int totalCount = _context.SubCategories.Count();
            var totalCountDto = new SubCategoryCountDTO
            {
                TotalSubCategoryCount = totalCount
            };
            return Ok(totalCountDto);
        }
         [HttpGet("category-types")]
        public ActionResult<IEnumerable<CategoryTypeDTO>> GetCategoryTypesWithCount()
        {
            var categoryTypes = _context.Categories
                .Select(c => new CategoryTypeDTO
                {
                    CategoryType = c.Name,
                 Count = c.SubCategories.Count
                })
                .ToList();

            return Ok(categoryTypes);
        }


        [HttpGet("subcategory-types")]
        public ActionResult<IEnumerable<SubCategoryTypeDTO>> GetSubCategoryTypesWithCount()
        {
            var subCategoryTypes = _context.SubCategories
                .GroupBy(s => s.Name)
                .Select(g => new SubCategoryTypeDTO
                {
                    SubCategoryType = g.Key,
                    Count = g.Count()
                })
                .ToList();

            return Ok(subCategoryTypes);
        }
    }
}
