using Dapper;
using ElectronicSystem.Domain.Entities;
using ElectronicSystem.Domain.Interfaces;
using ElectronicSystem.Infrastructure.Data;

namespace ElectronicSystem.Infrastructure.Repositories;

/// <summary>
/// Repositorio Categorías con Dapper. Stub.
/// </summary>
public sealed class CategoriaRepository(IDbConnectionFactory connectionFactory)
    : ICategoriaRepository
{
    public Task<Categoria?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Categoria>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<Categoria?> GetByNombreAsync(string nombre, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<int> AddAsync(Categoria entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task UpdateAsync(Categoria entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
