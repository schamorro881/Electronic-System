namespace ElectronicSystem.Application.DTOs.Resistencia;

public sealed record ColorCodeCalculationRequest
{
    public int BandCount { get; init; } = 4;
    public string Band1Hex { get; init; } = string.Empty;
    public string Band2Hex { get; init; } = string.Empty;
    public string Band3Hex { get; init; } = string.Empty;
    public string MultiplierHex { get; init; } = string.Empty;
    public string ToleranceHex { get; init; } = string.Empty;
    public string PpmHex { get; init; } = string.Empty;
}
