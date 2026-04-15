namespace ElectronicSystem.Application.DTOs.OhmCalculator;

public class OhmCalculationRequest
{
    public string? Voltage { get; set; }
    public string? Current { get; set; }
    public string? Resistance { get; set; }
    public string? Power { get; set; }
}
