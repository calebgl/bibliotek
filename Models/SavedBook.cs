namespace Bibliotek.Models;

public class SavedBook
{
    public SavedBook()
    {
        CreatedAt = DateTime.UtcNow;
    }

    public uint Id { get; set; }
    public uint UserId { get; set; }
    public uint BookId { get; set; }

    public DateTime CreatedAt { get; set; }

    public required User User { get; set; }
    public required Book Book { get; set; }
}
