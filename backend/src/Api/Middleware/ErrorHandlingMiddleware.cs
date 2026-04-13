using System.Net;
using System.Text.Json;

namespace ElectronicSystem.Api.Middleware;

/// <summary>
/// Middleware centralizado de manejo de errores no controlados.
/// Convierte excepciones en respuestas JSON consistentes.
/// </summary>
public sealed class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (NotImplementedException ex)
        {
            logger.LogWarning(ex, "Endpoint not yet implemented");
            await WriteErrorResponse(context, HttpStatusCode.NotImplemented,
                "Este endpoint aún no ha sido implementado.");
        }
        catch (ArgumentException ex)
        {
            logger.LogWarning(ex, "Invalid argument: {Message}", ex.Message);
            await WriteErrorResponse(context, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            logger.LogWarning(ex, "Resource not found: {Message}", ex.Message);
            await WriteErrorResponse(context, HttpStatusCode.NotFound, ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            logger.LogWarning(ex, "Unauthorized: {Message}", ex.Message);
            await WriteErrorResponse(context, HttpStatusCode.Unauthorized, ex.Message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception");
            await WriteErrorResponse(context, HttpStatusCode.InternalServerError,
                "Ha ocurrido un error interno en el servidor.");
        }
    }

    private static async Task WriteErrorResponse(HttpContext context, HttpStatusCode statusCode, string message)
    {
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var body = JsonSerializer.Serialize(new
        {
            success = false,
            message,
            data = (object?)null
        });

        await context.Response.WriteAsync(body);
    }
}
