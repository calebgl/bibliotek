using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cart")]
class CartController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public IActionResult ListCartBooks()
    {
        return Ok();
    }

    [HttpPost("books")]
    public IActionResult AddBookToCart()
    {
        return Ok();
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
