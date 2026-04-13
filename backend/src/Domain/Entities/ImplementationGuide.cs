namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Guías prácticas de implementación de circuitos.
/// </summary>
public class ImplementationGuide : BaseEntity
{
    public int ComponentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Difficulty { get; set; } = "beginner"; // ('beginner', 'intermediate', 'advanced')
    public string? CircuitDescription { get; set; }
    public string? Tips { get; set; }

    // Relaciones
    public Componente? MainComponent { get; set; }
    public ICollection<GuideComponent> Bom { get; set; } = new List<GuideComponent>();
}
