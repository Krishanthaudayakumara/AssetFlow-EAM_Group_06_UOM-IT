using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;


namespace Server.Data
{
    [ApiController]
    [Route("api/[Controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(X => X.Id == id);
            if (category is null)
            {
                return NotFound();
            }
            var CategoryToReturn = new CategoryToReturn
            {
                Id = category.Id,
                CategoryType = category.CategoryType,
                Description = category.Description,
            //    Image = category.Image // Include the image data in the response

            };
            return Ok(CategoryToReturn);
        }
       [HttpGet]
public async Task<IActionResult> GetCategories()
{
    var categories = await _context.Categories.Include(c => c.Image).ToListAsync();

    if (categories is null)
    {
        return NotFound();
    }

    var categoriesToReturn = categories.Select(category => new CategoryToReturn
    {
        Id = category.Id,
        CategoryType = category.CategoryType,
        Description = category.Description,
        ImageData = category.Image?.Data,
        ImageContentType = category.Image?.ContentType
    }).ToList();

    return Ok(categoriesToReturn);
}

      [HttpPost]
        public async Task<IActionResult> AddCategory([FromForm] CategoryToInsert categoryToInsert)
        {
            if (categoryToInsert is null)
            {
                return BadRequest();
            }

            var category = new Category
            {
                CategoryType = categoryToInsert.CategoryType,
                Description = categoryToInsert.Description,
            };

            if (categoryToInsert.Image != null && categoryToInsert.Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await categoryToInsert.Image.CopyToAsync(memoryStream);
                    var image = new Image
                    {
                        Data = memoryStream.ToArray(),
                        ContentType = categoryToInsert.Image.ContentType
                    };

                    category.Image = image;
                }
            }

            try
            {
                await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return StatusCode(500);
            }

            return Ok(category);
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryToUpdate categoryToUpdate)
        {
            var UpdateCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (UpdateCategory is null)
            {
                return NotFound();
            }
            UpdateCategory.CategoryType = categoryToUpdate.CategoryType;
            UpdateCategory.Description = categoryToUpdate.Description;

            try
            {
                _context.Update(UpdateCategory);
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
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var deleteCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (deleteCategory is null)
            {
                return NotFound();
            }
            _context.Categories.Remove(deleteCategory);
            await _context.SaveChangesAsync();

            return Ok();

        }


    }

}

