using Microsoft.EntityFrameworkCore;
using Server.Models.Facility;
using Server.Models.Inventory;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<FacilityAsset> FacilityAssets { get; set; }
        public DbSet<Workstation> Workstations { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           
            modelBuilder.Entity<FacilityAsset>()
                .HasOne(fa => fa.Asset)
                .WithMany()
                .HasForeignKey(fa => fa.AssetId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<FacilityAsset>()
                .HasOne(fa => fa.Workstation)
                .WithMany(w => w.FacilityAssets)
                .HasForeignKey(fa => fa.WorkstationId)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
