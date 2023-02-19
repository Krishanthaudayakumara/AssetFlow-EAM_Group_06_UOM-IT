using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkstationandRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkstationId",
                table: "FacilityAssets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Workstations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workstations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FacilityAssets_WorkstationId",
                table: "FacilityAssets",
                column: "WorkstationId");

            migrationBuilder.AddForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets",
                column: "WorkstationId",
                principalTable: "Workstations",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FacilityAssets_Workstations_WorkstationId",
                table: "FacilityAssets");

            migrationBuilder.DropTable(
                name: "Workstations");

            migrationBuilder.DropIndex(
                name: "IX_FacilityAssets_WorkstationId",
                table: "FacilityAssets");

            migrationBuilder.DropColumn(
                name: "WorkstationId",
                table: "FacilityAssets");
        }
    }
}
