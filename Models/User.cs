using Microsoft.AspNetCore.Identity;

namespace Bibliotek.Models;

public class User : IdentityUser<uint>
{
    public User()
    {
        Reviews = new List<Review>();
        Orders = new List<Order>();
        PaymentMethods = new List<PaymentMethod>();
        Cart = new Cart { User = this };
    }

    public Cart Cart { get; set; }

    public List<Review> Reviews { get; set; }
    public List<Order> Orders { get; set; }
    public List<PaymentMethod> PaymentMethods { get; set; }
}
