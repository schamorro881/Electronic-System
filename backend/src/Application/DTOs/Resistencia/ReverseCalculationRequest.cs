namespace ElectronicSystem.Application.DTOs.Resistencia;

public sealed record ReverseCalculationRequest
{
    public string InputValue { get; init; } = string.Empty;
    public int BandCount { get; init; } = 4;
}
