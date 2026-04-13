using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ElectronicSystem.Api.Filters;

/// <summary>
/// Action filter que ejecuta FluentValidation antes de entrar al controller.
/// Retorna un 400 con los errores de validación si el modelo no es válido.
/// </summary>
public sealed class ValidationFilter<T>(IValidator<T> validator) : IAsyncActionFilter
    where T : class
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var model = context.ActionArguments.Values
            .OfType<T>()
            .FirstOrDefault();

        if (model is not null)
        {
            var result = await validator.ValidateAsync(model);
            if (!result.IsValid)
            {
                var errors = result.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

                context.Result = new BadRequestObjectResult(new ValidationProblemDetails(errors));
                return;
            }
        }

        await next();
    }
}
