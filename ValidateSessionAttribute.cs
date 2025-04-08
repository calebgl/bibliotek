using Microsoft.AspNetCore.Mvc;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ValidateSessionAttribute : TypeFilterAttribute
{
    public ValidateSessionAttribute(bool throwOnValidationFailure = true)
        : base(typeof(ValidateSession))
    {
        Arguments = new object[] { throwOnValidationFailure };
    }
}
