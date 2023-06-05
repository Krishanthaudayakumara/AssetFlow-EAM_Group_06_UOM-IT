using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class afteraddcardv19 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stocks_SubCategories_SubCategoryId",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_SubCategoryId",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "SubCategoryId",
                table: "Stocks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubCategoryId",
                table: "Stocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
