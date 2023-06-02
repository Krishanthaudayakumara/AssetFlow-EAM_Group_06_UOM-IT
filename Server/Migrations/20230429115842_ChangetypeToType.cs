using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangetypeToType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type",
                table: "Workstations",
                newName: "Type");

            migrationBuilder.AddColumn<int>(
                name: "BuildingName",
                table: "Workstations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingName",
                table: "Workstations");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Workstations",
                newName: "type");
        }
    }
}
