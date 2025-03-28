public static class Utils
{
    public static void Assert<T>(T condition, string? message = null)
    {
        if (condition is null)
        {
            throw new InvalidOperationException(message);
        }
        if (condition is bool cond)
        {
            if (!cond)
            {
                throw new InvalidOperationException(message);
            }
        }
    }

    public static void AssertNull<T>(T condition, string? message = null)
    {
        if (condition is not null)
        {
            throw new InvalidOperationException(message);
        }
    }
}
