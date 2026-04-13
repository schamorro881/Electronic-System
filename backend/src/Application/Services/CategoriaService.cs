using ElectronicSystem.Application.DTOs.Categoria;
using ElectronicSystem.Domain.Interfaces;

namespace ElectronicSystem.Application.Services;

/// <summary>
/// Implementación stub de ICategoriaService.
/// </summary>
public sealed class CategoriaService(ICategoriaRepository repository) : ICategoriaService
{
    public Task<IEnumerable<CategoriaResponse>> GetAllAsync(CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<CategoriaResponse?> GetByIdAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<CategoriaResponse> CreateAsync(CreateCategoriaRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<CategoriaResponse> UpdateAsync(int id, UpdateCategoriaRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task DeleteAsync(int id, CancellationToken ct = default)
        => throw new NotImplementedException();
}
