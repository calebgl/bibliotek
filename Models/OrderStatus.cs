namespace Bibliotek.Models;

// Pending,
// Processing,
// Shipped,
// Delivered,
// Cancelled,
// Refunded,
// OnHold,
// Failed,
// Returned,
// Completed,
public class OrderStatus
{
    public OrderStatus()
    {
        Orders = new List<Order>();
    }

    public uint Id { get; set; }
    public required string StatusName { get; set; }

    public List<Order> Orders { get; set; }
}
