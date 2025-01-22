using Bibliotek.Models;
using Microsoft.EntityFrameworkCore;

public class BibliotekContext : DbContext
{
    public BibliotekContext(DbContextOptions<BibliotekContext> options)
        : base(options) { }

    public DbSet<Book> Books { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>().ToTable("books");
    }
}
