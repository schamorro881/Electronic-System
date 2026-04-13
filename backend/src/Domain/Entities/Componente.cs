namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Tabla central del catálogo de componentes electrónicos.
/// </summary>
public class Componente : BaseEntity
{
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? PackageType { get; set; }
    public string? DatasheetUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string? Symbol { get; set; }
    public int IsActive { get; set; } = 1;

    // Relaciones para EF Core migrations
    public Categoria? Category { get; set; }
    public ICollection<ComponentSpec> Specs { get; set; } = new List<ComponentSpec>();
    public ICollection<ComponentTag> Tags { get; set; } = new List<ComponentTag>();
    public ICollection<ComponentPinout> Pinouts { get; set; } = new List<ComponentPinout>();
}
