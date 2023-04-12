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

        public DbSet<Supplier> Suppliers { get; set; }


           public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<EmployeeRequest> EmployeeRequests { get; set; }
        public DbSet<Assign> Assigns { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Assign>(builder =>
            {
                builder.HasOne(a => a.EmployeeRequest)
                    .WithMany(er => er.Assigns)
                    .HasForeignKey(a => a.ReqID)
                    .OnDelete(DeleteBehavior.NoAction); // Set the delete behavior to NoAction.
            });
        }
    }
}

