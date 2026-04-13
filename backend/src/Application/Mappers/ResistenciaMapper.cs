using ElectronicSystem.Application.DTOs.Resistencia;
using ElectronicSystem.Domain.Entities;
using Riok.Mapperly.Abstractions;

namespace ElectronicSystem.Application.Mappers;

[Mapper]
public partial class ResistenciaMapper
{
    public partial ResistenciaResponse EntityToResponse(Resistencia entity);

    [MapperIgnoreTarget(nameof(Resistencia.Id))]
    [MapperIgnoreTarget(nameof(Resistencia.CreatedAt))]
    [MapperIgnoreTarget(nameof(Resistencia.UpdatedAt))]
    public partial Resistencia CreateToEntity(CreateResistenciaRequest request);
}
