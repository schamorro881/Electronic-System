using ElectronicSystem.Application.DTOs.Categoria;

namespace ElectronicSystem.Application.Services;

public interface ICategoriaService
{
    Task<CategoriaResponse?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IEnumerable<CategoriaResponse>> GetAllAsync(CancellationToken ct = default);
    Task<CategoriaResponse> CreateAsync(CreateCategoriaRequest request, CancellationToken ct = default);
    Task<CategoriaResponse> UpdateAsync(int id, UpdateCategoriaRequest request, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
