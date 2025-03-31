using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliotek.Migrations
{
    /// <inheritdoc />
    public partial class SubstituteUserForBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartBooks_AspNetUsers_UserId",
                table: "CartBooks");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "CartBooks",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_CartBooks_UserId",
                table: "CartBooks",
                newName: "IX_CartBooks_BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartBooks_books_BookId",
                table: "CartBooks",
                column: "BookId",
                principalTable: "books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartBooks_books_BookId",
                table: "CartBooks");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "CartBooks",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CartBooks_BookId",
                table: "CartBooks",
                newName: "IX_CartBooks_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartBooks_AspNetUsers_UserId",
                table: "CartBooks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
