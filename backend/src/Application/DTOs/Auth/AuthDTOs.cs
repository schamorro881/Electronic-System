namespace ElectronicSystem.Application.DTOs.Auth;

public record LoginRequest(string Email, string Password);

public record RegisterRequest(
    string Email,
    string Password,
    string UserName,
    string FirstName,
    string LastName
);

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    int ExpiresIn,
    UserInfo User
);

public record UserInfo(
    string Id,
    string Email,
    string UserName,
    IEnumerable<string> Roles
);

public record RefreshTokenRequest(string RefreshToken);
