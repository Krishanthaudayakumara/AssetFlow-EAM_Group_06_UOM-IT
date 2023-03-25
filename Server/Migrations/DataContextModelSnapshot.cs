﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Data;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Server.Models.Facility.Building", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BuildingName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FloorNo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Buildings");
                });

            modelBuilder.Entity("Server.Models.Facility.FacilityAsset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AssetConditionStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AssetId")
                        .HasColumnType("int");

                    b.Property<DateTime>("AssignedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ReceivedDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("SubCategoryId")
                        .HasColumnType("int");

                    b.Property<int>("WorkstationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AssetId");

                    b.HasIndex("SubCategoryId");

                    b.HasIndex("WorkstationId");

                    b.ToTable("FacilityAssets");
                });

            modelBuilder.Entity("Server.Models.Facility.Workstation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BuildingId")
                        .HasColumnType("int");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("Workstations");
                });

            modelBuilder.Entity("Server.Models.Inventory.Asset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Barcode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StockId")
                        .HasColumnType("int");

                    b.Property<int?>("SubCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Vendor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("WarrentyExpiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("condition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("StockId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("Server.Models.Inventory.Assign", b =>
                {
                    b.Property<int>("AssignId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AssignId"));

                    b.Property<int>("AssetId")
                        .HasColumnType("int");

                    b.Property<DateTime>("AssignTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<int>("ReqID")
                        .HasColumnType("int");

                    b.HasKey("AssignId");

                    b.HasIndex("AssetId");

                    b.ToTable("Assign");
                });

            modelBuilder.Entity("Server.Models.Inventory.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CategoryType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Server.Models.Inventory.Stock", b =>
                {
                    b.Property<int>("StockId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StockId"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("Cost")
                        .HasColumnType("int");

                    b.Property<DateTime>("PurchasedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SubCategoryId")
                        .HasColumnType("int");

                    b.Property<int>("SupplierId")
                        .HasColumnType("int");

                    b.Property<DateTime>("WarrantyExpiring")
                        .HasColumnType("datetime2");

                    b.HasKey("StockId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Stock");
                });

            modelBuilder.Entity("Server.Models.Inventory.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("SubCategoryType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("Server.Models.Facility.FacilityAsset", b =>
                {
                    b.HasOne("Server.Models.Inventory.Asset", "Asset")
                        .WithMany()
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Server.Models.Inventory.SubCategory", null)
                        .WithMany("FacilityAssets")
                        .HasForeignKey("SubCategoryId");

                    b.HasOne("Server.Models.Facility.Workstation", "Workstation")
                        .WithMany("FacilityAssets")
                        .HasForeignKey("WorkstationId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Workstation");
                });

            modelBuilder.Entity("Server.Models.Facility.Workstation", b =>
                {
                    b.HasOne("Server.Models.Facility.Building", "Building")
                        .WithMany("Workstations")
                        .HasForeignKey("BuildingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Building");
                });

            modelBuilder.Entity("Server.Models.Inventory.Asset", b =>
                {
                    b.HasOne("Server.Models.Inventory.Stock", "Stock")
                        .WithMany("Assets")
                        .HasForeignKey("StockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Inventory.SubCategory", null)
                        .WithMany("Assets")
                        .HasForeignKey("SubCategoryId");

                    b.Navigation("Stock");
                });

            modelBuilder.Entity("Server.Models.Inventory.Assign", b =>
                {
                    b.HasOne("Server.Models.Inventory.Asset", "Asset")
                        .WithMany("Assigns")
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");
                });

            modelBuilder.Entity("Server.Models.Inventory.Stock", b =>
                {
                    b.HasOne("Server.Models.Inventory.SubCategory", "SubCategory")
                        .WithMany()
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SubCategory");
                });

            modelBuilder.Entity("Server.Models.Inventory.SubCategory", b =>
                {
                    b.HasOne("Server.Models.Inventory.Category", "Category")
                        .WithMany("SubCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Server.Models.Facility.Building", b =>
                {
                    b.Navigation("Workstations");
                });

            modelBuilder.Entity("Server.Models.Facility.Workstation", b =>
                {
                    b.Navigation("FacilityAssets");
                });

            modelBuilder.Entity("Server.Models.Inventory.Asset", b =>
                {
                    b.Navigation("Assigns");
                });

            modelBuilder.Entity("Server.Models.Inventory.Category", b =>
                {
                    b.Navigation("SubCategories");
                });

            modelBuilder.Entity("Server.Models.Inventory.Stock", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("Server.Models.Inventory.SubCategory", b =>
                {
                    b.Navigation("Assets");

                    b.Navigation("FacilityAssets");
                });
#pragma warning restore 612, 618
        }
    }
}
