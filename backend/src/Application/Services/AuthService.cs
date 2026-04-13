using ElectronicSystem.Application.DTOs.Auth;

namespace ElectronicSystem.Application.Services;

/// <summary>
/// Implementación stub de IAuthService (Identity + JWT).
/// </summary>
public sealed class AuthService : IAuthService
{
    public Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task<AuthResponse> RefreshTokenAsync(RefreshTokenRequest request, CancellationToken ct = default)
        => throw new NotImplementedException();

    public Task LogoutAsync(int userId, CancellationToken ct = default)
        => throw new NotImplementedException();
}
