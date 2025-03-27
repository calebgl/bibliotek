using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

public class AuthProviderController : ControllerBase
{
    [HttpGet("signin-github")]
    public IActionResult SignInGithub()
    {
        return RedirectToAction("HandleExternalLogin", "AuthController");
    }
}
