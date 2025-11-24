using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddExtraFieldsToAnamnese : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardiacBubbles",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ConsciousnessLevel",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MotorResponse",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PulmonaryAuscultation",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pulse",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Pupils",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RespiratoryPattern",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Rhythm",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SkinColor",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Speech",
                table: "Anamnesis",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardiacBubbles",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "ConsciousnessLevel",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "MotorResponse",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "PulmonaryAuscultation",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "Pulse",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "Pupils",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "RespiratoryPattern",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "Rhythm",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "SkinColor",
                table: "Anamnesis");

            migrationBuilder.DropColumn(
                name: "Speech",
                table: "Anamnesis");
        }
    }
}
