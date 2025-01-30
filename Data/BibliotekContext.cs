using Bibliotek.Models;
using Microsoft.EntityFrameworkCore;

public class BibliotekContext : DbContext
{
    public BibliotekContext(DbContextOptions<BibliotekContext> options)
        : base(options) { }

    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Review> Reviews { get; set; } = null!;
    public DbSet<BookStats> BookStats { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.ToTable("books");
            entity.Property(b => b.Id).ValueGeneratedOnAdd();
            entity.Property(b => b.PublishedAt).HasColumnType("date");
            entity
                .HasOne(b => b.BookStats)
                .WithOne(b => b.Book)
                .HasForeignKey<BookStats>(bs => bs.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.Property(u => u.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("reviews");
            entity.Property(r => r.Id).ValueGeneratedOnAdd();
            entity.Property(r => r.Rate).HasPrecision(2, 1).HasColumnType("decimal(2, 1)");

            entity.HasOne(r => r.User).WithMany(u => u.Reviews).HasForeignKey(r => r.UserId);
            entity.HasOne(r => r.Book).WithMany(b => b.Reviews).HasForeignKey(r => r.BookId);
        });

        modelBuilder.Entity<BookStats>(entity =>
        {
            entity.ToTable("books_stats");
            entity.Property(bs => bs.Id).ValueGeneratedOnAdd();
            entity.Property(bs => bs.AverageRating).HasColumnType("decimal(2, 1)");
            ;
        });

        base.OnModelCreating(modelBuilder);
    }
}
