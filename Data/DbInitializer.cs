using Bibliotek.Models;

public static class DbInitializer
{
    public static void Initialize(BibliotekContext context)
    {
        if (context.Books.Any())
        {
            return;
        }

        var users = new User[]
        {
            new User { Username = "calebgl" },
            new User { Username = "jijijaja" },
        };

        context.Users.AddRange(users);
        context.SaveChanges();

        var books = new Book[]
        {
            new Book { Title = "1984", Author = "Goerge Orwell" },
            new Book { Title = "Words of Radiance", Author = "Brandon Sanderson" },
            new Book { Title = "La Sombra del Viento", Author = "Carlos Zafon" },
        };

        context.Books.AddRange(books);
        context.SaveChanges();

        var reviews = new Review[]
        {
            new Review
            {
                UserId = users[0].Id,
                BookId = books[0].Id,
                User = users[0],
                Comment = "Excelente libro",
                Book = books[0],
                Rate = 4.5M,
            },
            new Review
            {
                UserId = users[1].Id,
                BookId = books[0].Id,
                User = users[1],
                Book = books[0],
                Comment =
                    "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
                Rate = 4.8M,
            },
            new Review
            {
                UserId = users[0].Id,
                BookId = books[0].Id,
                User = users[0],
                Book = books[0],
                Comment = "                  ",
                Rate = 5,
            },
        };

        context.Reviews.AddRange(reviews);
        context.SaveChanges();

        var booksStats = new Dictionary<Tuple<uint, uint>, BookStats> { };
        foreach (Review review in reviews)
        {
            var key = new Tuple<uint, uint>(review.UserId, review.BookId);
            if (booksStats.ContainsKey(key))
            {
                var stats = booksStats[key];
                stats.AverageRating =
                    ((stats.AverageRating * stats.TotalReviewCount) + review.Rate)
                    / (stats.TotalReviewCount + 1);
                stats.TotalReviewCount++;
            }
            else
            {
                var stats = new BookStats
                {
                    BookId = review.BookId,
                    Book = review.Book,
                    TotalReviewCount = 1,
                    AverageRating = review.Rate,
                };
                uint _ = review.Rate switch
                {
                    0 => stats.OneStarReviewCount++,
                    (>= 1) and (< 2) => stats.OneStarReviewCount++,
                    (>= 2) and (< 3) => stats.TwoStarReviewCount++,
                    (>= 3) and (< 4) => stats.ThreeStarReviewCount++,
                    (>= 4) and (< 5) => stats.FourStarReviewCount++,
                    5 => stats.FiveStarReviewCount++,
                    _ => 0,
                };
                booksStats[key] = stats;
            }
        }

        context.BookStats.AddRange(booksStats.Values);
        context.SaveChanges();
    }
}
