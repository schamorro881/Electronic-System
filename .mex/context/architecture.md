# Contexto: Arquitectura (Clean Architecture)

## Capas del Backend
1. **Domain**: Entidades puras, Enums, Interfaces de Repositorio. Sin dependencias externas.
2. **Application**: Lógica de negocio, Casos de uso, interfaces de Servicios, DTOs, Mapeos, Validaciones.
3. **Infrastructure**: Implementación de interfaces (Dapper Repos, DbContext), Acceso a DB, Identidad, Providers externos.
4. **Api**: Controllers, Middleware, Configuraciones, Inyección de Dependencias.

## Flujo de Datos
`Web Browser (Angular) -> API Controller -> Application Service -> Domain Model -> Dapper Repo -> SQL Server`

## Mapperly
Se usa para el mapeo de entidades a DTOs en la capa de Aplicación. Las clases deben ser `partial`.

## FluentValidation
Se ejecutan automáticamente mediante un Action Filter antes de llegar al Controller.
