namespace ElectronicSystem.Application.DTOs.Resistencia;

public sealed record ReverseCalculationResponse
{
    public string Band1Hex { get; init; } = string.Empty;
    public string Band2Hex { get; init; } = string.Empty;
    public string Band3Hex { get; init; } = string.Empty; // for 5/6 bands
    public string MultiplierHex { get; init; } = string.Empty;
    public string ToleranceHex { get; init; } = string.Empty;
    public string PpmHex { get; init; } = string.Empty; // for 6 bands
}
