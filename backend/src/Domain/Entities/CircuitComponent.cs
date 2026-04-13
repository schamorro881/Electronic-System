namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Componentes individuales dentro de un circuito guardado.
/// </summary>
public class CircuitComponent
{
    public int Id { get; set; }
    public int CircuitId { get; set; }
    public int ComponentId { get; set; }
    public string? PositionJson { get; set; }
    public string? ConfigJson { get; set; }

    // Relaciones
    public SavedCircuit? Circuit { get; set; }
    public Componente? Component { get; set; }
}
