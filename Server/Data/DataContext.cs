using Microsoft.EntityFrameworkCore;
using Server.Models.Support;
using Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<IssueType> IssueTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Reply> Replys { get; set; }


        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ExternalWorker> ExternalWorkers { get; set; }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Assign> Assigns { get; set; }
        public DbSet<EmployeeRequest> EmployeeRequests { get; set; }

        public DbSet<FacilityAsset> FacilityAssets { get; set; }

        public DbSet<Workstation> Workstations { get; set; }

        public DbSet<Building> Buildings { get; set; }

        public DbSet<GeneratedReport> GeneratedReports { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Assign>(entity =>
    {
        modelBuilder.Entity<Asset>()
            .HasOne(a => a.Stock)
            .WithMany(s => s.Assets)
            .HasForeignKey(a => a.StockId)
            .OnDelete(DeleteBehavior.Cascade);
    });

            // Remove cascade behavior for SubCategories
            modelBuilder.Entity<Stock>()
                .HasOne(s => s.SubCategory)
                .WithMany()
                .HasForeignKey(s => s.SubCategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}


