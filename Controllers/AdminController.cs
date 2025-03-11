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
                })
                .ToList()
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
