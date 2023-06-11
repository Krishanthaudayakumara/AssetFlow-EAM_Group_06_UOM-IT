using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Inventory
{
    public class RequestAssetsDto
    {
         public int SubCategoryId { get; set; }
        public int Count { get; set; }
    }
}