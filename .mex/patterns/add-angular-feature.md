# Patrón: Agregar Feature Angular (Standalone)

## Pasos
1. **Modelos**: Crear interfaces TS en `models/[feature].model.ts` (espejo de los DTOs de C#).
2. **Servicio**: Crear `services/[feature].service.ts` inyectando `HttpClient`.
   - Usar `environment.apiUrl`.
   - Retornar `Observable`.
3. **Componentes**: 
   - Crear componentes standalone (`ng g c ...` o manual).
   - Inyectar servicios mediante `inject(FeatureService)`.
   - Preferir Signals para el estado.
4. **Rutas**: Definir `[feature].routes.ts` exportando una constante `Routes`.
5. **Registro**: Agregar la ruta al `app.routes.ts` principal mediante `loadChildren`.

## Guía de Estilo
- Usar CamelCase para variables y PascalCase para clases.
- Nombres de archivos en kebab-case.
