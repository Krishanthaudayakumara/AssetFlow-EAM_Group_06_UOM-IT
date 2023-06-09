using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class SubCategoryDTO
    {
        public int Id { get; set; }


        [Required]
        public string Name { get; set; }

        public IFormFile Image { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
