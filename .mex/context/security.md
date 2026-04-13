# Contexto: Seguridad (Identity + JWT)

## Backend
- **Identidad**: `ASP.NET Core Identity` con `ApplicationUser`.
- **Autenticación**: `JWT Bearer`.
- **Authorization**: Basada en Roles (`Admin`, `User`).
- **Endpoints**:
  - `AllowAnonymous`: Login, Register, Health, Listados públicos.
  - `Authorize`: Acciones de escritura, perfiles.
  - `Authorize(Roles = "Admin")`: Gestión de componentes, categorías.

## Frontend
- **AuthService**: Gestiona el estado vía Signals.
- **Interceptors**:
  - `authInterceptor`: Agrega el header `Authorization`.
  - `errorInterceptor`: Captura 401 y redirige a login.
- **Guard**: `authGuard` protege rutas privadas.
