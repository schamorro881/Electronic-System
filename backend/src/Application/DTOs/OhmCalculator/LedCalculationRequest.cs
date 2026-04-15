namespace ElectronicSystem.Application.DTOs.OhmCalculator;

public class LedCalculationRequest
{
    public string? SourceVoltage { get; set; }
    public string? LedForwardVoltage { get; set; }
    public string? LedForwardCurrent { get; set; }
}
