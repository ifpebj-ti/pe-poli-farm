using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedProfessionalIdPatientExam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProfessionalId",
                table: "PatientExamsEntity",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PatientExamsEntity_ProfessionalId",
                table: "PatientExamsEntity",
                column: "ProfessionalId");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientExamsEntity_Users_ProfessionalId",
                table: "PatientExamsEntity",
                column: "ProfessionalId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientExamsEntity_Users_ProfessionalId",
                table: "PatientExamsEntity");

            migrationBuilder.DropIndex(
                name: "IX_PatientExamsEntity_ProfessionalId",
                table: "PatientExamsEntity");

            migrationBuilder.DropColumn(
                name: "ProfessionalId",
                table: "PatientExamsEntity");
        }
    }
}
