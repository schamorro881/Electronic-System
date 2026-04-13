namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Especificaciones técnicas como pares clave-valor (específicas por componente).
/// </summary>
public class ComponentSpec
{
    public int Id { get; set; }
    public int ComponentId { get; set; }
    public string SpecName { get; set; } = string.Empty;
    public string SpecValue { get; set; } = string.Empty;
    public string? SpecUnit { get; set; }
    public int DisplayOrder { get; set; } = 0;

    // Relación
    public Componente? Component { get; set; }
}
