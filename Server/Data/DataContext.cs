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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
