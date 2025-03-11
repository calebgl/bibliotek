namespace Bibliotek.Models;

public interface ITimestamps
{
    DateTime CreatedAt { get; set; }
    DateTime UpdatedAt { get; set; }
}
