namespace Bibliotek.Models;

public class PaymentPayPal
{
    public uint Id { get; set; }
    public uint PaymentMethodId { get; set; }
    public required string Email { get; set; }

    public required PaymentMethod PaymentMethod { get; set; }
}
