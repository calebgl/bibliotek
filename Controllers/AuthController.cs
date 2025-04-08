using System.Security.Claims;
using Bibliotek.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    SignInManager<User> signInManager,
    UserManager<User> userManager,
    IConfiguration configuration,
    ILogger<AuthController> logger,
    BibliotekContext context
) : ControllerBase
{
    [HttpGet]
    [Route("~/signin-github")]
    public IActionResult SignInGithub()
    {
        return RedirectToAction("HandleExternalLogin", "AuthController");
    }

    [HttpGet("github")]
    public IActionResult SignInGitHub()
    {
        var redirectUrl = Url.Action(nameof(HandleExternalLogin), "Auth");
        var properties = signInManager.ConfigureExternalAuthenticationProperties(
            "GitHub",
            redirectUrl
        );
        return Challenge(properties, "GitHub");
    }

    [HttpGet("external")]
    public async Task<IActionResult> HandleExternalLogin()
    {
        var authNSection = configuration.GetRequiredSection("Authentication");
        var successRedirectUrl =
            authNSection["SuccessRedirectUrl"]
            ?? throw new InvalidOperationException(
                "Authentication configuration is incomplete: SuccessRedirectUrl not found"
            );
        var errorRedirectUrl =
            authNSection["ErrorRedirectUrl"]
            ?? throw new InvalidOperationException(
                "Authentication configuration is incomplete: ErrorRedirectUrl not found"
            );

        var info = await signInManager.GetExternalLoginInfoAsync();
        if (info is null)
        {
            logger.LogWarning(
                "External authentication failed: No login information received from provider"
            );
            return Redirect(errorRedirectUrl);
        }

        var result = await signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            isPersistent: false
        );

        if (result.Succeeded)
        {
            return Redirect(successRedirectUrl);
        }

        try
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrWhiteSpace(email))
            {
                logger.LogError(
                    "External authentication failed: Email claim not provided by {Provider}",
                    info.LoginProvider
                );
                return Redirect(errorRedirectUrl);
            }

            var userName = info.Principal.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrWhiteSpace(userName))
            {
                byte[] bytes = new byte[8];
                Random.Shared.NextBytes(bytes);
                userName = email.Split("@")[0] + bytes.ToString();
            }

            var user = new User { UserName = userName, Email = email };

            var createResult = await userManager.CreateAsync(user);
            if (!createResult.Succeeded)
            {
                var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                logger.LogError("User creation failed for {Email}: {Errors}", email, errors);
                return Redirect(errorRedirectUrl);
            }

            await userManager.AddLoginAsync(user, info);
            await signInManager.SignInAsync(user, isPersistent: false);

            return Redirect(successRedirectUrl);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "External authentication failed: {Message}", ex.Message);
            return Redirect(errorRedirectUrl);
        }
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var user = new User { UserName = request.UserName, Email = request.Email };
        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest();
        }

        await signInManager.SignInAsync(user, isPersistent: false);

        return NoContent();
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = context.Users.FirstOrDefault(u => u.Email == request.Email);
        if (user is null)
        {
            return Unauthorized();
        }

        var result = await signInManager.CheckPasswordSignInAsync(
            user,
            request.Password,
            lockoutOnFailure: false
        );
        if (!result.Succeeded)
        {
            return Unauthorized();
        }

        await signInManager.SignInAsync(user, isPersistent: false);

        return NoContent();
    }

    [HttpPost]
    [Route("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [HttpGet("session")]
    [Authorize]
    [ValidateSession]
    public IActionResult ValidateSession()
    {
        var user = HttpContext.GetCurrentUser();
        return Ok(
            new
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
            }
        );
    }
}

public record LoginRequest(string Email, string Password);

public record RegisterRequest(string UserName, string Email, string Password);
