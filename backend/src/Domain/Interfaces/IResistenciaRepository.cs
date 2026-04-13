using ElectronicSystem.Domain.Entities;

namespace ElectronicSystem.Domain.Interfaces;

public interface IResistenciaRepository : IRepository<Resistencia>
{
    Task<IEnumerable<Resistencia>> SearchByColorAsync(int banda1, int banda2, int multiplicador, CancellationToken ct = default);
}
