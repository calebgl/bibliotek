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
    [ValidateSession(throwOnValidationFailure: false)]
    public IActionResult ViewBook(uint bookId)
    {
        var user = HttpContext.GetCurrentPosibleUser();
        var book = context
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
            .FirstOrDefault(b => b.Id == bookId);

        if (book is null)
        {
            return NotFound();
        }

        if (user is null)
        {
            return Ok(book);
        }

        var obj = new Object();
        var isSaved = context.SavedBooks.Any(sb => sb.BookId == bookId && sb.UserId == user.Id);

        return Ok(
            new
            {
                book.Id,
                book.Title,
                book.Author,
                book.CoverUrl,
                book.Description,
                book.Price,
                book.TotalReviews,
                book.AverageRating,
                book.Stars,
                isSaved,
            }
        );
    }
}
