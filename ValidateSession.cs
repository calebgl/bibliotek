using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class ValidateSession(BibliotekContext dbContext) : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next
    )
    {
        var httpContext = context.HttpContext;
        var contextClaim = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        try
        {
            Debug.Assert(contextClaim is not null);

            var userId = contextClaim.Value;
            Debug.Assert(!string.IsNullOrWhiteSpace(userId));

            var user = dbContext.Users.Where(u => u.Id == uint.Parse(userId)).FirstOrDefault();
            Debug.Assert(user is not null);
            Debug.Assert(!string.IsNullOrWhiteSpace(user.Email));
            Debug.Assert(!string.IsNullOrWhiteSpace(user.UserName));

            httpContext.Items["CurrentUser"] = user;
            await next();
        }
        catch (Exception ex)
        {
            httpContext.Session.Clear();
            Console.WriteLine(ex);

            context.Result = new UnauthorizedObjectResult("Invalid session");
        }
    }
}
