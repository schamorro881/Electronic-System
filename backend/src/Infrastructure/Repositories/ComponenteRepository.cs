using Dapper;
using ElectronicSystem.Domain.Entities;
using ElectronicSystem.Domain.Interfaces;
using ElectronicSystem.Infrastructure.Data;

namespace ElectronicSystem.Infrastructure.Repositories;

/// <summary>
/// Repositorio Componentes con Dapper. Stub.
/// </summary>
public sealed class ComponenteRepository(IDbConnectionFactory connectionFactory)
    : IComponenteRepository
{
    public Task<Componente?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Componente>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Componente>> SearchAsync(string term, int? categoriaId = null, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Componente>> GetByCategoriaAsync(int categoriaId, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<int> AddAsync(Componente entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task UpdateAsync(Componente entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
