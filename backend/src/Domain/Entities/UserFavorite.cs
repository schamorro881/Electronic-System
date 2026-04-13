namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Componentes favoritos del usuario.
/// </summary>
public class UserFavorite
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ComponentId { get; set; }
    public long CreatedAt { get; set; }

    public Componente? Component { get; set; }
}
