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
    public DateOnly? PublishedAt { get; set; }

    public uint StockQuantity { get; set; }
    public decimal Price { get; set; }

    public List<Review> Reviews { get; set; }
    public BookStats BookStats { get; set; }
}
