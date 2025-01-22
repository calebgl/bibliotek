// using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("books")]
public class BookController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            context
                .Books.Include(b => b.Reviews)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    Reviews = b
                        .Reviews.OrderByDescending(r => r.CreatedAt)
                        .Take(5)
                        .Select(r => new
                        {
                            r.Id,
                            r.Rate,
                            r.UserId,
                            Username = r.User.Username,
                            Comment = ProcessComment(r.Comment),
                            r.CreatedAt,
                            r.UpdatedAt,
                        }),
                })
                .ToList()
        );
    }

    private string? ProcessComment(string? comment)
    {
        if (string.IsNullOrWhiteSpace(comment))
        {
            return null;
        }

        if (comment.Length < 20)
        {
            return comment;
        }

        return comment.Substring(0, 20).TrimEnd() + "...";
    }
}
