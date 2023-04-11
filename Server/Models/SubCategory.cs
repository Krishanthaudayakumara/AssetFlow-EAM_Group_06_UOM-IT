namespace Server.Models
{
    public class SubCategory
    {
        public int Id{ get; set; }
        public String SubCategoryType { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Stock> Stocks { get; set; }


    }
}