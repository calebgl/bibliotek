using Bibliotek.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/saved-books")]
public class SavedBookController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [ValidateSession]
    public IActionResult ListSavedBooks()
    {
        var user = HttpContext.GetCurrentUser();
        var books = context
            .SavedBooks.Include(sb => sb.Book)
            .Include(sb => sb.Book.BookStats)
            .Where(sb => sb.UserId == user.Id)
            .Select(sb => new
            {
                Id = sb.BookId,
                Title = sb.Book.Title,
                Author = sb.Book.Author,
                Price = sb.Book.Price,
                CoverUrl = sb.Book.CoverUrl,
                AverageRating = sb.Book.BookStats.AverageRating,
                TotalReviews = sb.Book.BookStats.TotalReviewCount,
                SavedAt = sb.CreatedAt,
            });

        var total = context.SavedBooks.Where(sb => sb.UserId == user.Id).Count();

        return Ok(new { books, total });
    }

    [HttpPost]
    [Authorize]
    [ValidateSession]
    public IActionResult SaveBook([FromBody] SaveBookRequest request)
    {
        var user = HttpContext.GetCurrentUser();
        var savedBook = context.SavedBooks.FirstOrDefault(sb =>
            sb.BookId == request.BookId && sb.UserId == user.Id
        );
        if (savedBook is not null)
        {
            return Ok(new { BookId = request.BookId, CreatedAt = savedBook.CreatedAt });
        }

        var book = context.Books.Find(request.BookId);
        if (book is null)
        {
            return NotFound();
        }

        savedBook = new SavedBook
        {
            UserId = user.Id,
            BookId = book.Id,
            User = user,
            Book = book,
        };

        context.SavedBooks.Add(savedBook);
        context.SaveChanges();

        return Ok(new { BookId = request.BookId, CreatedAt = savedBook.CreatedAt });
    }

    [HttpDelete("{bookId}")]
    [Authorize]
    [ValidateSession]
    public IActionResult RemoveSavedBook([FromRoute] uint bookId)
    {
        var user = HttpContext.GetCurrentUser();
        var deletedRows = context
            .SavedBooks.Where(sb => sb.UserId == user.Id && sb.BookId == bookId)
            .ExecuteDelete();

        if (deletedRows < 1)
        {
            return NotFound();
        }

        return NoContent();
    }
}

public record SaveBookRequest(uint BookId);
