using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class fixing2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubcategoryId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "Vendor",
                table: "FacilityAssets");

            migrationBuilder.RenameColumn(
                name: "SubcategoryId",
                table: "FacilityAssets",
                newName: "SubCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_FacilityAssets_SubcategoryId",
                table: "FacilityAssets",
                newName: "IX_FacilityAssets_SubCategoryId");

            migrationBuilder.AlterColumn<int>(
                name: "SubCategoryId",
                table: "FacilityAssets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubCategoryId",
                table: "FacilityAssets",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubCategoryId",
                table: "FacilityAssets");

            migrationBuilder.RenameColumn(
                name: "SubCategoryId",
                table: "FacilityAssets",
                newName: "SubcategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_FacilityAssets_SubCategoryId",
                table: "FacilityAssets",
                newName: "IX_FacilityAssets_SubcategoryId");

            migrationBuilder.AlterColumn<int>(
                name: "SubcategoryId",
                table: "FacilityAssets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_SubCategories_SubcategoryId",
                table: "FacilityAssets",
                column: "SubcategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id");
        }
    }
}
