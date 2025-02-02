namespace Bibliotek.Models;

public class Order
{
    public Order()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;

        OrderDetails = new List<OrderDetail>();
    }

    public uint Id { get; set; }
    public uint UserId { get; set; }
    public uint OrderStatusId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public required User User { get; set; }
    public required OrderStatus OrderStatus { get; set; }

    public List<OrderDetail> OrderDetails { get; set; }
}
