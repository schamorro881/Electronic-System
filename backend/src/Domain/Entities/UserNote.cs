namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Notas personales del usuario sobre componentes.
/// </summary>
public class UserNote : BaseEntity
{
    public int UserId { get; set; }
    public int ComponentId { get; set; }
    public string Note { get; set; } = string.Empty;

    public Componente? Component { get; set; }
}
