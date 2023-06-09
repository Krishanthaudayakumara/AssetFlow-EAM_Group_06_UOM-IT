using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.DTOs;

namespace Server.Models
{
    public class SubCategory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public ICollection<Asset> Assets { get; set; }

        public static implicit operator SubCategory(SubCategoryDTO dto)
        {
            if (dto == null)
                return null;

            return new SubCategory
            {
                Id = dto.Id,
                Name = dto.Name,
                CategoryId = dto.CategoryId
            };
        }
    }
}
