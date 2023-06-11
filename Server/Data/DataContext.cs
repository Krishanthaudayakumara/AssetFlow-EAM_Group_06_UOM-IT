using Microsoft.EntityFrameworkCore;
using Server.Models.Support;
using Server.Models.Facility;
using Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //IT Support
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<IssueType> IssueTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Reply> Replys { get; set; }


        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<ExternalWorker> ExternalWorkers { get; set; }


        public DbSet<AccessLog> AccessLogs { get; set; }


        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Assign> Assigns { get; set; }
        public DbSet<EmployeeRequest> EmployeeRequests { get; set; }

        public DbSet<FacilityAsset> FacilityAssets { get; set; }

        public DbSet<Workstation> Workstations { get; set; }

        public DbSet<Building> Buildings { get; set; }
        public DbSet<AssignTask> AssignTasks { get; set; }


        public DbSet<GeneratedReport> GeneratedReports { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public DbSet<UserNotification> UserNotifications { get; set; }

        public DbSet<SupplyChain> SupplyChains { get; set; }

        public DbSet<Order> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Assign>(entity =>
            {
                entity.HasOne(a => a.Employee)
                    .WithMany(e => e.Assigns)
                    .HasForeignKey(a => a.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Asset)
                    .WithMany()
                    .HasForeignKey(a => a.AssetId)
                    .OnDelete(DeleteBehavior.Cascade);


            });

            //Facility
               modelBuilder.Entity<Workstation>(entity =>
            {
                entity.HasOne(a => a.Building)
                    .WithMany(e => e.Workstations)
                    .HasForeignKey(a => a.BuildingId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

              modelBuilder.Entity<FacilityAsset>(entity =>
            {
                entity.HasOne(a => a.Workstation)
                    .WithMany(e => e.FacilityAssets)
                    .HasForeignKey(a => a.WorkstationId)
                    .OnDelete(DeleteBehavior.Restrict);
            });


            //IT Support
            modelBuilder.Entity<Team>(entity =>
            {
                entity.HasOne(a => a.IssueType)
                    .WithMany(e => e.Teams)
                    .HasForeignKey(a => a.IssueTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<Ticket>(entity =>
           {
               entity.HasOne(a => a.IssueType)
                   .WithMany(e => e.Tickets)
                   .HasForeignKey(a => a.IssueTypeId)
                   .OnDelete(DeleteBehavior.Restrict);
           });
            modelBuilder.Entity<Agent>(entity =>
            {
                entity.HasOne(a => a.Team)
                    .WithMany(e => e.Agents)
                    .HasForeignKey(a => a.TeamId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

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


