

using Microsoft.EntityFrameworkCore;
using Server.Models.Facility;

namespace Server.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext>options): base(options){}
        public DbSet<FacilityAsset>FacilityAssets {get; set;}
        public DbSet<Workstation>Workstations {get; set;}

        
            
        
        
    }
}