using ElectronicSystem.Application.DTOs.Componente;
using FluentValidation;

namespace ElectronicSystem.Application.Validators;

/// <summary>
/// Validador para CreateComponenteRequest.
/// </summary>
public class CreateComponenteValidator : AbstractValidator<CreateComponenteRequest>
{
    public CreateComponenteValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.CategoryId).NotEmpty();
    }
}
