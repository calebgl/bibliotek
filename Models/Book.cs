namespace Bibliotek.Models;

public class Book
{
    public Book()
    {
        Reviews = new List<Review>();
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

    public List<Review> Reviews { get; set; }
    public BookStats BookStats { get; set; }
}
