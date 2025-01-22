using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bibliotek.Models;

public class Book
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public uint Id { get; set; }

    public required string Title { get; set; }

    public required string Author { get; set; }

    [DataType(DataType.Date)]
    public DateOnly? PublishedAt { get; set; }
}
