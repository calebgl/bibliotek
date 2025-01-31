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
    public uint Id { get; set; }
    public required string StatusName { get; set; }
}
