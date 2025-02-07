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
            new Book
            {
                Title = "1984",
                Author = "Goerge Orwell",
                Description =
                    "Eric Arthur Blair, mejor conocido como George Orwell, fue un novelista, periodista, ensayista y crítico británico nacido en la India, conocido mundialmente por su novelas distópicas Rebelión en la granja y 1984, siendo ésta última un retrato futurista del año 1984, en el cual Orwell quiso reflejar un Londres lúgubre donde la policía del pensamiento controla todo y, sin que sea suficiente, se apropia de la voluntad y de la conciencia de cada persona, por lo que el Estado trató de reescribir la historia para adaptarla a lo que considera la versión oficial de los hechos hasta que Winston Smith, el protagonista de dicha obra, decide cuestionar el sistema que los gobierna ý somete.",
                CoverUrl = "http://localhost:5173/1984.jpg",
                StockQuantity = 10,
                Price = 10.99M,
            },
            new Book
            {
                Title = "Words of Radiance",
                Author = "Brandon Sanderson",
                Description =
                    @"From #1 New York Times bestselling author Brandon Sanderson, Words of Radiance, Book Two of the Stormlight Archive, continues the immersive fantasy epic that The Way of Kings began.

Expected by his enemies to die the miserable death of a military slave, Kaladin survived to be given command of the royal bodyguards, a controversial first for a low-status 'darkeyes.' Now he must protect the king and Dalinar from every common peril as well as the distinctly uncommon threat of the Assassin, all while secretly struggling to master remarkable new powers that are somehow linked to his honorspren, Syl.

The Assassin, Szeth, is active again, murdering rulers all over the world of Roshar, using his baffling powers to thwart every bodyguard and elude all pursuers. Among his prime targets is Highprince Dalinar, widely considered the power behind the Alethi throne. His leading role in the war would seem reason enough, but the Assassin's master has much deeper motives.

Brilliant but troubled Shallan strives along a parallel path. Despite being broken in ways she refuses to acknowledge, she bears a terrible burden: to somehow prevent the return of the legendary Voidbringers and the civilization-ending Desolation that will follow. The secrets she needs can be found at the Shattered Plains, but just arriving there proves more difficult than she could have imagined.

Meanwhile, at the heart of the Shattered Plains, the Parshendi are making an epochal decision. Hard pressed by years of Alethi attacks, their numbers ever shrinking, they are convinced by their war leader, Eshonai, to risk everything on a desperate gamble with the very supernatural forces they once fled. The possible consequences for Parshendi and humans alike, indeed, for Roshar itself, are as dangerous as they are incalculable.

Other Tor books by Brandon Sanderson

The Cosmere
The Stormlight Archive
● The Way of Kings
● Words of Radiance
● Edgedancer (novella)
● Oathbringer
● Dawnshard (novella)
● Rhythm of War

The Mistborn Saga
The Original Trilogy
● Mistborn
● The Well of Ascension
● The Hero of Ages

Wax and Wayne
● The Alloy of Law
● Shadows of Self
● The Bands of Mourning
● The Lost Metal

Other Cosmere novels
● Elantris
● Warbreaker
● Tress of the Emerald Sea
● Yumi and the Nightmare Painter
● The Sunlit Man

Collection
● Arcanum Unbounded: The Cosmere Collection

The Alcatraz vs. the Evil Librarians series
● Alcatraz vs. the Evil Librarians
● The Scrivener's Bones
● The Knights of Crystallia
● The Shattered Lens
● The Dark Talent
● Bastille vs. the Evil Librarians (with Janci Patterson)

Other novels
● The Rithmatist
● Legion: The Many Lives of Stephen Leeds
● The Frugal Wizard's Handbook for Surviving Medieval England

Other books by Brandon Sanderson

The Reckoners
● Steelheart
● Firefight
● Calamity

Skyward
● Skyward
● Starsight
● Cytonic
● Skyward Flight (with Janci Patterson)
● Defiant",
                CoverUrl = "http://localhost:5173/wor.jpg",
                StockQuantity = 1000,
                Price = 8.99M,
            },
            new Book
            {
                Title = "La Sombra del Viento",
                Author = "Carlos Zafon",
                Description =
                    "Un amanecer de 1945 un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: El Cementerio de los Libros Olvidados. Allí, Daniel Sempere encuentra un libro maldito que cambiará el rumbo de su vida y le arrastrará a un laberinto de intrigas y secretos enterrados en el alma oscura de la ciudad. La sombra del viento es un misterio literario ambientado en la Barcelona de la primera mitad del siglo XX, desde los últimos esplendores del Modernismo a las tinieblas de la posguerra. La Sombra del Viento mezcla técnicas de relato de intriga, de novela histórica y de comedia de costumbres pero es, sobre todo, una tragedia histórica de amor cuyo eco se proyecta a través del tiempo. Con gran fuerza narrativa, el autor entrelaza tramas y enigmas a modo de muñecas rusas en un inolvidable relato sobre los secretos del corazón y el embrujo de los libros, manteniendo la intriga hasta la última página.",
                CoverUrl = "http://localhost:5173/sv.jpg",
                StockQuantity = 20,
                Price = 5.99M,
            },
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

        context.OrderStatuses.Add(new OrderStatus { StatusName = "PENDING" });
        context.SaveChanges();
    }
}
