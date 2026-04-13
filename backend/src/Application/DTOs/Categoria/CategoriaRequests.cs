namespace ElectronicSystem.Application.DTOs.Categoria;

public record CreateCategoriaRequest(
    string Name,
    string Slug,
    string? Description,
    string? Icon,
    int? ParentId,
    int DisplayOrder
);

public record UpdateCategoriaRequest(
    string Name,
    string Slug,
    string? Description,
    string? Icon,
    int? ParentId,
    int DisplayOrder
);
