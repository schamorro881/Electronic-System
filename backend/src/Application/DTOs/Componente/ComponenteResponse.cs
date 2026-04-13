namespace ElectronicSystem.Application.DTOs.Componente;

public record ComponenteResponse
{
    public int Id { get; init; }
    public int CategoryId { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string? Description { get; init; }
    public string? PackageType { get; init; }
    public string? DatasheetUrl { get; init; }
    public string? ImageUrl { get; init; }
    public string? Symbol { get; init; }
    public int IsActive { get; init; }
}
