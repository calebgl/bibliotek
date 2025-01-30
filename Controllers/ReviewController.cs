namespace Bibliotek.Controllers;

using System.ComponentModel.DataAnnotations;
using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public IActionResult PostReview([FromHeader] uint userId, CreateReviewDto createReviewDto)
    {
        if (userId is 0)
        {
            return BadRequest();
        }

        var user = context.Users.Find(userId);
        if (user is null)
        {
            return StatusCode(500);
        }

        var book = context
            .Books.Include(b => b.BookStats)
            .Where(b => b.Id == createReviewDto.BookId)
            .Single();

        var newReview = new Review
        {
            Comment = createReviewDto.Comment,
            Rate = createReviewDto.Rate,
            UserId = userId,
            BookId = createReviewDto.BookId,
            User = user,
            Book = book,
        };

        var bookStats = book.BookStats;
        bookStats.AverageRating =
            ((bookStats.AverageRating * bookStats.TotalReviewCount) + newReview.Rate)
            / (bookStats.TotalReviewCount + 1);
        bookStats.TotalReviewCount += 1;

        uint _ = newReview.Rate switch
        {
            0f => bookStats.OneStarReviewCount++,
            (>= 1f) and (< 2f) => bookStats.OneStarReviewCount++,
            (>= 2f) and (< 3f) => bookStats.TwoStarReviewCount++,
            (>= 3f) and (< 4f) => bookStats.ThreeStarReviewCount++,
            (>= 4f) and (< 5f) => bookStats.FourStarReviewCount++,
            5f => bookStats.FiveStarReviewCount++,
            _ => 0,
        };

        context.Reviews.Add(newReview);
        context.BookStats.Update(bookStats);
        context.SaveChanges();

        return Ok(
            new
            {
                newReview.Id,
                newReview.Comment,
                newReview.Rate,
                newReview.UserId,
                newReview.BookId,
            }
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

public record CreateReviewDto(uint BookId, [Range(1, 5)] float Rate, string? Comment);
