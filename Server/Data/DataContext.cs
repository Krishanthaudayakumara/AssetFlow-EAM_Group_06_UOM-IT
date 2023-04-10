using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
         public DbSet<SubCategory> SubCategories {get;set;}
         public DbSet<Category> Categories {get;set;}
         public DbSet<Stock> Stocks {get;set;}
         public DbSet<Asset> Assets {get;set;}
         public DbSet<EmployeeRequest> EmployeeRequests {get;set;}
         public DbSet<Assign> Assigns {get;set;}
        
    }
}