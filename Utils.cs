using System.Diagnostics;
using System.Security.Claims;
using Bibliotek.Models;

public static class Utils
{
    public static User ValidateCurrentUser(
        ClaimsPrincipal claimsPrincipal,
        BibliotekContext context
    )
    {
        var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        Debug.Assert(!string.IsNullOrWhiteSpace(userId));

        var user = context.Users.Where(u => u.Id == uint.Parse(userId!)).FirstOrDefault();
        Debug.Assert(user is not null);
        Debug.Assert(!string.IsNullOrWhiteSpace(user.Email));
        Debug.Assert(!string.IsNullOrWhiteSpace(user.UserName));

        return user;
    }
}
