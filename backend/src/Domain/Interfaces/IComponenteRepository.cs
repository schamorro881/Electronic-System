using ElectronicSystem.Domain.Entities;

namespace ElectronicSystem.Domain.Interfaces;

public interface IComponenteRepository : IRepository<Componente>
{
    Task<IEnumerable<Componente>> SearchAsync(string term, int? categoriaId = null, CancellationToken ct = default);
    Task<IEnumerable<Componente>> GetByCategoriaAsync(int categoriaId, CancellationToken ct = default);
}
