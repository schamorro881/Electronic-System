using ElectronicSystem.Application.DTOs.Categoria;
using ElectronicSystem.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace ElectronicSystem.Application.Mappers;

[Mapper]
public partial class CategoriaMapper
{
    public partial CategoriaResponse EntityToResponse(Categoria entity);

    [MapperIgnoreTarget(nameof(Categoria.Id))]
    [MapperIgnoreTarget(nameof(Categoria.CreatedAt))]
    [MapperIgnoreTarget(nameof(Categoria.UpdatedAt))]
    [MapperIgnoreTarget(nameof(Categoria.Parent))]
    [MapperIgnoreTarget(nameof(Categoria.Children))]
    [MapperIgnoreTarget(nameof(Categoria.Components))]
    public partial Categoria CreateToEntity(CreateCategoriaRequest request);
}
