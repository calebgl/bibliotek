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
        var book = context.Books.FirstOrDefault(b => b.Id == request.BookId);
        if (book is null)
        {
            return NotFound();
        }

        var savedBook = new SavedBook
        {
            UserId = user.Id,
            BookId = book.Id,
            User = user,
            Book = book,
        };

        context.SavedBooks.Update(savedBook);
        context.SaveChanges();

        return Ok(new { BookId = request.BookId, CreatedAt = savedBook.CreatedAt });
    }

    [HttpDelete("{bookId}")]
    [Authorize]
    [ValidateSession]
    public IActionResult RemoveSavedBook([FromRoute] uint bookId)
    {
        var user = HttpContext.GetCurrentUser();
        var savedBook = context.SavedBooks.FirstOrDefault(sb =>
            sb.UserId == user.Id && sb.BookId == bookId
        );
        if (savedBook is null)
        {
            return NotFound();
        }

        context.SavedBooks.Remove(savedBook);
        context.SaveChanges();

        return NoContent();
    }
}

public record SaveBookRequest(uint BookId);
