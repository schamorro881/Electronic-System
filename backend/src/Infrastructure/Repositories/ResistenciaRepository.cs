using Dapper;
using ElectronicSystem.Domain.Entities;
using ElectronicSystem.Domain.Interfaces;
using ElectronicSystem.Infrastructure.Data;

namespace ElectronicSystem.Infrastructure.Repositories;

/// <summary>
/// Repositorio Resistencias con Dapper. Stub.
/// </summary>
public sealed class ResistenciaRepository(IDbConnectionFactory connectionFactory)
    : IResistenciaRepository
{
    public Task<Resistencia?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Resistencia>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<Resistencia>> SearchByColorAsync(int banda1, int banda2, int multiplicador, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<int> AddAsync(Resistencia entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task UpdateAsync(Resistencia entity, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
