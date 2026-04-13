using ElectronicSystem.Application.DTOs.Componente;

namespace ElectronicSystem.Application.Services;

public interface IComponenteService
{
    Task<ComponenteResponse?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IEnumerable<ComponenteResponse>> GetAllAsync(CancellationToken ct = default);
    Task<IEnumerable<ComponenteResponse>> SearchAsync(string term, int? categoriaId = null, CancellationToken ct = default);
    Task<ComponenteResponse> CreateAsync(CreateComponenteRequest request, CancellationToken ct = default);
    Task<ComponenteResponse> UpdateAsync(int id, UpdateComponenteRequest request, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
}
