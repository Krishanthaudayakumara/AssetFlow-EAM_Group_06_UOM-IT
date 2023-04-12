﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Data;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230325125143_ChangeStock")]
    partial class ChangeStock
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Server.Models.Asset", b =>
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

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("Server.Models.Assign", b =>
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

                    b.Property<int>("EmployeeRequestId")
                        .HasColumnType("int");

                    b.Property<int>("ReqID")
                        .HasColumnType("int");

                    b.HasKey("AssignId");

                    b.HasIndex("AssetId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("EmployeeRequestId");

                    b.ToTable("Assigns");
                });

            modelBuilder.Entity("Server.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CategoryType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Server.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Server.Models.EmployeeRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Request")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeRequests");
                });

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

                    b.Property<int>("WorkstationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AssetId")
                        .IsUnique();

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

            modelBuilder.Entity("Server.Models.Stock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

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

                    b.HasKey("Id");

                    b.HasIndex("SubCategoryId");

                    b.HasIndex("SupplierId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("Server.Models.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int>("SubCategoryType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("subCategories");
                });

            modelBuilder.Entity("Server.Models.Supplier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Suppliers");
                });

            modelBuilder.Entity("Server.Models.Asset", b =>
                {
                    b.HasOne("Server.Models.Stock", "Stock")
                        .WithMany("Assets")
                        .HasForeignKey("StockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Stock");
                });

            modelBuilder.Entity("Server.Models.Assign", b =>
                {
                    b.HasOne("Server.Models.Asset", "Asset")
                        .WithMany("Assigns")
                        .HasForeignKey("AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Employee", "Employee")
                        .WithMany("Assigns")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.EmployeeRequest", "EmployeeRequest")
                        .WithMany("Assigns")
                        .HasForeignKey("EmployeeRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Asset");

                    b.Navigation("Employee");

                    b.Navigation("EmployeeRequest");
                });

            modelBuilder.Entity("Server.Models.EmployeeRequest", b =>
                {
                    b.HasOne("Server.Models.Employee", "Employee")
                        .WithMany("employeeRequests")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Server.Models.Facility.FacilityAsset", b =>
                {
                    b.HasOne("Server.Models.Asset", "Asset")
                        .WithOne("FacilityAsset")
                        .HasForeignKey("Server.Models.Facility.FacilityAsset", "AssetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Facility.Workstation", "Workstation")
                        .WithMany("FacilityAssets")
                        .HasForeignKey("WorkstationId")
                        .OnDelete(DeleteBehavior.Cascade)
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

            modelBuilder.Entity("Server.Models.Stock", b =>
                {
                    b.HasOne("Server.Models.SubCategory", "SubCategory")
                        .WithMany("Stocks")
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Supplier", "Supplier")
                        .WithMany("Stocks")
                        .HasForeignKey("SupplierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SubCategory");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("Server.Models.SubCategory", b =>
                {
                    b.HasOne("Server.Models.Category", "Category")
                        .WithMany("SubCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Server.Models.Asset", b =>
                {
                    b.Navigation("Assigns");

                    b.Navigation("FacilityAsset")
                        .IsRequired();
                });

            modelBuilder.Entity("Server.Models.Category", b =>
                {
                    b.Navigation("SubCategories");
                });

            modelBuilder.Entity("Server.Models.Employee", b =>
                {
                    b.Navigation("Assigns");

                    b.Navigation("employeeRequests");
                });

            modelBuilder.Entity("Server.Models.EmployeeRequest", b =>
                {
                    b.Navigation("Assigns");
                });

            modelBuilder.Entity("Server.Models.Facility.Building", b =>
                {
                    b.Navigation("Workstations");
                });

            modelBuilder.Entity("Server.Models.Facility.Workstation", b =>
                {
                    b.Navigation("FacilityAssets");
                });

            modelBuilder.Entity("Server.Models.Stock", b =>
                {
                    b.Navigation("Assets");
                });

            modelBuilder.Entity("Server.Models.SubCategory", b =>
                {
                    b.Navigation("Stocks");
                });

            modelBuilder.Entity("Server.Models.Supplier", b =>
                {
                    b.Navigation("Stocks");
                });
#pragma warning restore 612, 618
        }
    }
}
