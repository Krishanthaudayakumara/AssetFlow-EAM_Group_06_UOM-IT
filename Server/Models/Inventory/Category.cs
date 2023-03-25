

namespace Server.Models.Inventory
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryType { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; }
        

        
        
    }
}