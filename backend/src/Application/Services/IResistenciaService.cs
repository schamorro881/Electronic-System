using ElectronicSystem.Application.DTOs.Resistencia;

namespace ElectronicSystem.Application.Services;

public interface IResistenciaService
{
    Task<IEnumerable<ResistenciaResponse>> GetAllAsync(CancellationToken ct = default);
    Task<ResistenciaResponse?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IEnumerable<ResistenciaResponse>> SearchByColorAsync(int banda1, int banda2, int multiplicador, CancellationToken ct = default);
    Task<ResistenciaResponse> CreateAsync(CreateResistenciaRequest request, CancellationToken ct = default);
    Task DeleteAsync(int id, CancellationToken ct = default);
    Task<ColorCodeCalculationResponse> CalculateColorCodeAsync(ColorCodeCalculationRequest request, CancellationToken ct = default);
    Task<ReverseCalculationResponse> ReverseCalculateColorCodeAsync(ReverseCalculationRequest request, CancellationToken ct = default);
}
