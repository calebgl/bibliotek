namespace Bibliotek.Models;

public class Review
{
    public Review()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public uint Id { get; set; }
    public decimal Rate { get; set; }
    public string? Comment { get; set; }
    public uint UserId { get; set; }
    public uint BookId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public required User User { get; set; }
    public required Book Book { get; set; }
}
