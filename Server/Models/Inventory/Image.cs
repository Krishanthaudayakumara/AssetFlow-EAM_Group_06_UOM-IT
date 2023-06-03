
using System;
using System.Collections.Generic;
using Server.Models;


namespace Server.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public byte[] Data { get; set; }
        public string ContentType { get; set; }
    }
}