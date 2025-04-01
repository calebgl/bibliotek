using Bibliotek.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class BibliotekContext(DbContextOptions<BibliotekContext> options)
    : IdentityDbContext<User, IdentityRole<uint>, uint>(options)
{
    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<Review> Reviews { get; set; } = null!;
    public DbSet<BookStats> BookStats { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
    public DbSet<OrderStatus> OrderStatuses { get; set; } = null!;
    public DbSet<PaymentMethod> PaymentMethods { get; set; } = null!;
    public DbSet<PaymentCard> PaymentCards { get; set; } = null!;
    public DbSet<PaymentPayPal> PaymentPayPals { get; set; } = null!;
    public DbSet<PaymentCash> PaymentCashes { get; set; } = null!;
    public DbSet<SavedBook> SavedBooks { get; set; } = null!;
    public DbSet<Cart> Carts { get; set; } = null!;
    public DbSet<CartBook> CartBooks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.ToTable("books");
            entity.Property(b => b.Id).ValueGeneratedOnAdd();
            entity.Property(b => b.ReleasedAt).HasColumnType("date");
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

            entity
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
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

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("orders");
            entity.Property(o => o.Id).ValueGeneratedOnAdd();
            entity.HasOne(o => o.User).WithMany(u => u.Orders).HasForeignKey(o => o.UserId);
            entity
                .HasOne(o => o.OrderStatus)
                .WithMany(os => os.Orders)
                .HasForeignKey(o => o.OrderStatusId);
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.ToTable("order_details");
            entity.Property(od => od.Id).ValueGeneratedOnAdd();
            entity.Property(od => od.Price).HasColumnType("decimal(5, 2)");
            entity
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);
        });

        modelBuilder.Entity<OrderStatus>(entity =>
        {
            entity.ToTable("order_statuses");
            entity.Property(os => os.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<PaymentMethod>(entity =>
        {
            entity.ToTable("payment_methods");
            entity.Property(pm => pm.Id).ValueGeneratedOnAdd();
            entity
                .HasOne(pm => pm.User)
                .WithMany(u => u.PaymentMethods)
                .HasForeignKey(pm => pm.UserId);

            entity
                .HasOne(pm => pm.PaymentCard)
                .WithOne(pc => pc.PaymentMethod)
                .HasForeignKey<PaymentCard>(pc => pc.PaymentMethodId);

            entity
                .HasOne(pm => pm.PaymentCash)
                .WithOne(pc => pc.PaymentMethod)
                .HasForeignKey<PaymentCash>(pc => pc.PaymentMethodId);

            entity
                .HasOne(pm => pm.PaymentPayPal)
                .WithOne(pp => pp.PaymentMethod)
                .HasForeignKey<PaymentPayPal>(pp => pp.PaymentMethodId);
        });

        modelBuilder.Entity<PaymentCash>(entity =>
        {
            entity.ToTable("payments_cash");
            entity.Property(pc => pc.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<PaymentPayPal>(entity =>
        {
            entity.ToTable("payments_paypal");
            entity.Property(pp => pp.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<PaymentCard>(entity =>
        {
            entity.ToTable("payments_card");
            entity.Property(pc => pc.Id).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.Property(c => c.Id).ValueGeneratedOnAdd();
            entity
                .HasMany(c => c.CartBooks)
                .WithOne()
                .HasForeignKey(cb => cb.CartId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<CartBook>(entity =>
        {
            entity.Property(cb => cb.Id).ValueGeneratedOnAdd();
            entity
                .HasOne(cb => cb.Book)
                .WithMany(b => b.CartBooks)
                .HasForeignKey(cb => cb.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        base.OnModelCreating(modelBuilder);
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e =>
                e.Entity is ITimestamps
                && (e.State == EntityState.Added || e.State == EntityState.Modified)
            );

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Property("CreatedAt").CurrentValue = DateTime.UtcNow;
            }

            entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
        }
    }
}
