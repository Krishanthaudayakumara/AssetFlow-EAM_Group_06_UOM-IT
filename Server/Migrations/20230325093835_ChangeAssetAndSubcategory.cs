using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAssetAndSubcategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubcategoryId",
                table: "FacilityAssets");

            migrationBuilder.DropIndex(
                name: "IX_FacilityAssets_SubcategoryId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Vendor",
                table: "FacilityAssets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FacilityAssets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SubcategoryId",
                table: "FacilityAssets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Vendor",
                table: "FacilityAssets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_FacilityAssets_SubcategoryId",
                table: "FacilityAssets",
                column: "SubcategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubcategoryId",
                table: "FacilityAssets",
                column: "SubcategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
