using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;


//namespace SwaggerExcludeAttribute
namespace Server.DTOs
{

public class AssetToInsert
    {  
    
      // [JsonIgnore]
        public string Barcode { get; set; }

        public string Description { get; set; }
        public string Vendor { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
        public string WarrentyExpiration { get; set; }
        public int StockId { get; set; }
    }
}