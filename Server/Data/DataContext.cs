

using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Facility;
using Server.Models.Inventory;




namespace Server.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext>options): base(options){}
        public DbSet<FacilityAsset>FacilityAssets {get; set;}
        public DbSet<Workstation>Workstations {get; set;}

        public DbSet<Building>Buildings {get; set;}
        public DbSet<Asset>Assets{get; set;}
        public DbSet<Assign>Assigns{get; set;}

        public DbSet<Category>Categories{get; set;}

         public DbSet<Employee>Employees{get; set;}

        public DbSet<EmployeeRequest>EmployeeRequests{get; set;}

        public DbSet<Stock>Stocks{get; set;}
        public DbSet<SubCategory>subCategories{get; set;}

        public DbSet<Supplier>Suppliers{get; set;}








        


       




        
    }       
        
        
    }


// ...

