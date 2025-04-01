using System.Diagnostics;
using System.Security.Claims;
using Bibliotek.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ValidateSession(
    BibliotekContext dbContext,
    SignInManager<User> signInManager,
    ILogger<ValidateSession> logger
) : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next
    )
    {
        try
        {
            var contextClaim = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (contextClaim is null)
            {
                throw new InvalidOperationException(
                    $"Authentication failed: User identifier claim not found"
                );
            }

            var userIdString = contextClaim.Value;
            if (string.IsNullOrWhiteSpace(userIdString))
            {
                throw new InvalidOperationException(
                    $"Authentication failed: Empty user identifier"
                );
            }

            uint userId;
            if (uint.TryParse(userIdString, out userId))
            {
                throw new InvalidOperationException(
                    $"Authentication failed: Invalid user id format '{userIdString}'"
                );
            }

            var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user is null)
            {
                throw new InvalidOperationException(
                    $"Authentication failed: User with Id {userId} not found"
                );
            }

            Debug.Assert(
                !string.IsNullOrWhiteSpace(user.Email),
                "User email should never be empty"
            );
            Debug.Assert(
                !string.IsNullOrWhiteSpace(user.UserName),
                "User name should never be empty"
            );

            context.HttpContext.Items["CurrentUser"] = user;
            await next();
        }
        catch (Exception ex)
        {
            await signInManager.SignOutAsync();

            logger.LogError(ex, "Authentication middleware failure: {Message}", ex.Message);

            context.Result = new UnauthorizedObjectResult("Invalid user session");
        }
    }
}
