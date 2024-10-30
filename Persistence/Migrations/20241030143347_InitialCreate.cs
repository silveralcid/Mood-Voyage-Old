using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LivelihoodAvgRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    ConnectionAvgRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    EsteemAvgRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    AutonomyAvgRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    PurposeAvgRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    ActualizationAvgRating = table.Column<byte>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessments", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assessments");
        }
    }
}
