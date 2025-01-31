namespace Bibliotek.Models;

public class PaymentMethod
{
    public PaymentMethod()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public uint Id { get; set; }
    public uint UserId { get; set; }
    public PaymentType PaymentType { get; set; }
    public bool IsDefault { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public required User User { get; set; }
    public PaymentCash? PaymentCash { get; set; }
    public PaymentCard? PaymentCard { get; set; }
    public PaymentPayPal? PaymentPayPal { get; set; }
}
