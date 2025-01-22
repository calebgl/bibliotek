namespace Bibliotek.Models;

public class Book
{
    public Book()
    {
        Reviews = new List<Review>();
    }

    public uint Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public DateOnly PublishedAt { get; set; }

    public List<Review> Reviews { get; set; }
}
