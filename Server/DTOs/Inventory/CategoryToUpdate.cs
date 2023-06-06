namespace Server.DTOs
{
    public class CategoryToUpdate
    {
        public string CategoryType { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
    }
}
