using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryType { get; set; }
        public string Description { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; }
        
        
    }
}