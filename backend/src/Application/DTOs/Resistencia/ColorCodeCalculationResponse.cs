namespace ElectronicSystem.Application.DTOs.Resistencia;

public sealed record ColorCodeCalculationResponse
{
    public double ResistanceValue { get; init; }
    public string FormattedResistance { get; init; } = string.Empty;
    public string FormattedTolerance { get; init; } = string.Empty;
    public string MainValueDisplay { get; init; } = string.Empty;
    public string ExtraValueDisplay { get; init; } = string.Empty;
    public string MinRangeDisplay { get; init; } = string.Empty;
    public string MaxRangeDisplay { get; init; } = string.Empty;
    public List<string> RecommendedUses { get; init; } = new();
}
