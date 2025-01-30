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
                .Books.Include(b => b.Reviews)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Author,
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
