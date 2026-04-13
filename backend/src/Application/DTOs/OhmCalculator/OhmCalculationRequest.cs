namespace ElectronicSystem.Application.DTOs.OhmCalculator;

public class OhmCalculationRequest
{
    public double? Voltage { get; set; }
    public double? Current { get; set; }
    public double? Resistance { get; set; }
}
