using ElectronicSystem.Application.DTOs.Componente;
using ElectronicSystem.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace ElectronicSystem.Application.Mappers;

[Mapper]
public partial class ComponenteMapper
{
    public partial ComponenteResponse EntityToResponse(Componente entity);
    
    [MapperIgnoreTarget(nameof(Componente.Id))]
    [MapperIgnoreTarget(nameof(Componente.CreatedAt))]
    [MapperIgnoreTarget(nameof(Componente.UpdatedAt))]
    [MapperIgnoreTarget(nameof(Componente.Category))]
    [MapperIgnoreTarget(nameof(Componente.Specs))]
    [MapperIgnoreTarget(nameof(Componente.Tags))]
    [MapperIgnoreTarget(nameof(Componente.Pinouts))]
    public partial Componente CreateToEntity(CreateComponenteRequest request);

    public partial void UpdateEntity(UpdateComponenteRequest request, Componente entity);
}
