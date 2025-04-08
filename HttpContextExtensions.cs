using Bibliotek.Models;

public static class HttpContextExtensions
{
    public static User GetCurrentUser(this HttpContext context)
    {
        return context.Items["CurrentUser"] as User
            ?? throw new InvalidOperationException("Current user not found");
    }

    public static User? GetCurrentPosibleUser(this HttpContext context)
    {
        return context.Items["CurrentUser"] as User;
    }
}