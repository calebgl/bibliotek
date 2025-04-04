using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliotek.Migrations
{
    /// <inheritdoc />
    public partial class CartConcurrentAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartBooks_CartId",
                table: "CartBooks");

            migrationBuilder.CreateIndex(
                name: "IX_CartBooks_CartId_BookId",
                table: "CartBooks",
                columns: new[] { "CartId", "BookId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartBooks_CartId_BookId",
                table: "CartBooks");

            migrationBuilder.CreateIndex(
                name: "IX_CartBooks_CartId",
                table: "CartBooks",
                column: "CartId");
        }
    }
}
