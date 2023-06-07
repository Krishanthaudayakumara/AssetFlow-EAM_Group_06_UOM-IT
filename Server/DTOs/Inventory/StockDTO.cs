    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Http;

    namespace Server.DTOs
    {
        public class StockDTO
        {
            public int Id { get; set; }

            public string Name { get; set; }
            public string Description { get; set; }
            public int CategoryId { get; set; }
            public int SubCategoryId { get; set; }
            public int SupplierId { get; set; }
            public int Quantity { get; set; }

            public float Cost { get; set; }

            public DateTime ArrivalDate { get; set; }
            public IFormFile Image { get; set; }
        }
    }
