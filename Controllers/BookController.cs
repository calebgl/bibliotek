using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/books")]
public class BookController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            context
                .Books.Include(b => b.BookStats)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
                    Reviews = new
                    {
                        Ones = b.BookStats.OneStarReviewCount,
                        Two = b.BookStats.TwoStarReviewCount,
                        Three = b.BookStats.ThreeStarReviewCount,
                        Four = b.BookStats.FourStarReviewCount,
                        Five = b.BookStats.FiveStarReviewCount,
                        Count = b.BookStats.TotalReviewCount,
                        Rating = b.BookStats.AverageRating,
                    },
                })
                .ToList()
        );
    }

    [HttpPost]
    public IActionResult Create(CreateBookDto book)
    {
        var newBook = new Book { Title = book.Title, Author = book.Author };

        context.Books.Add(newBook);
        context.SaveChanges();

        return Ok(
            new
            {
                newBook.Id,
                newBook.Title,
                newBook.Author,
                newBook.PublishedAt,
                newBook.Reviews,
            }
        );
    }
}

public record CreateBookDto(string Title, string Author);
