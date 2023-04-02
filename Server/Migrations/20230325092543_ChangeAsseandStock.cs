using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAsseandStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_SubCategories_SubCategoryId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "PurchasedDate",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "Cost",
                table: "Assets",
                newName: "StockId");

            migrationBuilder.RenameColumn(
                name: "AssignedTo",
                table: "Assets",
                newName: "condition");

            migrationBuilder.AlterColumn<int>(
                name: "SubCategoryId",
                table: "Assets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Barcode",
                table: "Assets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "EmployeeRequest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Request = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeRequest", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stock",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubCategoryId = table.Column<int>(type: "int", nullable: false),
                    PurchasedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Cost = table.Column<int>(type: "int", nullable: false),
                    WarrantyExpiring = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stock_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Assign",
                columns: table => new
                {
                    AssignId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<int>(type: "int", nullable: false),
                    AssignTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReqID = table.Column<int>(type: "int", nullable: false),
                    EmployeeRequestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assign", x => x.AssignId);
                    table.ForeignKey(
                        name: "FK_Assign_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assign_EmployeeRequest_EmployeeRequestId",
                        column: x => x.EmployeeRequestId,
                        principalTable: "EmployeeRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assets_StockId",
                table: "Assets",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_Assign_AssetId",
                table: "Assign",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_Assign_EmployeeRequestId",
                table: "Assign",
                column: "EmployeeRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_SubCategoryId",
                table: "Stock",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Stock_StockId",
                table: "Assets",
                column: "StockId",
                principalTable: "Stock",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_SubCategories_SubCategoryId",
                table: "Assets",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Stock_StockId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Assets_SubCategories_SubCategoryId",
                table: "Assets");

            migrationBuilder.DropTable(
                name: "Assign");

            migrationBuilder.DropTable(
                name: "Stock");

            migrationBuilder.DropTable(
                name: "EmployeeRequest");

            migrationBuilder.DropIndex(
                name: "IX_Assets_StockId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Barcode",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "condition",
                table: "Assets",
                newName: "AssignedTo");

            migrationBuilder.RenameColumn(
                name: "StockId",
                table: "Assets",
                newName: "Cost");

            migrationBuilder.AlterColumn<int>(
                name: "SubCategoryId",
                table: "Assets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PurchasedDate",
                table: "Assets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_SubCategories_SubCategoryId",
                table: "Assets",
                column: "SubCategoryId",
                principalTable: "SubCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
