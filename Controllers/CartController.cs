using System.Diagnostics;
using Bibliotek.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/cart")]
public class CartController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [ValidateSession]
    public IActionResult ListCartBooks()
    {
        var user = HttpContext.GetCurrentUser();
        var books = context
            .Carts.Where(c => c.UserId == user.Id)
            .SelectMany(c => c.CartBooks)
            .Include(cb => cb.Book)
            .Select(cb => new
            {
                cb.Book.Id,
                cb.Book.Title,
                cb.Book.Author,
                cb.Book.Subtitle,
                cb.Book.CoverUrl,
                cb.Book.Price,
                cb.Quantity,
                AddedAt = cb.CreatedAt,
            })
            .ToList();

        return Ok(books);
    }

    [HttpPost("books")]
    [Authorize]
    [ValidateSession]
    public IActionResult AddBookToCart(AddCartBookRequest request)
    {
        var user = HttpContext.GetCurrentUser();
        var cart = context.Carts.FirstOrDefault(c => c.UserId == user.Id);
        Debug.Assert(cart is not null);

        var book = context.Books.FirstOrDefault(b => b.Id == request.BookId);
        if (book is null)
        {
            return NotFound();
        }

        var quantity = request.quantity ?? 1;
        var cartBook = context.CartBooks.FirstOrDefault(cb =>
            cb.CartId == cart.Id && cb.BookId == book.Id
        );
        if (cartBook is not null)
        {
            cartBook.Quantity += quantity;
        }
        else
        {
            cartBook = new CartBook
            {
                BookId = book.Id,
                CartId = cart.Id,
                Cart = cart,
                Book = book,
                Quantity = quantity,
            };
            context.CartBooks.Add(cartBook);
        }

        context.SaveChanges();

        return Ok(
            new
            {
                BookId = book.Id,
                quantity = cartBook.Quantity,
                AddedAt = cartBook.CreatedAt,
            }
        );
    }

    [HttpPut("books/{bookId}")]
    public IActionResult UpdateCartBook([FromRoute] uint bookId)
    {
        return Ok();
    }

    [HttpDelete("books")]
    public IActionResult RemoveBookFromCart([FromRoute] uint bookId)
    {
        return Ok();
    }

    [HttpDelete("books/{bookId}")]
    public IActionResult ClearCart([FromRoute] uint bookId)
    {
        return Ok();
    }

    [HttpPost("checkout")]
    public IActionResult CheckoutCart()
    {
        return Ok();
    }
}

public record AddCartBookRequest(uint BookId, uint? quantity);

public record UpdateCartBookRequest();
