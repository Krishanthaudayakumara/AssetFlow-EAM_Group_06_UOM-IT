using Microsoft.AspNetCore.Http;

namespace Server.DTOs.Support
{
    public class TeamToInsert
    {
        public string Name { get; set; }
        public string Description { get; set;}
         //public DateTime CreateDate { get; set; }
        public int IssueTypeId { get; set; }
        public IFormFile ProfileImage { get; set; } 
    }
}