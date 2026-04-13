using ElectronicSystem.Application.DTOs.Componente;
using ElectronicSystem.Domain.Interfaces;

namespace ElectronicSystem.Application.Services;

/// <summary>
/// Implementación stub de IComponenteService.
/// </summary>
public sealed class ComponenteService(IComponenteRepository repository) : IComponenteService
{
    public Task<IEnumerable<ComponenteResponse>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ComponenteResponse?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<IEnumerable<ComponenteResponse>> SearchAsync(string term, int? categoriaId = null, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ComponenteResponse> CreateAsync(CreateComponenteRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<ComponenteResponse> UpdateAsync(int id, UpdateComponenteRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
