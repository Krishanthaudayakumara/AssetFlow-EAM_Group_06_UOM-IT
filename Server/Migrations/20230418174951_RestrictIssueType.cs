using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RestrictIssueType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_IssueTypes_IssueTypeId",
                table: "Teams");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_IssueTypes_IssueTypeId",
                table: "Teams",
                column: "IssueTypeId",
                principalTable: "IssueTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_IssueTypes_IssueTypeId",
                table: "Teams");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_IssueTypes_IssueTypeId",
                table: "Teams",
                column: "IssueTypeId",
                principalTable: "IssueTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
