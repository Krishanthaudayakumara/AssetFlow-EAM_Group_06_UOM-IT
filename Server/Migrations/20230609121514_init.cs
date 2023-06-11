using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SupplyChainId",
                table: "Stocks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SupplyChains",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    AssetName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategoryId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LowQuantityThreshold = table.Column<int>(type: "int", nullable: false),
                    OrderQuantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupplyChains", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupplyChains_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupplyChains_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupplyChainId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_SupplyChains_SupplyChainId",
                        column: x => x.SupplyChainId,
                        principalTable: "SupplyChains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_SupplyChainId",
                table: "Stocks",
                column: "SupplyChainId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SupplyChainId",
                table: "Orders",
                column: "SupplyChainId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyChains_SubCategoryId",
                table: "SupplyChains",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplyChains_SupplierId",
                table: "SupplyChains",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stocks_SupplyChains_SupplyChainId",
                table: "Stocks",
                column: "SupplyChainId",
                principalTable: "SupplyChains",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stocks_SupplyChains_SupplyChainId",
                table: "Stocks");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "SupplyChains");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_SupplyChainId",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "SupplyChainId",
                table: "Stocks");
        }
    }
}
