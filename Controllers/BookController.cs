using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/books")]
public class BookController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public IActionResult ListBooks()
    {
        return Ok(
            context
                .Books.Include(b => b.BookStats)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
                    b.CoverUrl,
                    b.Price,
                    TotalReviews = b.BookStats.TotalReviewCount,
                    AverageRating = b.BookStats.AverageRating,
                })
                .ToList()
        );
    }

    [HttpGet("{bookId}")]
    public IActionResult ViewBook(uint bookId)
    {
        return Ok(
            context
                .Books.Include(b => b.BookStats)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
                    b.CoverUrl,
                    b.Description,
                    b.Price,
                    TotalReviews = b.BookStats.TotalReviewCount,
                    AverageRating = b.BookStats.AverageRating,
                    Stars = new
                    {
                        One = b.BookStats.OneStarReviewCount,
                        Two = b.BookStats.TwoStarReviewCount,
                        Three = b.BookStats.ThreeStarReviewCount,
                        Four = b.BookStats.FourStarReviewCount,
                        Five = b.BookStats.FiveStarReviewCount,
                    },
                })
                .Where(b => b.Id == bookId)
                .Single()
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
                newBook.ReleasedAt,
                newBook.Reviews,
            }
        );
    }
}

public record CreateBookDto(string Title, string Author);
