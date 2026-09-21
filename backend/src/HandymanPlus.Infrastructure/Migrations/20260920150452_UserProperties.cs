using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HandymanPlus.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HandymanType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsHandyman",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HandymanType",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsHandyman",
                table: "AspNetUsers");
        }
    }
}
