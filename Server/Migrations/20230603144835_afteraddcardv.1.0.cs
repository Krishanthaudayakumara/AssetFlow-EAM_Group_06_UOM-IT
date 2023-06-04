using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class afteraddcardv10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WarrentyExpiration",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "condition",
                table: "Assets",
                newName: "Condition");

            migrationBuilder.AddColumn<string>(
                name: "BarcodeImageBase64",
                table: "Assets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WarrantyExpiration",
                table: "Assets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BarcodeImageBase64",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "WarrantyExpiration",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "Condition",
                table: "Assets",
                newName: "condition");

            migrationBuilder.AddColumn<DateTime>(
                name: "WarrentyExpiration",
                table: "Assets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
