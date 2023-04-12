using Microsoft.EntityFrameworkCore;
using Server.Models.Report;


namespace Server.Data 
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        
       
        public DbSet<GeneratedReport> GeneratedReports{ get; set; }
       
       
 
    }
}