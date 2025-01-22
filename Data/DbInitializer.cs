using Bibliotek.Models;

public static class DbInitializer
{
    public static void Initialize(BibliotekContext context)
    {
        if (context.Books.Any())
        {
            return;
        }

        var books = new Book[]
        {
            new Book { Title = "1984", Author = "Goerge Orwell" },
            new Book { Title = "Words of Radiance", Author = "Brandon Sanderson" },
            new Book { Title = "La Sombra del Viento", Author = "Carlos Zafon" },
        };

        context.Books.AddRange(books);
        context.SaveChanges();
    }
}
