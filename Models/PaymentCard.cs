namespace Bibliotek.Models;

public class PaymentCard
{
    public uint Id { get; set; }
    public uint PaymentMethodId { get; set; }
    public required string Name { get; set; }
    public required string Number { get; set; }
    public required string CVV { get; set; }

    public DateOnly ExpiresAt { get; set; }

    public required PaymentMethod PaymentMethod { get; set; }
}
