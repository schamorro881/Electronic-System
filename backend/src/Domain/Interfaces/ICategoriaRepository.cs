using ElectronicSystem.Domain.Entities;

namespace ElectronicSystem.Domain.Interfaces;

public interface ICategoriaRepository : IRepository<Categoria>
{
    Task<Categoria?> GetByNombreAsync(string nombre, CancellationToken ct = default);
}
