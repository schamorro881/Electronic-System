namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Descripción de los pines de un componente (ej: ICs).
/// </summary>
public class ComponentPinout
{
    public int Id { get; set; }
    public int ComponentId { get; set; }
    public int PinNumber { get; set; }
    public string PinName { get; set; } = string.Empty;
    public string? PinFunction { get; set; }

    // Relación
    public Componente? Component { get; set; }
}
