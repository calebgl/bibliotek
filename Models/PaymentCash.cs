namespace Bibliotek.Models;

public class PaymentCash
{
    public uint Id { get; set; }
    public uint PaymentMethodId { get; set; }

    public required PaymentMethod PaymentMethod { get; set; }
}
