namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Categorías jerárquicas de componentes.
/// </summary>
public class Categoria : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Icon { get; set; }
    public int? ParentId { get; set; }
    public int DisplayOrder { get; set; } = 0;

    // Relaciones para EF Core migrations
    public Categoria? Parent { get; set; }
    public ICollection<Categoria> Children { get; set; } = new List<Categoria>();
    public ICollection<Componente> Components { get; set; } = new List<Componente>();
}
