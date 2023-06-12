using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class Changenull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks");

            migrationBuilder.AlterColumn<int>(
                name: "BuildingId",
                table: "AssignTasks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks");

            migrationBuilder.AlterColumn<int>(
                name: "BuildingId",
                table: "AssignTasks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
