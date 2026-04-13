using ElectronicSystem.Application.Services;
using ElectronicSystem.Infrastructure.Data;
using ElectronicSystem.Infrastructure.Repositories;
using ElectronicSystem.Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ElectronicSystem.Api.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Application services (stubs)
        services.AddScoped<IComponenteService, ComponenteService>();
        services.AddScoped<IResistenciaService, ResistenciaService>();
        services.AddScoped<ICategoriaService, CategoriaService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IOhmCalculatorService, OhmCalculatorService>();

        // Dapper repositories
        services.AddScoped<IComponenteRepository, ComponenteRepository>();
        services.AddScoped<IResistenciaRepository, ResistenciaRepository>();
        services.AddScoped<ICategoriaRepository, CategoriaRepository>();

        // Dapper connection factory
        services.AddSingleton<IDbConnectionFactory, SqlConnectionFactory>();

        // FluentValidation — auto-register all validators in Application assembly
        services.AddValidatorsFromAssemblyContaining<ElectronicSystem.Application.Validators.LoginValidator>();

        return services;
    }

    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<ApplicationUser, IdentityRole<int>>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var jwtSection = configuration.GetSection("Jwt");

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSection["Issuer"],
                ValidAudience = jwtSection["Audience"],
                IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(jwtSection["Secret"]!))
            };
        });

        services.AddAuthorization();

        return services;
    }
}
