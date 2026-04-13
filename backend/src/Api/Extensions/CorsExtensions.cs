namespace ElectronicSystem.Api.Extensions;

public static class CorsExtensions
{
    public const string PolicyName = "AngularPolicy";

    public static IServiceCollection AddCorsPolicy(
        this IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(PolicyName, policy =>
            {
                if (environment.IsDevelopment())
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                }
                else
                {
                    var allowedOrigins = configuration["AllowedOrigins"]
                        ?? throw new InvalidOperationException("AllowedOrigins not configured.");

                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                }
            });
        });

        return services;
    }
}
