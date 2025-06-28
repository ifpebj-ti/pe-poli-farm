using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AdicionadosNovosDbSets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnamneseEntity_MedicalRecords_MedicalRecordId",
                table: "AnamneseEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnamneseEntity",
                table: "AnamneseEntity");

            migrationBuilder.RenameTable(
                name: "AnamneseEntity",
                newName: "Anamnesis");

            migrationBuilder.RenameIndex(
                name: "IX_AnamneseEntity_MedicalRecordId",
                table: "Anamnesis",
                newName: "IX_Anamnesis_MedicalRecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Anamnesis",
                table: "Anamnesis",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Anamnesis_MedicalRecords_MedicalRecordId",
                table: "Anamnesis",
                column: "MedicalRecordId",
                principalTable: "MedicalRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Anamnesis_MedicalRecords_MedicalRecordId",
                table: "Anamnesis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Anamnesis",
                table: "Anamnesis");

            migrationBuilder.RenameTable(
                name: "Anamnesis",
                newName: "AnamneseEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Anamnesis_MedicalRecordId",
                table: "AnamneseEntity",
                newName: "IX_AnamneseEntity_MedicalRecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnamneseEntity",
                table: "AnamneseEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnamneseEntity_MedicalRecords_MedicalRecordId",
                table: "AnamneseEntity",
                column: "MedicalRecordId",
                principalTable: "MedicalRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
