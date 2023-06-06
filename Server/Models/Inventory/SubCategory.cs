using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class SubCategory
    {
        public int Id{ get; set; }
        public string SubCategoryType { get; set; }

                public string CategoryType { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Stock> Stocks { get; set; }


    }
}