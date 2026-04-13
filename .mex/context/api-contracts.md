# Contexto: Contratos API

## Estándar de Comunicación
- **Formato**: JSON (PascalCase en C#, CamelCase en TS - manejado por serializador).
- **Responses**: Siempre usar DTOs de Respuesta (`Response`).
- **Requests**: Siempre usar DTOs de Solicitud (`Request`).

## Contratos Actuales

### Auth
- `POST /api/auth/login` -> `LoginRequest` -> `AuthResponse`
- `POST /api/auth/register` -> `RegisterRequest` -> `AuthResponse`

### Componentes
- `GET /api/componentes` -> `IEnumerable<ComponenteResponse>`
- `POST /api/componentes` -> `CreateComponenteRequest` -> `ComponenteResponse`

### Resistencias
- `GET /api/resistencias/search` -> QueryParams -> `IEnumerable<ResistenciaResponse>`
