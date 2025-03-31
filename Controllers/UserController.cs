using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase { }

public record RegisterUserDto(string UserName);
