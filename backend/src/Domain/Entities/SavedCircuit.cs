namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Circuitos guardados por el usuario en el simulador.
/// </summary>
public class SavedCircuit : BaseEntity
{
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string CircuitDataJson { get; set; } = "{}";
    public string? ThumbnailUrl { get; set; }
    public int IsPublic { get; set; } = 0;

    public ICollection<CircuitComponent> Components { get; set; } = new List<CircuitComponent>();
}
