using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddASSetIdToFacilityTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetId",
                table: "FacilityAssets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FacilityAssets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Vendor",
                table: "FacilityAssets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_FacilityAssets_AssetId",
                table: "FacilityAssets",
                column: "AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_Assets_AssetId",
                table: "FacilityAssets",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_Assets_AssetId",
                table: "FacilityAssets");

            migrationBuilder.DropIndex(
                name: "IX_FacilityAssets_AssetId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "AssetId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Vendor",
                table: "FacilityAssets");
        }
    }
}
