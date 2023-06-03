namespace Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryType { get; set; }
        public string Description { get; set; }

        public int? ImageId { get; set; } // Updated to allow null values for the foreign key
        public Image Image { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; }
    }
}
