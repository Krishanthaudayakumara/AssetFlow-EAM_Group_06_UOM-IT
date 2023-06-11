using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeRequestController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeRequestController(DataContext context)
        {
            _context = context;
        }

           [HttpGet]
        public async Task<IActionResult> GetEmployeeRequest()
        {
            var employeeRequests = await _context.EmployeeRequests.ToListAsync();

            if (employeeRequests is null)
            {
                return NotFound();
            }

            foreach (var employeeRequest in employeeRequests)
            {
                var EmployeeRequestToReturn = new EmployeeRequestToReturn
                {
                    Id = employeeRequest.Id,
                    EmployeeId = employeeRequest.EmployeeId,
                    AssetId = employeeRequest.AssetId,
                    IsAccepted =employeeRequest.IsAccepted
                };
            }

            return Ok(employeeRequests);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
        {
            var categories = await _context.Categories.Select(c => new CategoryDTO
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

            return Ok(categories);
        }

        [HttpGet("subcategories/{categoryId}")]
        public async Task<ActionResult<IEnumerable<SubCategoryDTO>>> GetSubCategoriesByCategoryId(int categoryId)
        {
            var subCategories = await _context.SubCategories
                .Where(sc => sc.CategoryId == categoryId)
                .Select(sc => new SubCategoryDTO
                {
                    Id = sc.Id,
                    Name = sc.Name
                })
                .ToListAsync();

            return Ok(subCategories);
        }

        [HttpGet("assets/{subcategoryId}")]
        public async Task<ActionResult<IEnumerable<AssetDTO>>> GetAssetsBySubCategoryId(int subcategoryId)
        {
            var assets = await _context.Assets
                .Where(a => a.Stock.SubCategoryId == subcategoryId)
                .Select(a => new AssetDTO
                {
                    Id = a.Id,
                    Name = a.Name,
                    Status = a.Status
                })
                .ToListAsync();

            return Ok(assets);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEmployeeRequest(EmployeeRequestDTO employeeRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Assuming Employee and Asset exist in the database and are associated with the given Ids.
            var employeeRequest = new EmployeeRequest
            {
                EmployeeId = employeeRequestDto.EmployeeId,
                AssetId = employeeRequestDto.AssetId,
                IsAccepted = false
            };

            _context.EmployeeRequests.Add(employeeRequest);
            await _context.SaveChangesAsync();

            return Ok(employeeRequest);
        }
    }
}
