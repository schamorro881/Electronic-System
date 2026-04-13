# Patrón: Agregar Controller API (Dapper)

## Pasos
1. **Contrato**: Definir `Request` y `Response` DTOs en `Application/DTOs/[Feature]/`.
2. **Entidad**: Crear/Actualizar entidad en `Domain/Entities/` (si no existe).
3. **Repositorio**: 
   - Agregar interfaz en `Domain/Interfaces/`.
   - Implementar con Dapper en `Infrastructure/Repositories/`.
4. **Mapeo**: Crear/Actualizar Mapper Mapperly en `Application/Mappers/`.
5. **Servicio**: 
   - Agregar interfaz en `Application/Services/`.
   - Implementar en `Application/Services/` inyectando el repositorio.
6. **Controller**: Crear en `Api/Controllers/` heredando de `ControllerBase`.

## Ejemplo de SQL en Repo
```csharp
var sql = "INSERT INTO Componentes (Id, Nombre) VALUES (@Id, @Nombre)";
await db.ExecuteAsync(sql, entity);
```
