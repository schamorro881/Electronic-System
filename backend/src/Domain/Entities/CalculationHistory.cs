namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Historial de cálculos (Ohm, Color Code, etc.) guardado por el usuario.
/// </summary>
public class CalculationHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string CalcType { get; set; } = string.Empty; // "ohm_law", "color_code", etc.
    public string InputJson { get; set; } = "{}";
    public string ResultJson { get; set; } = "{}";
    public long CreatedAt { get; set; }

}
