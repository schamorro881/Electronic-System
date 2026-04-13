# Estructura de Proyecto: Clean Architecture — MVC (API Backend) + Angular
### Claude Code + C# .NET10 + Angular 18+ | Arquitectura Full-Stack

---

## Concepto de arquitectura

En esta variante, **MVC no renderiza HTML**. El backend es un proyecto ASP.NET Core
que expone una API REST con Controllers tipados. Angular consume esa API y maneja
toda la presentación. Son dos proyectos independientes que se desarrollan y despliegan
por separado.

```
Backend (.NET10 API)  ←→  HTTP/JSON  ←→  Frontend (Angular 18+)
       ↓                                         ↓
   SQL Server                              Browser / CDN
```

---

## Vista general del repositorio

```
mi-proyecto/
├── CLAUDE.md                                  ← Ancla principal (~120 tokens)
├── .mex/
│   ├── ROUTER.md
│   ├── AGENTS.md
│   ├── SYNC.md
│   ├── context/
│   │   ├── architecture.md
│   │   ├── database.md
│   │   ├── security.md                        ← JWT + CORS para Angular
│   │   ├── angular.md                         ← Frontend: estructura, servicios, routing
│   │   ├── api-contracts.md                   ← DTOs compartidos backend/frontend
│   │   ├── testing.md
│   │   ├── conventions.md
│   │   ├── stack.md
│   │   └── project-state.md
│   └── patterns/
│       ├── INDEX.md
│       ├── add-api-controller.md              ← Backend: nuevo controller REST
│       ├── add-angular-feature.md             ← Frontend: módulo completo
│       ├── add-angular-service.md             ← Frontend: service + model
│       ├── add-angular-component.md           ← Frontend: componente standalone
│       ├── db-change.md
│       ├── debug-dotnet.md
│       ├── debug-angular.md
│       ├── auth-flow.md                       ← JWT end-to-end
│       └── write-tests.md
│
├── backend/                                   ← Proyecto .NET10
│   ├── src/
│   │   ├── Api/
│   │   │   ├── Controllers/
│   │   │   │   └── [Entidad]Controller.cs
│   │   │   ├── Extensions/
│   │   │   │   ├── ServiceExtensions.cs
│   │   │   │   ├── CorsExtensions.cs          ← CORS para Angular
│   │   │   │   └── SwaggerExtensions.cs
│   │   │   ├── Middleware/
│   │   │   │   └── ErrorHandlingMiddleware.cs
│   │   │   ├── Filters/
│   │   │   │   └── ValidationFilter.cs
│   │   │   ├── CLAUDE.md
│   │   │   └── Program.cs
│   │   ├── Application/
│   │   │   ├── Services/
│   │   │   │   ├── I[Entidad]Service.cs
│   │   │   │   └── [Entidad]Service.cs
│   │   │   ├── DTOs/
│   │   │   │   └── [Entidad]/
│   │   │   │       ├── [Entidad]Response.cs
│   │   │   │       ├── Create[Entidad]Request.cs
│   │   │   │       └── Update[Entidad]Request.cs
│   │   │   ├── Validators/
│   │   │   │   └── Create[Entidad]Validator.cs
│   │   │   └── CLAUDE.md
│   │   ├── Domain/
│   │   │   ├── Entities/
│   │   │   │   ├── BaseEntity.cs
│   │   │   │   └── [Entidad].cs
│   │   │   ├── Interfaces/
│   │   │   │   └── I[Entidad]Repository.cs
│   │   │   ├── Enums/
│   │   │   └── CLAUDE.md
│   │   └── Infrastructure/
│   │       ├── Data/
│   │       │   └── AppDbContext.cs
│   │       ├── Repositories/
│   │       │   └── [Entidad]Repository.cs
│   │       ├── Migrations/
│   │       └── CLAUDE.md
│   └── tests/
│       ├── UnitTests/
│       ├── IntegrationTests/
│       └── CLAUDE.md
│
└── frontend/                                  ← Proyecto Angular 18+
    ├── CLAUDE.md                              ← Contexto local Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/                          ← Singleton services, guards, interceptors
    │   │   │   ├── interceptors/
    │   │   │   │   ├── auth.interceptor.ts    ← Inyecta JWT en requests
    │   │   │   │   └── error.interceptor.ts
    │   │   │   ├── guards/
    │   │   │   │   └── auth.guard.ts
    │   │   │   ├── services/
    │   │   │   │   └── auth.service.ts
    │   │   │   └── core.providers.ts
    │   │   ├── shared/                        ← Componentes, pipes, directivas reutilizables
    │   │   │   ├── components/
    │   │   │   │   ├── button/
    │   │   │   │   ├── modal/
    │   │   │   │   └── loading-spinner/
    │   │   │   ├── pipes/
    │   │   │   └── directives/
    │   │   ├── features/                      ← Un directorio por feature
    │   │   │   └── [feature]/
    │   │   │       ├── components/
    │   │   │       │   ├── [feature]-list/
    │   │   │       │   │   ├── [feature]-list.component.ts
    │   │   │       │   │   ├── [feature]-list.component.html
    │   │   │       │   │   └── [feature]-list.component.scss
    │   │   │       │   ├── [feature]-form/
    │   │   │       │   └── [feature]-detail/
    │   │   │       ├── models/
    │   │   │       │   └── [feature].model.ts ← Interfaces TypeScript
    │   │   │       ├── services/
    │   │   │       │   └── [feature].service.ts
    │   │   │       └── [feature].routes.ts
    │   │   ├── layout/                        ← Shell de la aplicación
    │   │   │   ├── navbar/
    │   │   │   ├── sidebar/
    │   │   │   └── footer/
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts                  ← Configuración standalone (sin NgModule)
    │   │   └── app.routes.ts                  ← Routing raíz con lazy loading
    │   ├── environments/
    │   │   ├── environment.ts                 ← apiUrl dev: http://localhost:5001
    │   │   └── environment.prod.ts
    │   └── styles.scss
    ├── angular.json
    ├── tsconfig.json
    └── package.json
```

---

## Archivos raíz del sistema de agente

---

### `/CLAUDE.md`

```markdown
# Proyecto full-stack: C# .NET10 API + Angular 18+
# Backend: ASP.NET Core MVC Controllers · EF Core · SQL Server · JWT
# Frontend: Angular 18 standalone components · RxJS · No NgModules
# Auth: JWT Bearer (backend) · localStorage con interceptor (frontend)
# CORS: habilitado para http://localhost:4200 en desarrollo

## Instrucción de sesión
Read .mex/ROUTER.md before any task. Always.
Identificar si la tarea es de BACKEND, FRONTEND o ambos antes de cargar contexto.

## Stop conditions globales
### Backend
- Nunca tocar appsettings.Production.json
- Nunca modificar migrations existentes
- Preguntar antes de instalar paquetes NuGet
- Nunca retornar Entity directamente — siempre Response DTO

### Frontend
- Nunca usar NgModules — solo standalone components
- Nunca lógica de negocio en componentes — va en services
- Nunca llamadas HTTP fuera de los services
- Nunca hardcodear URLs — usar environment.apiUrl

## Post-tarea obligatorio
After every task: update .mex/context/project-state.md
```

---

### `/.mex/ROUTER.md`

```markdown
# Task Router — MVC API + Angular

## Identificar primero: ¿backend, frontend o ambos?

### BACKEND tasks
| Tarea                              | Cargar                      | Pattern                    |
|------------------------------------|-----------------------------|----------------------------|
| Nuevo controller / endpoint        | context/architecture.md     | patterns/add-api-controller.md |
| Cambio EF / migración              | context/database.md         | patterns/db-change.md      |
| Bug fix backend                    | context/stack.md            | patterns/debug-dotnet.md   |
| Auth JWT backend                   | context/security.md         | patterns/auth-flow.md      |
| Nuevo DTO / contrato API           | context/api-contracts.md    | —                          |

### FRONTEND tasks
| Tarea                              | Cargar                      | Pattern                         |
|------------------------------------|-----------------------------|---------------------------------|
| Nueva feature completa             | context/angular.md          | patterns/add-angular-feature.md |
| Nuevo service Angular              | context/angular.md          | patterns/add-angular-service.md |
| Nuevo componente standalone        | context/angular.md          | patterns/add-angular-component.md |
| Bug fix Angular                    | context/angular.md          | patterns/debug-angular.md       |

### FULL-STACK tasks
| Tarea                              | Cargar                                    | Pattern            |
|------------------------------------|-------------------------------------------|--------------------|
| Nueva entidad end-to-end           | context/architecture.md + context/angular.md | ambos patterns  |
| Auth JWT completo                  | context/security.md + context/angular.md  | patterns/auth-flow.md |
| Nuevo contrato API                 | context/api-contracts.md                  | —                  |
| Tests                              | context/testing.md                        | patterns/write-tests.md |

## Protocolo de sesión
1. Leer AGENTS.md siempre
2. Identificar: backend / frontend / full-stack
3. Cargar context files correspondientes (máximo 2)
4. Ejecutar con el pattern
5. Actualizar project-state.md al terminar
```

---

### `/.mex/AGENTS.md`

```markdown
# Agent Rules

## Identidad
Senior full-stack developer: C# .NET10 en backend, Angular 18 en frontend.
Conocés los contratos API, CORS, JWT end-to-end y el patrón Observable/RxJS.
No mezclas responsabilidades: backend produce JSON, Angular lo consume.

## Comportamiento
- Identificar primero si la tarea es backend, frontend o full-stack.
- En tareas full-stack: empezar siempre por el backend (definir contrato) antes del frontend.
- Stop y mostrar el contrato API (DTO) antes de implementar el service Angular.
- Si algo es ambiguo: preguntar si es cambio en backend, frontend o ambos.
- Una tarea a la vez. No anticipar pasos no pedidos.

## Regla de contrato primero
En cualquier tarea full-stack:
1. Definir/confirmar el DTO de response del backend
2. Crear la interface TypeScript equivalente en Angular
3. Solo entonces implementar service y componentes

## Output format
- Indicar siempre: archivo + layer (backend/frontend).
- En tareas full-stack: listar cambios de backend y frontend por separado.
- Después de cada tarea: ✅ con lista de archivos tocados por layer.

## Herramientas
Read, Write, Edit por defecto.
Bash: dotnet build, dotnet test, ng build --dry-run, git diff.
```

---

## Context files

---

### `/.mex/context/architecture.md`

```markdown
# Arquitectura full-stack

## Backend — Clean Architecture
- Api: Controllers, Extensions, Middleware, Filters
- Application: Services, DTOs, Validators (FluentValidation)
- Domain: Entities (heredan BaseEntity), Interfaces de repositorio
- Infrastructure: DbContext, Repositories, Migrations

## Flujo de request backend
HTTP Request (desde Angular)
→ Controller (valida ModelState, llama Service)
→ Service (lógica de negocio, usa Repository)
→ Repository (EF Core, SQL Server)
← Service (devuelve DTO)
← Controller (retorna ActionResult<ResponseDto>)
← JSON response (consumido por Angular service)

## Frontend — Angular 18 Standalone
- core/: singleton services, interceptors, guards (providedIn: 'root')
- shared/: componentes, pipes y directivas reutilizables entre features
- features/: un directorio por dominio, lazy loaded
- layout/: shell de la app (navbar, sidebar)

## Flujo de datos en Angular
Componente → llama método del Feature Service
Feature Service → llama HttpClient con URL de environment
HttpClient → Auth Interceptor inyecta JWT → request al backend
Response JSON → Feature Service mapea a interface TypeScript
Feature Service → Observable<T> → Componente → Template

## Regla de separación
El backend NO sabe nada de Angular.
Angular NO accede a la DB ni contiene lógica de negocio.
El contrato entre ambos son los DTOs/interfaces.
```

---

### `/.mex/context/angular.md`

**Propósito:** Todo lo que el agente necesita saber para trabajar en el frontend Angular sin leer el codebase entero.

```markdown
# Frontend Angular 18

## Versión y paradigma
- Angular 18 — standalone components (sin NgModules)
- TypeScript strict mode
- RxJS 7+ — Observables para HTTP, signals para estado local simple
- No usar NgModules, no usar decorador @NgModule en ningún archivo nuevo

## Estructura de una feature
features/[nombre]/
├── components/
│   ├── [nombre]-list/        ← componente de listado
│   ├── [nombre]-form/        ← formulario create/edit
│   └── [nombre]-detail/      ← detalle/vista
├── models/
│   └── [nombre].model.ts     ← interfaces TypeScript (espejo de DTOs backend)
├── services/
│   └── [nombre].service.ts   ← llamadas HTTP, lógica de la feature
└── [nombre].routes.ts        ← rutas lazy de la feature

## Estructura de un componente standalone
@Component({
  selector: 'app-[nombre]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ...],
  templateUrl: './[nombre].component.html',
  styleUrl: './[nombre].component.scss'
})
export class [Nombre]Component {
  // Signals para estado local
  // Observables para datos del service
  // Sin lógica de negocio aquí
}

## Services
- HTTP calls SOLO en services, nunca en componentes
- Usar inject() en lugar de constructor injection
- Retornar Observable<T> — nunca subscribir dentro del service
- URL: environment.apiUrl + '/api/[recurso]'

## Routing
- Lazy loading obligatorio para features
- Rutas en app.routes.ts: loadChildren(() => import('./features/[f]/[f].routes'))
- Guards en core/guards/

## Formularios
- ReactiveFormsModule — no Template-driven forms
- FormBuilder + FormGroup + Validators
- Manejo de errores inline en el template

## HTTP y errores
- HttpClient con interceptor que inyecta JWT
- Error interceptor centralizado para 401 (redirect a login) y 500 (toast)
- Nunca .catch() manual en componentes — el interceptor lo maneja

## Variables de entorno
- Dev: environment.apiUrl = 'http://localhost:5001'
- Prod: environment.apiUrl = '[url de producción]'
- Nunca hardcodear URLs

## Convenciones de naming
- Archivos: kebab-case (user-list.component.ts)
- Clases: PascalCase (UserListComponent)
- Interfaces: PascalCase sin prefijo I (User, CreateUserRequest)
- Services: camelCase en inject(), PascalCase en clase
```

---

### `/.mex/context/api-contracts.md`

**Propósito:** El contrato entre backend y frontend. Cualquier cambio aquí impacta ambos lados. Se carga cuando se define o modifica una API.

```markdown
# Contratos API — DTOs y modelos TypeScript

## Principio
Cada DTO del backend tiene una interface TypeScript equivalente en Angular.
Cuando cambia un DTO del backend, SIEMPRE actualizar la interface en Angular.

## Formato de respuesta estándar (backend)
Todas las responses siguen este envelope:
{
  "data": T,           // el payload
  "message": "string", // mensaje legible
  "success": true
}

Para listas:
{
  "data": T[],
  "total": number,
  "page": number,
  "pageSize": number,
  "success": true
}

## Convención de naming
Backend DTO: CreateOrderRequest.cs → OrderResponse.cs
Angular interface: CreateOrderRequest (en order.model.ts) → OrderResponse

## Entidades y sus contratos actuales
[Completar y mantener actualizado]

### Users
Backend: CreateUserRequest, UpdateUserRequest, UserResponse
Angular: CreateUserRequest, UpdateUserRequest, UserResponse (en user.model.ts)
Endpoint base: /api/users

### Auth
Backend: LoginRequest, RegisterRequest, AuthResponse (accessToken, refreshToken, expiresIn)
Angular: LoginRequest, RegisterRequest, AuthResponse (en auth.model.ts)
Endpoint: /api/auth/login, /api/auth/register, /api/auth/refresh

## Paginación
Backend acepta: ?page=1&pageSize=10&search=texto&orderBy=campo&desc=true
Angular envía: HttpParams con esos valores

## Manejo de errores del backend
400 → ValidationProblem (errors: { campo: ['mensaje'] })
401 → Redirect a login (manejado por error interceptor)
404 → Mostrar mensaje "no encontrado"
500 → Toast de error genérico
```

---

### `/.mex/context/security.md`

```markdown
# Seguridad JWT — full-stack

## Backend
- JWT Bearer en Authorization header
- Access token: 15 minutos
- Refresh token: 7 días, guardado en DB (tabla RefreshTokens)
- CORS configurado en CorsExtensions.cs
  - Dev: AllowAnyOrigin en localhost:4200
  - Prod: WithOrigins([dominio Angular]) solamente
- [Authorize] en todos los controllers salvo AuthController
- [AllowAnonymous] en login, register, health

## Frontend Angular
- JWT guardado en localStorage (key: 'access_token')
- Refresh token en localStorage (key: 'refresh_token')
- Auth interceptor: lee token de localStorage, agrega header Bearer
- Si response es 401: intentar refresh, si falla → logout y redirect /login
- AuthService: login(), logout(), register(), refreshToken(), isLoggedIn()
- AuthGuard: protege rutas que requieren auth

## Flujo de login Angular
1. Usuario submite formulario → AuthService.login()
2. POST /api/auth/login → AuthResponse
3. Guardar tokens en localStorage
4. Redirect a dashboard
5. Auth interceptor inyecta token en cada request siguiente

## Flujo de refresh
1. Error interceptor recibe 401
2. Llama AuthService.refreshToken()
3. POST /api/auth/refresh con refresh token
4. Si OK: guardar nuevo access token, reintentar request original
5. Si falla: AuthService.logout() → redirect /login

## Archivos clave Angular
- core/interceptors/auth.interceptor.ts
- core/interceptors/error.interceptor.ts
- core/guards/auth.guard.ts
- core/services/auth.service.ts
```

---

### `/.mex/context/database.md`

```markdown
# Base de datos — Backend

## Stack
- EF Core — SQL Server
- DbContext: AppDbContext.cs en /backend/src/Infrastructure/Data/
- Connection string: appsettings.json → ConnectionStrings:DefaultConnection

## BaseEntity
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
    public DateTime? DeletedAt { get; set; }
}

## Migrations
Comando desde raíz del repo:
dotnet ef migrations add [Nombre] \
  --project backend/src/Infrastructure \
  --startup-project backend/src/Api

## Reglas
- Soft delete — nunca DELETE físico
- Nunca editar migrations aplicadas
- Nunca database update sin confirmación
- Naming: [Accion][Entidad] → AddOrdersTable

## Migrations aplicadas
[lista — mantener actualizada]
```

---

## Pattern files

---

### `/.mex/patterns/add-api-controller.md`

```markdown
# Pattern: Agregar Controller REST para Angular

## Consideración previa
Este controller es consumido por Angular — los responses deben ser JSON limpio,
tipado y consistente. Definir el contrato antes de implementar.

## Pasos
1. Definir Request y Response DTOs en /Application/DTOs/[Entidad]/
   - Response DTO: solo campos que Angular necesita (nunca datos internos)
   - Usar GUIDs en lugar de IDs numéricos en responses
2. ✅ STOP — mostrar DTOs y confirmar el contrato con el desarrollador
3. Actualizar context/api-contracts.md con el nuevo contrato
4. Crear o actualizar el Controller en /Api/Controllers/[Entidad]Controller.cs
   - Heredar de ControllerBase (NO Controller — no hay Views)
   - [ApiController] + [Route("api/[controller]")]
   - Retornar ActionResult<ResponseDto>
   - Verb correcto: [HttpGet], [HttpPost], [HttpPut], [HttpDelete]
5. Crear el Validator en /Application/Validators/
6. ✅ STOP — mostrar el controller completo antes de continuar
7. Implementar o actualizar el Service

## Verify
- dotnet build sin warnings
- Swagger muestra el endpoint con schema correcto
- Response incluye status codes correctos: 200/201/204/400/404
- CORS permite requests desde localhost:4200

## Scope
- NO retornar Entity directamente — siempre DTO
- NO incluir datos sensibles en response (passwords, tokens internos)
- NO modificar otros controllers
```

---

### `/.mex/patterns/add-angular-feature.md`

```markdown
# Pattern: Agregar feature completa en Angular

## Prerequisito
El backend ya expone el endpoint y el contrato está definido en context/api-contracts.md.

## Pasos
1. Crear directorio /frontend/src/app/features/[feature]/
2. Crear la interface TypeScript en models/[feature].model.ts
   - Espejo exacto del Response DTO del backend
   - Interfaces separadas: [Feature], Create[Feature]Request, Update[Feature]Request
3. ✅ STOP — mostrar las interfaces antes de continuar
4. Crear el service en services/[feature].service.ts
   - inject(HttpClient) y inject(environment — via injection token)
   - Métodos: getAll(), getById(id), create(dto), update(id, dto), delete(id)
   - Retornar Observable<T> sin subscribe
5. ✅ STOP — mostrar el service antes de crear componentes
6. Crear componentes standalone en components/
   - [feature]-list: tabla/listado con paginación
   - [feature]-form: formulario ReactiveForm para create y edit
   - [feature]-detail: vista de detalle (si aplica)
7. Crear las rutas en [feature].routes.ts con lazy loading
8. Registrar en app.routes.ts:
   {
     path: '[feature]',
     canActivate: [authGuard],
     loadChildren: () => import('./features/[feature]/[feature].routes')
   }

## Verify
- ng build --dry-run sin errores TypeScript
- Las rutas están protegidas con authGuard
- El service usa environment.apiUrl (nunca URL hardcodeada)
- Los componentes no tienen lógica de negocio ni HTTP calls directas

## Scope
- No modificar core/ ni shared/ salvo que sea necesario
- No modificar otras features
```

---

### `/.mex/patterns/add-angular-service.md`

```markdown
# Pattern: Agregar o actualizar Angular Service

## Cuándo usar este pattern
- Agregar un método nuevo a un service existente
- Crear un service para una feature que ya existe parcialmente

## Pasos
1. Verificar el contrato en context/api-contracts.md
2. Si la interface TypeScript no existe: crearla en models/[feature].model.ts
3. ✅ STOP — mostrar la interface antes de continuar
4. Agregar el método en el service
   - Usar inject(HttpClient) si no está
   - Construir HttpParams para queries con paginación/filtros
   - Retornar Observable<T> tipado
   - Mapear errores si hay lógica específica de esta feature

## Template de método
getAll(params?: { page?: number; search?: string }): Observable<PaginatedResponse<[Feature]>> {
  let httpParams = new HttpParams();
  if (params?.page) httpParams = httpParams.set('page', params.page);
  if (params?.search) httpParams = httpParams.set('search', params.search);
  return this.http.get<PaginatedResponse<[Feature]>>(
    `${this.apiUrl}/api/[feature]`,
    { params: httpParams }
  );
}

## Verify
- TypeScript strict sin errores
- El método retorna Observable (nunca void ni Promise directamente)
- URL usa environment.apiUrl
```

---

### `/.mex/patterns/add-angular-component.md`

```markdown
# Pattern: Agregar componente standalone Angular

## Pasos
1. Identificar a qué feature pertenece
2. Crear la carpeta /features/[feature]/components/[nombre]/
3. Crear los 3 archivos: .ts, .html, .scss
4. Configurar el componente:
   - standalone: true siempre
   - Imports: solo lo que el template necesita
   - Usar inject() para dependencias
5. ✅ STOP — mostrar el .ts antes de continuar con el template
6. Crear el template HTML
   - Sin lógica de negocio (@if y @for para presentación)
   - Binding a signals o Observables del service via async pipe
7. Si tiene formulario: ReactiveFormsModule + FormBuilder

## Reglas
- NO subscribir en el componente si se puede usar async pipe en template
- NO llamar HttpClient directamente — usar el feature service
- NO lógica de negocio en el componente

## Verify
- ng build --dry-run sin errores
- Todos los imports declarados en el array imports del componente
- El componente es exportable (export class ...)
```

---

### `/.mex/patterns/auth-flow.md`

```markdown
# Pattern: Auth JWT end-to-end

## BACKEND (completar primero)
Ver context/security.md para configuración JWT.

### Endpoints requeridos
POST /api/auth/login    → LoginRequest → AuthResponse
POST /api/auth/register → RegisterRequest → AuthResponse
POST /api/auth/refresh  → { refreshToken } → AuthResponse
POST /api/auth/logout   → invalida refresh token en DB

### AuthResponse DTO
{
  accessToken: string,
  refreshToken: string,
  expiresIn: number,    // segundos
  user: { id, email, role }
}

## FRONTEND (después del backend)
1. Crear auth.model.ts con interfaces LoginRequest, RegisterRequest, AuthResponse
2. ✅ STOP — confirmar interfaces espejo del backend
3. Implementar AuthService en core/services/auth.service.ts
4. Implementar auth.interceptor.ts — agrega Bearer token a cada request
5. Implementar error.interceptor.ts — maneja 401 con refresh
6. Implementar authGuard en core/guards/auth.guard.ts
7. Crear componentes login y register en features/auth/

## Orden obligatorio
1. Backend endpoints y DTOs
2. Interfaces TypeScript (espejo de DTOs)
3. AuthService Angular
4. Interceptors
5. Guard
6. Componentes de login/register
7. Proteger rutas en app.routes.ts

## Verify
- Login guarda tokens en localStorage
- Requests autenticados llevan header Bearer
- 401 dispara refresh automático
- Rutas protegidas redirigen a /login sin token
```

---

## CLAUDE.md anidados

### `/backend/src/Api/CLAUDE.md`
```markdown
# Backend: Capa Api
Controllers heredan ControllerBase (no Controller — sin Views).
[ApiController] + [Route("api/[controller]")] en cada controller.
Retornar siempre ActionResult<ResponseDto> — nunca Entity directamente.
CORS configurado en CorsExtensions.cs — no modificar sin confirmar.
Program.cs: máximo 20 líneas — todo en Extensions/.
```

### `/backend/src/Application/CLAUDE.md`
```markdown
# Backend: Capa Application
Services devuelven DTOs — nunca Entities ni tipos de EF.
Validators con FluentValidation en /Validators/.
DTOs en /DTOs/[Entidad]/ — separar Request de Response.
Cuando cambia un DTO: avisar que hay que actualizar la interface Angular.
```

### `/backend/src/Domain/CLAUDE.md`
```markdown
# Backend: Capa Domain
Entities puras. Sin EF attributes. Sin referencias externas.
BaseEntity: Id (Guid), CreatedAt, UpdatedAt, IsDeleted, DeletedAt.
Interfaces de repositorio aquí — implementación en Infrastructure.
```

### `/backend/src/Infrastructure/CLAUDE.md`
```markdown
# Backend: Capa Infrastructure
DbContext en /Data/AppDbContext.cs.
Repositories implementan interfaces de Domain.
Migrations en /Migrations/ — NUNCA editar manualmente.
Para nueva migration: ver .mex/patterns/db-change.md
```

### `/frontend/CLAUDE.md`
```markdown
# Frontend: Angular 18 standalone
Sin NgModules. Solo standalone components con imports explícitos.
Toda llamada HTTP va en services — nunca en componentes.
URLs siempre via environment.apiUrl — nunca hardcodeadas.
Subscribir en templates con async pipe — evitar subscribe() en .ts.
ReactiveFormsModule para formularios — no template-driven.
Nuevas features: ver .mex/patterns/add-angular-feature.md
Ver contexto completo: .mex/context/angular.md
```

---

## Archivos de configuración clave — contenido

### `/frontend/src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001'
};
```

### `/frontend/src/app/core/interceptors/auth.interceptor.ts`
```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

### `/frontend/src/app/app.config.ts`
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
};
```

### `/backend/src/Api/Extensions/CorsExtensions.cs`
```csharp
public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(
        this IServiceCollection services,
        IConfiguration config,
        IWebHostEnvironment env)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AngularPolicy", policy =>
            {
                if (env.IsDevelopment())
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                else
                    policy.WithOrigins(config["AllowedOrigins"]!)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
            });
        });
        return services;
    }
}
```

---

## Setup inicial completo

### 1. Backend .NET10

```bash
mkdir mi-proyecto && cd mi-proyecto

# Backend
mkdir backend && cd backend
dotnet new sln -n MiProyecto
dotnet new webapi -n MiProyecto.Api -o src/Api
dotnet new classlib -n MiProyecto.Application -o src/Application
dotnet new classlib -n MiProyecto.Domain -o src/Domain
dotnet new classlib -n MiProyecto.Infrastructure -o src/Infrastructure
dotnet new xunit -n MiProyecto.UnitTests -o tests/UnitTests
dotnet new xunit -n MiProyecto.IntegrationTests -o tests/IntegrationTests

dotnet sln add src/Api src/Application src/Domain src/Infrastructure
dotnet sln add tests/UnitTests tests/IntegrationTests

# Referencias entre proyectos
dotnet add src/Api reference src/Application
dotnet add src/Application reference src/Domain
dotnet add src/Infrastructure reference src/Domain
dotnet add src/Api reference src/Infrastructure
dotnet add tests/UnitTests reference src/Application
dotnet add tests/IntegrationTests reference src/Api

# NuGet
dotnet add src/Infrastructure package Microsoft.EntityFrameworkCore.SqlServer
dotnet add src/Infrastructure package Microsoft.EntityFrameworkCore.Tools
dotnet add src/Api package Microsoft.EntityFrameworkCore.Design
dotnet add src/Api package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add src/Application package FluentValidation
dotnet add src/Application package FluentValidation.DependencyInjectionExtensions
dotnet add src/Api package BCrypt.Net-Next
dotnet add src/Api package Serilog.AspNetCore

# Carpetas
mkdir -p src/Api/Extensions
mkdir -p src/Api/Middleware
mkdir -p src/Api/Filters
mkdir -p src/Application/Validators

cd ..
```

### 2. Frontend Angular

```bash
# Requiere Node 20+ y Angular CLI 18+
npm install -g @angular/cli

cd mi-proyecto
ng new frontend --standalone --routing --style=scss --skip-git
cd frontend

# Paquetes adicionales
npm install

cd ..
```

### 3. Sistema de agente (desde raíz del repo)

```bash
# mex
git clone https://github.com/theDakshJaitly/mex.git .mex
bash .mex/setup.sh   # Elegir: Claude Code

# prompt-master
mkdir -p ~/.claude/skills
git clone https://github.com/nidhinjs/prompt-master.git ~/.claude/skills/prompt-master

# Crear estructura de context y patterns
mkdir -p .mex/context .mex/patterns
touch .mex/context/{architecture,database,security,angular,api-contracts,testing,conventions,stack,project-state}.md
touch .mex/patterns/{INDEX,add-api-controller,add-angular-feature,add-angular-service,add-angular-component,db-change,debug-dotnet,debug-angular,auth-flow,write-tests}.md

# CLAUDE.md anidados
touch backend/src/Api/CLAUDE.md
touch backend/src/Application/CLAUDE.md
touch backend/src/Domain/CLAUDE.md
touch backend/src/Infrastructure/CLAUDE.md
touch backend/tests/CLAUDE.md
touch frontend/CLAUDE.md
```

### 4. Verificar

```bash
# Backend
cd backend && dotnet build && cd ..

# Frontend
cd frontend && ng build --dry-run && cd ..

# mex
node .mex/dist/cli.js check
```

---

## Diferencias clave vs las otras dos versiones

| Aspecto | MVC + Razor | Minimal API | MVC + Angular |
|---|---|---|---|
| Rendering HTML | Servidor (Razor) | No aplica | Cliente (Angular) |
| Controller base | `Controller` | No controllers | `ControllerBase` |
| Auth | Cookie | JWT en header | JWT + interceptor Angular |
| ViewModels | Sí (capa Web) | No | Interface TypeScript |
| CORS | No necesario | Opcional | **Obligatorio** |
| Context files extra | `views-razor.md` | `endpoints.md` | `angular.md` + `api-contracts.md` |
| Pattern principal nuevo | `add-controller-action` | `add-endpoint-group` | `add-angular-feature` |
| Tarea full-stack | No aplica | No aplica | Sí — backend primero siempre |
| Contrato API explícito | No (mismo proyecto) | Opcional | **Crítico — sincronizar DTOs** |

---

## Checklist proyecto MVC + Angular listo

```
## Backend
✅ Solución con 4 capas + 2 proyectos de test
✅ Controllers heredan ControllerBase (no Controller)
✅ CORS configurado en CorsExtensions.cs para localhost:4200
✅ JWT configurado en ServiceExtensions.cs
✅ FluentValidation con AddValidatorsFromAssembly
✅ dotnet build → sin errores

## Frontend
✅ Angular 18 standalone (sin NgModules)
✅ Estructura core/ shared/ features/ layout/ creada
✅ environment.ts con apiUrl apuntando a localhost:5001
✅ auth.interceptor.ts configurado
✅ error.interceptor.ts con manejo de 401
✅ provideHttpClient(withInterceptors([...])) en app.config.ts
✅ ng build --dry-run → sin errores TypeScript

## Sistema de agente
✅ CLAUDE.md raíz < 100 líneas, identifica backend/frontend/full-stack
✅ .mex/ROUTER.md con tabla de ruteo para las 3 categorías de tareas
✅ context/angular.md creado con estructura Angular documentada
✅ context/api-contracts.md creado con formato de response estándar
✅ patterns/add-angular-feature.md con flujo contrato-primero
✅ patterns/auth-flow.md con orden obligatorio backend → frontend
✅ CLAUDE.md anidado en backend (por capa) y frontend/
✅ mex check → score > 90
```
