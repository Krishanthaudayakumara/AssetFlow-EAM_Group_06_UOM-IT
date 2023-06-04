using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Models;
using Server.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly CloudinaryService _cloudinaryService;

        public SubCategoryController(DataContext context, CloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategories()
        {
            var subCategories = await _context.SubCategories.ToListAsync();
            return Ok(subCategories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(int id)
        {
            var subCategory = await _context.SubCategories.FindAsync(id);

            if (subCategory == null)
            {
                return NotFound();
            }

            return Ok(subCategory);
        }


        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategoriesByCategoryId(int categoryId)
        {
            var subCategories = await _context.SubCategories
                .Where(sc => sc.CategoryId == categoryId)
                .ToListAsync();

            return Ok(subCategories);
        }



        [HttpPost]
        public async Task<ActionResult<SubCategory>> CreateSubCategory([FromForm] SubCategoryDTO subCategoryDTO)
        {
            var imageUrl = await _cloudinaryService.UploadImage(subCategoryDTO.Image);

            var subCategory = new SubCategory
            {
                Name = subCategoryDTO.Name,
                ImageUrl = imageUrl,
                CategoryId = subCategoryDTO.CategoryId
            };

            _context.SubCategories.Add(subCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubCategory", new { id = subCategory.Id }, subCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSubCategory(int id, [FromForm] SubCategoryDTO subCategoryDTO)
        {
            if (id != subCategoryDTO.Id)
            {
                return BadRequest();
            }

            var subCategory = await _context.SubCategories.FindAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            subCategory.Name = subCategoryDTO.Name;
            subCategory.CategoryId = subCategoryDTO.CategoryId;

            if (subCategoryDTO.Image != null)
            {
                subCategory.ImageUrl = await _cloudinaryService.UploadImage(subCategoryDTO.Image);
            }

            _context.Entry(subCategory).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            var subCategory = await _context.SubCategories.FindAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            _context.SubCategories.Remove(subCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
