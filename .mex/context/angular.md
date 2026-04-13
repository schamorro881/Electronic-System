# Contexto: Angular (v19 Standalone)

## Estándares de Código
- **Standalone**: Prohibido usar `NgModules`. Todo es `standalone: true`.
- **State Management**: Preferir `Signals` para estado local y global simple. `RxJS` para flujos asíncronos (HTTP).
- **Template**: Nueva sintaxis de control de flujo (`@if`, `@for`, `@switch`).

## Estructura de Feature
`src/app/features/[feature]/`
- `components/`: Componentes locales de la feature.
- `services/`: Servicios específicos.
- `models/`: Interfaces TypeScript locales (DTOs).
- `[feature].routes.ts`: Archivo de rutas con carga perezosa (lazy).

## Inyección de Dependencias
- Usar `inject()` en lugar de inyección por constructor para consistencia en componentes funcionales/standalone.

## Estilo
- SCSS global en `src/styles.scss`.
- Estilos locales en cada componente.
