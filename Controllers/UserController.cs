using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

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

    public IActionResult ListUsers()
    {
        return Ok(context.Users.Select(u => new { u.Id, u.Username }).ToList());
    }
}

public record RegisterUserDto(string Username);
