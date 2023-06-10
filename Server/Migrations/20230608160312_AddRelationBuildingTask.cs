using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationBuildingTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuildingId",
                table: "AssignTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AssignTasks_BuildingId",
                table: "AssignTasks",
                column: "BuildingId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignTasks_Buildings_BuildingId",
                table: "AssignTasks");

            migrationBuilder.DropIndex(
                name: "IX_AssignTasks_BuildingId",
                table: "AssignTasks");

            migrationBuilder.DropColumn(
                name: "BuildingId",
                table: "AssignTasks");
        }
    }
}
