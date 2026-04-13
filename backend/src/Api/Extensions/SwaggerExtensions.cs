using Microsoft.OpenApi.Models;

namespace ElectronicSystem.Api.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerWithAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Electronic System API",
                Version = "v1",
                Description = "API para gestión de componentes electrónicos"
            });

            // JWT Bearer en Swagger UI
            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Ingrese el token JWT. Ejemplo: Bearer {token}",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            };

            options.AddSecurityDefinition("Bearer", securityScheme);

            var securityRequirement = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            };

            options.AddSecurityRequirement(securityRequirement);
        });

        return services;
    }
}
