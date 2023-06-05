using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly DataContext _context;
        public SubCategoryController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubCategory(int id)
        {
            var subcategory = await _context.SubCategories.FirstOrDefaultAsync(X => X.Id == id);
            if (subcategory is null)
            {
                return NotFound();
            }
            var subCategoryToReturn = new SubCategoryToReturn
            {
                Id = subcategory.Id,
                SubCategoryType = subcategory.SubCategoryType,
                CategoryType = subcategory.CategoryType,
            };

            return Ok(subCategoryToReturn);

        }

        [HttpGet]
        public async Task<IActionResult> GetSubCategories()
        {
            var subCategories = await _context.SubCategories.ToListAsync();

            if (subCategories is null)
            {
                return NotFound();
            }

            foreach (var subCategory in subCategories)
            {
                var SubCategoryToReturn = new SubCategoryToReturn
                {
                    Id = subCategory.Id,
                    SubCategoryType = subCategory.SubCategoryType,
                    CategoryType = subCategory.CategoryType,
                };
            }

            return Ok(subCategories);
        }



        [HttpPost] 
       public async Task<IActionResult> AddSubCategory([FromBody]  SubCategoryToInsert subcategoryToInsert){
        if(subcategoryToInsert is null){
            return BadRequest();
        }
        var sub = new SubCategory{
                SubCategoryType = subcategoryToInsert.SubCategoryType,
                CategoryType = subcategoryToInsert.CategoryType,
           
        };
        try{
            await _context.SubCategories.AddAsync(sub);
            await _context.SaveChangesAsync();
        }
        catch (System.Exception ex){
            Console.Write(ex.Message);
            return StatusCode(500);
        }
        return Ok(sub);
       }
       [HttpPut("{id}")]

        public async Task<IActionResult> UpdateSubCategory(int id, [FromBody] SubCategoryToUpdate subCategoryToUpdate)
        {
            var UpdateSubCategory = await _context.SubCategories.FirstOrDefaultAsync(x => x.Id == id);
            if (UpdateSubCategory is null)
            {
                return NotFound();
            }
                UpdateSubCategory.SubCategoryType = subCategoryToUpdate.SubCategoryType;
                UpdateSubCategory.CategoryType = subCategoryToUpdate.CategoryType;

            try
            {
                _context.Update(UpdateSubCategory);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {

                Console.Write(ex.Message);
                return StatusCode(500);

            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            var deleteSubCategory = await _context.SubCategories.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteSubCategory is null)
            {
                return NotFound();
            }
            _context.SubCategories.Remove(deleteSubCategory);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }

}