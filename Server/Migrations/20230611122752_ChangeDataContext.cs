using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDataContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_Workstations_Buildings_BuildingId",
                table: "Workstations");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets",
                column: "WorkstationId",
                principalTable: "Workstations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Workstations_Buildings_BuildingId",
                table: "Workstations",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets");

            migrationBuilder.DropForeignKey(
                name: "FK_Workstations_Buildings_BuildingId",
                table: "Workstations");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets",
                column: "WorkstationId",
                principalTable: "Workstations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workstations_Buildings_BuildingId",
                table: "Workstations",
                column: "BuildingId",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
