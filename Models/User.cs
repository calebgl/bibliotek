namespace Bibliotek.Models;

public class User
{
    public User()
    {
        Reviews = new List<Review>();
        Orders = new List<Order>();
        PaymentMethods = new List<PaymentMethod>();
    }

    public uint Id { get; set; }
    public required string Username { get; set; }

    public List<Review> Reviews { get; set; }
    public List<Order> Orders { get; set; }
    public List<PaymentMethod> PaymentMethods { get; set; }
}
