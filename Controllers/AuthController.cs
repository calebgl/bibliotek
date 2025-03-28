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
    [Route("signin-github")]
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
                "Authentication string 'SuccessRedirectUrl' not found."
            );
        var errorRedirectUrl =
            authNSection["ErrorRedirectUrl"]
            ?? throw new InvalidOperationException(
                "Authentication string 'ErrorRedirectUrl' not found."
            );

        var info = await signInManager.GetExternalLoginInfoAsync();
        if (info is null)
        {
            logger.LogWarning("External login info is null");
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
                logger.LogError("Email is required from the login provider");
                return Redirect(errorRedirectUrl);
            }

            var userName = info.Principal.FindFirstValue(ClaimTypes.NameIdentifier);
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
                logger.LogError("User creation failed", createResult.Errors);
                return Redirect(errorRedirectUrl);
            }

            await userManager.AddLoginAsync(user, info);
            await signInManager.SignInAsync(user, isPersistent: false);

            return Redirect(successRedirectUrl);
        }
        catch (Exception ex)
        {
            logger.LogError("Auth: failed to login", ex);
            return Redirect(successRedirectUrl);
        }
    }

    [HttpGet("session")]
    [Authorize]
    public IActionResult ValidateSession()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Utils.Assert(userId);

        var user = context.Users.Where(u => u.Id == uint.Parse(userId!)).FirstOrDefault();
        Utils.Assert(user);
        Utils.Assert(!string.IsNullOrWhiteSpace(user!.Email));
        Utils.Assert(!string.IsNullOrWhiteSpace(user!.UserName));

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