namespace ElectronicSystem.Application.DTOs.Componente;

public record CreateComponenteRequest(
    int CategoryId,
    string Name,
    string Slug,
    string? Description,
    string? PackageType,
    string? DatasheetUrl,
    string? ImageUrl,
    string? Symbol
);
