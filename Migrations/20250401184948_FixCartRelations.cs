using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliotek.Migrations
{
    /// <inheritdoc />
    public partial class FixCartRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<uint>(
                name: "CartId1",
                table: "CartBooks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0u);

            migrationBuilder.CreateIndex(
                name: "IX_CartBooks_CartId1",
                table: "CartBooks",
                column: "CartId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CartBooks_Carts_CartId1",
                table: "CartBooks",
                column: "CartId1",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartBooks_Carts_CartId1",
                table: "CartBooks");

            migrationBuilder.DropIndex(
                name: "IX_CartBooks_CartId1",
                table: "CartBooks");

            migrationBuilder.DropColumn(
                name: "CartId1",
                table: "CartBooks");
        }
    }
}
