using Bibliotek.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/users")]
public class UserController(BibliotekContext context) : ControllerBase
{
    [HttpGet("favorites")]
    [Authorize]
    public IActionResult ListFavoriteBooks()
    {
        var user = Utils.ValidateCurrentUser(User, context);
        var savedBooks = context
            .SavedBooks.Include(sb => sb.Book)
            .Where(sb => sb.UserId == user.Id)
            .Select(sb => new
            {
                BookId = sb.BookId,
                Title = sb.Book.Title,
                Price = sb.Book.Price,
                CoverUrl = sb.Book.CoverUrl,
                SavedAt = sb.CreatedAt,
            });

        return Ok(savedBooks);
    }

    [HttpPost("favorites")]
    [Authorize]
    public IActionResult MarkAsFavorite(MarkAsFavoriteDto markAsFavoriteDto)
    {
        var user = Utils.ValidateCurrentUser(User, context);
        var book = context.Books.Where(b => b.Id == markAsFavoriteDto.BookId).FirstOrDefault();
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

        return Ok(new { BookId = markAsFavoriteDto.BookId, CreatedAt = savedBook.CreatedAt });
    }

    [HttpDelete("favorites/{bookId}")]
    [Authorize]
    public IActionResult UnmarkAsFavorite([FromRoute] uint bookId)
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

public record MarkAsFavoriteDto(uint BookId);
