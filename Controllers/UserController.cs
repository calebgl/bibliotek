using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public class UserController(BibliotekContext context) : ControllerBase
{
    [HttpPost]
    public IActionResult Register(RegisterUserDto user)
    {
        var newUser = new User { Username = user.Username };

        context.Users.Add(newUser);
        context.SaveChanges();

        return Ok(new { newUser.Id, newUser.Username });
    }
}

public record RegisterUserDto(string Username);
