namespace Server.Models
{
    public class Supplier
    {
        public int Id { get; set; }
       
        public ICollection<Stock> Stocks { get; set; }
        
        

        
        
    }
}