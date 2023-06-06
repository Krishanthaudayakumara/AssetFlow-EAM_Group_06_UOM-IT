namespace Server.DTOs
{
    public class CategoryToReturn
    {
        public int Id {get;set;}
        public string CategoryType {get;set;}
        public string Description {get;set;}
         public byte[] ImageData { get; set; }
        public string ImageContentType { get; set; }

        
    }
}