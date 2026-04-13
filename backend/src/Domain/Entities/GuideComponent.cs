namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Relación de componentes necesarios para una guía (BOM).
/// </summary>
public class GuideComponent
{
    public int Id { get; set; }
    public int GuideId { get; set; }
    public int ComponentId { get; set; }
    public int Quantity { get; set; } = 1;
    public string? Notes { get; set; }

    // Relaciones
    public ImplementationGuide? Guide { get; set; }
    public Componente? Component { get; set; }
}
