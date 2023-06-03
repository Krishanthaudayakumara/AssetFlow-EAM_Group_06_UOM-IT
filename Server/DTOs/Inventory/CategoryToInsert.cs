namespace Server.DTOs
{
    public class CategoryToInsert
    {
        public string CategoryType {get;set;}
        public string Description {get;set;}
       public IFormFile Image { get; set; }// New property for the image file

    }
}