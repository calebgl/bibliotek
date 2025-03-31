using Microsoft.AspNetCore.Mvc;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ValidateSessionAttribute : TypeFilterAttribute
{
    public ValidateSessionAttribute()
        : base(typeof(ValidateSession)) { }
}
