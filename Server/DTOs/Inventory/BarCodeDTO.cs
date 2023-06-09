using System;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class BarCodeDTO
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Name { get; set; }
    }

}