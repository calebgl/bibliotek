using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController(BibliotekContext context) : ControllerBase
{
    [HttpGet("books")]
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
                    b.StockQuantity,
                    b.Description,
                    TotalReviews = b.BookStats.TotalReviewCount,
                    AverageRating = b.BookStats.AverageRating,
                    b.CreatedAt,
                    b.UpdatedAt,
                })
                .OrderByDescending(b => b.UpdatedAt)
                .ThenByDescending(b => b.CreatedAt)
                .ToList()
        );
    }

    [HttpGet("books/{bookId}")]
    public IActionResult ViewBook(uint bookId)
    {
        var book = context
            .Books.Where(b => b.Id == bookId)
            .Select(b => new
            {
                b.Id,
                b.Title,
                b.Subtitle,
                b.Author,
                b.CoverUrl,
                b.Description,
                b.Price,
                b.StockQuantity,
                b.CreatedAt,
                b.UpdatedAt,
            })
            .SingleOrDefault();
        if (book is null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    [HttpPut("books/{bookId}")]
    public IActionResult EditBook(uint bookId, CreateBookDto book)
    {
        var bookToUpdate = context.Books.Where(b => b.Id == bookId).SingleOrDefault();
        if (bookToUpdate is null)
        {
            return NotFound();
        }

        Console.WriteLine(book);

        bookToUpdate.Title = book.Title;
        bookToUpdate.Subtitle = book.Subtitle;
        bookToUpdate.Author = book.Author;
        bookToUpdate.Description = book.Description;
        bookToUpdate.Price = book.Price;
        bookToUpdate.StockQuantity = book.StockQuantity;

        context.Books.Update(bookToUpdate);
        context.SaveChanges();

        return Ok(
            new
            {
                bookToUpdate.Id,
                bookToUpdate.Title,
                bookToUpdate.Author,
                bookToUpdate.Subtitle,
                bookToUpdate.CoverUrl,
                bookToUpdate.Description,
                bookToUpdate.Price,
                bookToUpdate.StockQuantity,
                bookToUpdate.CreatedAt,
                bookToUpdate.UpdatedAt,
            }
        );
    }

    [HttpPost("books")]
    public IActionResult Create(CreateBookDto book)
    {
        var newBook = new Book
        {
            Title = book.Title,
            Subtitle = book.Subtitle,
            Author = book.Author,
            Description = book.Description,
            ReleasedAt = book.ReleasedAt,
            StockQuantity = book.StockQuantity,
            Price = book.Price,
        };

        context.Books.Add(newBook);
        context.SaveChanges();

        return Ok(
            new
            {
                book.Title,
                book.Subtitle,
                book.Author,
                book.Description,
                book.ReleasedAt,
                book.StockQuantity,
                book.Price,
                AverageRating = 0,
                TotalReviews = 0,
            }
        );
    }
}

public record CreateBookDto(
    string Title,
    string? Subtitle,
    string Author,
    string? Description,
    DateOnly? ReleasedAt,
    uint StockQuantity,
    decimal Price
);