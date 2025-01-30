namespace Bibliotek.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/reviews")]
public class ReviewController(BibliotekContext context) : ControllerBase
{
    [HttpGet("{bookId}")]
    public IActionResult ListBookReviews(
        uint bookId,
        [FromQuery(Name = "page")] uint page = 1,
        [FromQuery(Name = "limit")] uint limit = 1
    )
    {
        var book = context.Books.Find(bookId);
        if (book is null)
        {
            return NotFound();
        }

        var skip = (int)((page - 1) * limit);
        var take = (int)limit;

        var reviews = context
            .Reviews.Where(r => r.BookId == bookId)
            .Select(r => new
            {
                r.Id,
                r.Rate,
                r.UserId,
                Username = r.User.Username,
                Comment = ProcessComment(r.Comment),
                r.CreatedAt,
                r.UpdatedAt,
            })
            .OrderByDescending(r => r.CreatedAt)
            .Skip(skip)
            .Take(take)
            .ToList();

        return Ok(reviews);
    }

    [HttpPost]
    public IActionResult LeaveReview([FromHeader] uint userId)
    {
        if (userId is 0)
        {
            return BadRequest();
        }

        return Ok(userId);
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

public record PostReview(uint BookId, float Rate, string Comment);
