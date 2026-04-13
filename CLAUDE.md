# Proyecto: Electronic System (Clean Architecture + Dapper + Angular)

## Stack Tecnológico
- **Backend**: .NET 10 API, Clean Architecture, Dapper, ASP.NET Core Identity + JWT, Mapperly, FluentValidation.
- **Frontend**: Angular 19+ (Standalone, No NgModules), SCSS, RxJS, Signals.
- **Database**: SQL Server (Acceso vía Dapper y EF Core para Identity).

## Guías de Desarrollo
- Identificar si la tarea es BACKEND, FRONTEND o FULL-STACK.
- Backend: Siempre retornar DTOs (Response), nunca entidades directamente.
- Frontend: Standalone components siempre. Lógica de negocio en services.
- Contrato: Sincronizar DTOs backend con interfaces TypeScript frontend.

## Comandos de utilidad
- Backend: `dotnet build`, `dotnet watch run --project backend/src/Api`
- Frontend: `npm install`, `ng serve` (desde carpeta frontend)

## Protocolo
1. Leer `.mex/ROUTER.md` antes de cualquier tarea.
2. Actualizar `.mex/context/project-state.md` al finalizar.
