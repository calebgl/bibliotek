using Bibliotek.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/users")]
public class UserController(BibliotekContext context) : ControllerBase
{
    [HttpGet("saved-books")]
    [Authorize]
    public IActionResult ListSavedBooks()
    {
        var user = Utils.ValidateCurrentUser(User, context);
        var savedBooks = context
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

        return Ok(savedBooks);
    }

    [HttpPost("saved-books")]
    [Authorize]
    public IActionResult SaveBook(SaveBookDto saveBookDto)
    {
        var user = Utils.ValidateCurrentUser(User, context);
        var book = context.Books.Where(b => b.Id == saveBookDto.BookId).FirstOrDefault();
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

        return Ok(new { BookId = saveBookDto.BookId, CreatedAt = savedBook.CreatedAt });
    }

    [HttpDelete("saved-books/{bookId}")]
    [Authorize]
    public IActionResult RemoveSavedBook([FromRoute] uint bookId)
    {
        var user = Utils.ValidateCurrentUser(User, context);
        var savedBook = context
            .SavedBooks.Where(sb => sb.UserId == user.Id && sb.BookId == bookId)
            .FirstOrDefault();
        if (savedBook is null)
        {
            return NotFound();
        }

        context.SavedBooks.Remove(savedBook);
        context.SaveChanges();

        return NoContent();
    }
}

public record RegisterUserDto(string UserName);

public record SaveBookDto(uint BookId);
