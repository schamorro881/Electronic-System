namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Etiquetas flexibles para búsqueda.
/// </summary>
public class ComponentTag
{
    public int Id { get; set; }
    public int ComponentId { get; set; }
    public string Tag { get; set; } = string.Empty;

    // Relación
    public Componente? Component { get; set; }
}
