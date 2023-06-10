using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAssignTaskTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssignTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TaskStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExternalWorkerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssignTasks_ExternalWorkers_ExternalWorkerId",
                        column: x => x.ExternalWorkerId,
                        principalTable: "ExternalWorkers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssignTasks_ExternalWorkerId",
                table: "AssignTasks",
                column: "ExternalWorkerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssignTasks");
        }
    }
}
