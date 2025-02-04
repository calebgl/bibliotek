using System.ComponentModel.DataAnnotations;
using Bibliotek.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bibliotek.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderController(BibliotekContext context) : ControllerBase
{
    [HttpGet]
    public IActionResult ListOrders([FromHeader()] uint userId)
    {
        var user = context.Users.Find(userId);
        if (user is null)
        {
            return StatusCode(500);
        }

        var ordersFromUser = context
            .Orders.Include(o => o.OrderDetails)
            .Where(o => o.UserId == userId)
            .Select(o => new
            {
                o.Id,
                Status = o.OrderStatus.StatusName,
                Books = o
                    .OrderDetails.Select(od => new
                    {
                        od.BookId,
                        od.Book.Title,
                        od.Price,
                        od.Quantity,
                    })
                    .ToList(),
                Total = o.OrderDetails.Sum(od => od.Quantity * od.Price),
            })
            .ToList();

        return Ok(ordersFromUser);
    }

    [HttpPost]
    public IActionResult Buy([FromHeader] uint userId, CreateOrderDto createOrderDto)
    {
        var user = context.Users.Find(userId);
        if (user is null)
        {
            return StatusCode(500);
        }

        using (var transaction = context.Database.BeginTransaction())
        {
            try
            {
                var orderStatus = context.OrderStatuses.First();
                if (orderStatus is null)
                {
                    return StatusCode(500);
                }

                var orderToCreate = new Order
                {
                    UserId = userId,
                    User = user,
                    OrderStatusId = orderStatus.Id,
                    OrderStatus = orderStatus,
                };
                context.Orders.Add(orderToCreate);
                context.SaveChanges();

                var detailsToCreate = new List<OrderDetail>();
                var booksToUpdate = new List<Book>();
                foreach (var bookRequested in createOrderDto.Books)
                {
                    var bookInDatabase = context.Books.Find(bookRequested.BookId);
                    if (bookInDatabase is null)
                    {
                        return NotFound();
                    }

                    if (bookRequested.Quantity > bookInDatabase.StockQuantity)
                    {
                        return Conflict();
                    }

                    bookInDatabase.StockQuantity -= bookRequested.Quantity;
                    detailsToCreate.Add(
                        new OrderDetail
                        {
                            OrderId = orderToCreate.Id,
                            Order = orderToCreate,
                            BookId = bookInDatabase.Id,
                            Book = bookInDatabase,
                            Quantity = bookRequested.Quantity,
                            Price = bookInDatabase.Price,
                        }
                    );

                    booksToUpdate.Add(bookInDatabase);
                }

                context.Books.UpdateRange(booksToUpdate);
                context.OrderDetails.AddRange(detailsToCreate);

                context.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new ApplicationException("", ex);
            }
        }

        return Ok("created!");
    }
}

public record CreateOrderDto([MinLength(1)] List<BuyBookDto> Books);

public record BuyBookDto(uint BookId, [Range(1, uint.MaxValue)] uint Quantity);
