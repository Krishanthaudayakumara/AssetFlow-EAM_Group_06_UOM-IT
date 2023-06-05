using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class afteraddcardv18 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stocks_SubCategories_SubCategoryId1",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_SubCategoryId1",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "SubCategoryId1",
                table: "Stocks");

            migrationBuilder.AlterColumn<int>(
                name: "SubCategoryId",
                table: "Stocks",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "SubCategoryType",
                table: "Stocks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_SubCategoryId",
                table: "Stocks",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stocks_SubCategories_SubCategoryId",
                table: "Stocks",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stocks_SubCategories_SubCategoryId",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_SubCategoryId",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "SubCategoryType",
                table: "Stocks");

            migrationBuilder.AlterColumn<string>(
                name: "SubCategoryId",
                table: "Stocks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId1",
                table: "Stocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_SubCategoryId1",
                table: "Stocks",
                column: "SubCategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Stocks_SubCategories_SubCategoryId1",
                table: "Stocks",
                column: "SubCategoryId1",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
