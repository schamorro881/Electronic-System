namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Tabla de referencia para el código de colores de resistencias.
/// </summary>
public class ResistorColorBand
{
    public int Id { get; set; }
    public string ColorName { get; set; } = string.Empty;
    public string HexCode { get; set; } = string.Empty;
    public int? DigitValue { get; set; }
    public double Multiplier { get; set; }
    public double? TolerancePct { get; set; }
    public int? TempCoeffPpm { get; set; }
}
