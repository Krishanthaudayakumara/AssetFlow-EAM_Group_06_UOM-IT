using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<EmployeeRequest> EmployeeRequests { get; set; }
        public DbSet<Assign> Assigns { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Assign>(builder =>
            {
                builder.HasOne(a => a.EmployeeRequest)
                    .WithMany(er => er.Assigns)
                    .HasForeignKey(a => a.ReqID)
                    .OnDelete(DeleteBehavior.NoAction); // Set the delete behavior to NoAction.
            });
        }
    }
}