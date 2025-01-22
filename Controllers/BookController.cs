using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

[ApiController]
[Route("books")]
public class BookController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Book>> Get()
    {
        return context.Books.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Book> Get(uint id)
    {
        var book = context.Books.Find(id);
        if (book is null)
        {
            return NotFound();
        }

        return book;
    }
}
