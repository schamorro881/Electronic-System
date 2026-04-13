# Contexto: Base de Datos (Dapper + Identity)

## Coexistencia Híbrida
- **ASP.NET Core Identity**: Usa `AppDbContext` heredando de `IdentityDbContext`. Gestiona las tablas de sistema (`Users`, `Roles`, etc.). Las migraciones se aplican sobre este contexto.
- **Acceso a Datos de Dominio**: Usa **Dapper**. Los repositorios inyectan `IDbConnectionFactory`. No hay mapeo automático de navegación; las relaciones se resuelven en el repositorio mediante Joins.

## Naming y Convenciones
- Tablas: Plural, PascalCase (ej. `Componentes`, `Categorias`).
- Columnas: PascalCase.
- Soft Delete: Se usa la columna `IsDeleted` (bit) y `DeletedAt` (datetime).

## Ejemplo de Repositorio Dapper
```csharp
public async Task<IEnumerable<Entity>> GetAllAsync() {
    using var db = _factory.CreateConnection();
    return await db.QueryAsync<Entity>("SELECT * FROM Entities WHERE IsDeleted = 0");
}
```

## Migraciones
1. Se usan solo para Identity.
2. Comandos: `dotnet ef migrations add Name --project Infrastructure --startup-project Api`.
3. Para tablas de negocio, de momento se asume creación vía SQL scripts o migración manual (Dapper no gestiona esquema).
