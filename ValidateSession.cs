using System.Diagnostics;
using System.Security.Claims;
using Bibliotek.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ValidateSession(BibliotekContext dbContext, SignInManager<User> signInManager)
    : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next
    )
    {
        try
        {
            var contextClaim = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            Debug.Assert(contextClaim is not null);

            var userId = contextClaim.Value;
            Debug.Assert(!string.IsNullOrWhiteSpace(userId));

            var user = dbContext.Users.Where(u => u.Id == uint.Parse(userId)).FirstOrDefault();
            if (user is null)
            {
                throw new InvalidOperationException("User not found?");
            }

            Debug.Assert(!string.IsNullOrWhiteSpace(user.Email));
            Debug.Assert(!string.IsNullOrWhiteSpace(user.UserName));

            context.HttpContext.Items["CurrentUser"] = user;
            await next();
        }
        catch (Exception ex)
        {
            await signInManager.SignOutAsync();

            Console.WriteLine(ex);

            context.Result = new UnauthorizedObjectResult("Invalid user session");
        }
    }
}
