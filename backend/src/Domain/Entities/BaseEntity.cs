namespace ElectronicSystem.Domain.Entities;

/// <summary>
/// Entidad base con IDs enteros y timestamps Unix (long).
/// Coincide con el esquema SQLite solicitado.
/// </summary>
public abstract class BaseEntity
{
    public int Id { get; set; }
    
    /// <summary>Unix timestamp (segundos)</summary>
    public long CreatedAt { get; set; }
    
    /// <summary>Unix timestamp (segundos)</summary>
    public long UpdatedAt { get; set; }
}
