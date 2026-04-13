namespace ElectronicSystem.Application.DTOs.Categoria;

public record CategoriaResponse
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string? Description { get; init; }
    public string? Icon { get; init; }
    public int? ParentId { get; init; }
    public int DisplayOrder { get; init; }
}
