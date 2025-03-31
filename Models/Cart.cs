namespace Bibliotek.Models;

public class Cart : ITimestamps
{
    public Cart()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        CartBooks = new();
    }

    public uint Id { get; set; }
    public uint UserId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public required User User { get; set; }

    public List<CartBook> CartBooks { get; set; }
}
