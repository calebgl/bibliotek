namespace Bibliotek.Models;

public class BookStats
{
    public BookStats()
    {
        OneStarReviewCount = 0;
        TwoStarReviewCount = 0;
        ThreeStarReviewCount = 0;
        FourStarReviewCount = 0;
        FiveStarReviewCount = 0;
        TotalReviewCount = 0;
        AverageRating = 0;
    }

    public uint Id { get; set; }
    public uint BookId { get; set; }
    public uint OneStarReviewCount { get; set; }
    public uint TwoStarReviewCount { get; set; }
    public uint ThreeStarReviewCount { get; set; }
    public uint FourStarReviewCount { get; set; }
    public uint FiveStarReviewCount { get; set; }
    public uint TotalReviewCount { get; set; }
    public decimal AverageRating { get; set; }

    public required Book Book { get; set; }
}
