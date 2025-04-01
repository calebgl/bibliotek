namespace Bibliotek.Models;

public class Book : ITimestamps
{
    public Book()
    {
        Reviews = new List<Review>();
        CartBooks = new List<CartBook>();
        BookStats = new BookStats { Book = this };
        StockQuantity = 0;
    }

    public uint Id { get; set; }

    public required string Title { get; set; }
    public required string Author { get; set; }
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public string? CoverUrl { get; set; }
    public DateOnly? ReleasedAt { get; set; }

    public uint StockQuantity { get; set; }
    public decimal Price { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public virtual List<Review> Reviews { get; set; }
    public virtual List<CartBook> CartBooks { get; set; }
    public virtual BookStats BookStats { get; set; }
}
