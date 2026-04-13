using ElectronicSystem.Application.DTOs.Resistencia;
using ElectronicSystem.Domain.Interfaces;

namespace ElectronicSystem.Application.Services;

/// <summary>
/// Implementación stub de IResistenciaService.
/// </summary>
public sealed class ResistenciaService(IResistenciaRepository repository) : IResistenciaService
{
    public Task<IEnumerable<ResistenciaResponse>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ResistenciaResponse?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<ResistenciaResponse>> SearchByColorAsync(int banda1, int banda2, int multiplicador, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ResistenciaResponse> CreateAsync(CreateResistenciaRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
