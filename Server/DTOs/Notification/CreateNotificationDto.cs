using Microsoft.AspNetCore.Http;

namespace Server.Controllers.DTOs
{
    public class CreateNotificationDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public IFormFile Image { get; set; }
    }
}
