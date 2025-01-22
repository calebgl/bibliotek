namespace Bibliotek.Models;

public class User
{
    public User()
    {
        Reviews = new List<Review>();
    }

    public uint Id { get; set; }
    public required string Username { get; set; }

    public List<Review> Reviews { get; set; }
}
