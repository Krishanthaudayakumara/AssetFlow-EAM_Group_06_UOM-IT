using Microsoft.EntityFrameworkCore;
using Server.Models.Support;
using Server.Models.User;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<IssueType> IssueTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Reply> Replys { get; set; }
        public DbSet<Employee> Employees { get; set; }
        

    }
}