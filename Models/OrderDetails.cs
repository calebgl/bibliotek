namespace Bibliotek.Models;

public class OrderDetail
{
    public OrderDetail()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public uint Id { get; set; }
    public uint OrderId { get; set; }
    public uint BookId { get; set; }
    public uint Quantity { get; set; }
    public decimal Price { get; set; }

    public required Book Book { get; set; }
    public required Order Order { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
