using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class DltResForIssue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_IssueTypes_IssueTypeId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_IssueTypes_IssueTypeId",
                table: "Tickets",
                column: "IssueTypeId",
                principalTable: "IssueTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_IssueTypes_IssueTypeId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_IssueTypes_IssueTypeId",
                table: "Tickets",
                column: "IssueTypeId",
                principalTable: "IssueTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
