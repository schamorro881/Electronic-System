namespace ElectronicSystem.Application.DTOs.OhmCalculator;

public class OhmCalculationResponse
{
    public double Voltage { get; set; }
    public double Current { get; set; }
    public double Resistance { get; set; }
    public double Power { get; set; }
    public string FormulaApplied { get; set; } = string.Empty;
    public string SafetyAdvice { get; set; } = string.Empty;
    public string ComponentRecommendation { get; set; } = string.Empty;
}
