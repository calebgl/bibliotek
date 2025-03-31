namespace Bibliotek.Models;

public class CartBook : ITimestamps
{
    public CartBook()
    {
        Quantity = 1;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public uint Id { get; set; }
    public uint CartId { get; set; }
    public uint BookId { get; set; }
    public uint Quantity { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public required Cart Cart { get; set; }
    public required Book Book { get; set; }
}
