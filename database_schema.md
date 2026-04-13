# Base de Datos — App de Gestión de Componentes Electrónicos

Motor: **SQLite**
Autenticación: **Identity Provider externo** (el campo `identity_id` vincula al usuario)
Datos de catálogo: **Pre-cargados via seed**

---

## Módulo 1: Catálogo de Componentes

### `categories`

Categorías jerárquicas de componentes (ej: Resistencias → Fijas → SMD).

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| name | TEXT | NOT NULL | Nombre de la categoría |
| slug | TEXT | NOT NULL, UNIQUE | Slug URL-friendly |
| description | TEXT | | Descripción opcional |
| icon | TEXT | | Nombre de ícono o emoji |
| parent_id | INTEGER | FK → categories(id), NULLABLE | Categoría padre (NULL = raíz) |
| display_order | INTEGER | NOT NULL, DEFAULT 0 | Orden de visualización |
| created_at | INTEGER | NOT NULL | Unix timestamp |

Índices: `idx_categories_parent_id` sobre `parent_id`, `idx_categories_slug` sobre `slug`.

---

### `components`

Tabla central del catálogo. Cada fila es un componente electrónico (resistencia, capacitor, IC, etc.).

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| category_id | INTEGER | FK → categories(id), NOT NULL | Categoría a la que pertenece |
| name | TEXT | NOT NULL | Nombre del componente (ej: "LM7805") |
| slug | TEXT | NOT NULL, UNIQUE | Slug URL-friendly |
| description | TEXT | | Descripción general y uso |
| package_type | TEXT | | Tipo de encapsulado (DIP, SMD, TO-220, etc.) |
| datasheet_url | TEXT | | Link al datasheet PDF |
| image_url | TEXT | | Imagen del componente |
| symbol | TEXT | | Símbolo esquemático (SVG path o referencia) |
| is_active | INTEGER | NOT NULL, DEFAULT 1 | 1 = visible, 0 = oculto |
| created_at | INTEGER | NOT NULL | Unix timestamp |
| updated_at | INTEGER | NOT NULL | Unix timestamp |

Índices: `idx_components_category_id` sobre `category_id`, `idx_components_slug` sobre `slug`, `idx_components_name` sobre `name`.

---

### `component_specs`

Especificaciones técnicas como pares clave-valor. Permite flexibilidad total: un capacitor tiene "capacitancia" y "voltaje", un transistor tiene "hFE" y "Vce(sat)", sin alterar el schema.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| component_id | INTEGER | FK → components(id), NOT NULL, ON DELETE CASCADE | |
| spec_name | TEXT | NOT NULL | Nombre de la spec (ej: "Voltaje máximo") |
| spec_value | TEXT | NOT NULL | Valor (ej: "5", "100-240") |
| spec_unit | TEXT | | Unidad (ej: "V", "mA", "Ω", "µF") |
| display_order | INTEGER | NOT NULL, DEFAULT 0 | Orden de visualización |

Índice: `idx_component_specs_component_id` sobre `component_id`.

---

### `component_tags`

Etiquetas libres para búsqueda flexible (ej: "regulador", "5V", "lineal", "arduino").

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| component_id | INTEGER | FK → components(id), NOT NULL, ON DELETE CASCADE | |
| tag | TEXT | NOT NULL | Etiqueta en minúsculas |

Índices: `idx_component_tags_component_id` sobre `component_id`, `idx_component_tags_tag` sobre `tag`.
Unique constraint: `(component_id, tag)`.

---

### `component_pinouts`

Descripción pin a pin de cada componente. Útil para ICs, transistores, reguladores, etc.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| component_id | INTEGER | FK → components(id), NOT NULL, ON DELETE CASCADE | |
| pin_number | INTEGER | NOT NULL | Número del pin |
| pin_name | TEXT | NOT NULL | Nombre (ej: "VCC", "GND", "OUT") |
| pin_function | TEXT | | Descripción de la función del pin |

Índice: `idx_component_pinouts_component_id` sobre `component_id`.
Unique constraint: `(component_id, pin_number)`.

---

## Módulo 2: Calculadora de Resistencias (Código de Colores)

### `resistor_color_bands`

Tabla de referencia con los 12 colores estándar. Permite resolver resistencias de 4, 5 y 6 bandas sin lógica hardcodeada.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| color_name | TEXT | NOT NULL, UNIQUE | Nombre del color (ej: "brown", "red") |
| hex_code | TEXT | NOT NULL | Color HEX para renderizar (ej: "#8B4513") |
| digit_value | INTEGER | NULLABLE | Valor como dígito (0-9), NULL para dorado/plateado |
| multiplier | REAL | NOT NULL | Multiplicador (ej: 1, 10, 100, 0.1, 0.01) |
| tolerance_pct | REAL | NULLABLE | Tolerancia en % (ej: 1, 2, 5, 10), NULL si no aplica |
| temp_coeff_ppm | INTEGER | NULLABLE | Coeficiente de temperatura en ppm/°C (banda 6), NULL si no aplica |

Seed data (12 filas): black, brown, red, orange, yellow, green, blue, violet, grey, white, gold, silver.

---

## Módulo 3: Guías de Implementación

### `implementation_guides`

Guías prácticas que explican cómo usar un componente en un proyecto real.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| component_id | INTEGER | FK → components(id), NOT NULL | Componente principal de la guía |
| title | TEXT | NOT NULL | Título (ej: "Fuente regulada 5V con LM7805") |
| description | TEXT | NOT NULL | Explicación del proyecto/circuito |
| difficulty | TEXT | NOT NULL, CHECK IN ('beginner', 'intermediate', 'advanced') | Nivel de dificultad |
| circuit_description | TEXT | | Descripción textual del circuito |
| tips | TEXT | | Consejos y buenas prácticas |
| created_at | INTEGER | NOT NULL | Unix timestamp |

Índice: `idx_guides_component_id` sobre `component_id`.

---

### `guide_components`

BOM (Bill of Materials) de cada guía. Lista los componentes necesarios con cantidades.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| guide_id | INTEGER | FK → implementation_guides(id), NOT NULL, ON DELETE CASCADE | |
| component_id | INTEGER | FK → components(id), NOT NULL | |
| quantity | INTEGER | NOT NULL, DEFAULT 1 | Cantidad necesaria |
| notes | TEXT | | Notas (ej: "puede sustituirse por LM7806") |

Unique constraint: `(guide_id, component_id)`.

---

## Módulo 4: Usuarios y Personalización

### `users`

Usuarios autenticados via Identity Provider externo.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| identity_id | TEXT | NOT NULL, UNIQUE | ID del provider (Firebase UID, Supabase UUID, etc.) |
| name | TEXT | NOT NULL | Nombre para mostrar |
| email | TEXT | NOT NULL, UNIQUE | Email del usuario |
| avatar_url | TEXT | | URL del avatar |
| created_at | INTEGER | NOT NULL | Unix timestamp |
| updated_at | INTEGER | NOT NULL | Unix timestamp |

---

### `user_favorites`

Componentes marcados como favoritos por el usuario.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| user_id | INTEGER | FK → users(id), NOT NULL, ON DELETE CASCADE | |
| component_id | INTEGER | FK → components(id), NOT NULL, ON DELETE CASCADE | |
| created_at | INTEGER | NOT NULL | Unix timestamp |

Unique constraint: `(user_id, component_id)`.

---

### `user_notes`

Notas personales del usuario sobre un componente.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| user_id | INTEGER | FK → users(id), NOT NULL, ON DELETE CASCADE | |
| component_id | INTEGER | FK → components(id), NOT NULL, ON DELETE CASCADE | |
| note | TEXT | NOT NULL | Contenido de la nota |
| created_at | INTEGER | NOT NULL | Unix timestamp |
| updated_at | INTEGER | NOT NULL | Unix timestamp |

---

### `calculation_history`

Historial de cálculos realizados (Ley de Ohm, código de colores, etc.).

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| user_id | INTEGER | FK → users(id), NOT NULL, ON DELETE CASCADE | |
| calc_type | TEXT | NOT NULL | Tipo de cálculo: "ohm_law", "color_code", "series_parallel", etc. |
| input_json | TEXT | NOT NULL | JSON con los parámetros de entrada |
| result_json | TEXT | NOT NULL | JSON con el resultado |
| created_at | INTEGER | NOT NULL | Unix timestamp |

Índice: `idx_calc_history_user_id` sobre `user_id`.

Ejemplo `input_json` para Ley de Ohm:
```json
{ "voltage": 12, "resistance": 470, "solve_for": "current" }
```

Ejemplo `result_json`:
```json
{ "current_amps": 0.02553, "current_ma": 25.53, "power_watts": 0.3064 }
```

---

## Módulo 5: Simulador de Circuitos (Futuro)

### `saved_circuits`

Circuitos creados por el usuario en el simulador virtual.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| user_id | INTEGER | FK → users(id), NOT NULL, ON DELETE CASCADE | |
| name | TEXT | NOT NULL | Nombre del circuito |
| description | TEXT | | Descripción opcional |
| circuit_data_json | TEXT | NOT NULL | JSON completo del estado del circuito (nodos, conexiones, posiciones) |
| thumbnail_url | TEXT | | Captura/miniatura del circuito |
| is_public | INTEGER | NOT NULL, DEFAULT 0 | 1 = compartido públicamente |
| created_at | INTEGER | NOT NULL | Unix timestamp |
| updated_at | INTEGER | NOT NULL | Unix timestamp |

Índice: `idx_saved_circuits_user_id` sobre `user_id`.

---

### `circuit_components`

Componentes individuales colocados dentro de un circuito guardado.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | INTEGER | PK, AUTOINCREMENT | |
| circuit_id | INTEGER | FK → saved_circuits(id), NOT NULL, ON DELETE CASCADE | |
| component_id | INTEGER | FK → components(id), NOT NULL | |
| position_json | TEXT | | JSON con posición en el canvas: `{"x": 120, "y": 80, "rotation": 90}` |
| config_json | TEXT | | JSON con configuración específica: `{"resistance_ohms": 470}` |

---

## Resumen de relaciones

```
categories ──(self)──→ categories          (parent_id, jerarquía)
categories ──(1:N)──→ components
components ──(1:N)──→ component_specs
components ──(1:N)──→ component_tags
components ──(1:N)──→ component_pinouts
components ──(1:N)──→ implementation_guides
implementation_guides ──(1:N)──→ guide_components
components ──(1:N)──→ guide_components
users ──(1:N)──→ user_favorites
components ──(1:N)──→ user_favorites
users ──(1:N)──→ user_notes
components ──(1:N)──→ user_notes
users ──(1:N)──→ calculation_history
users ──(1:N)──→ saved_circuits
saved_circuits ──(1:N)──→ circuit_components
components ──(1:N)──→ circuit_components
```

## Notas para el agente

- **Motor**: SQLite. Usar `INTEGER` para booleanos (0/1) y timestamps (Unix epoch).
- **FKs**: Activar `PRAGMA foreign_keys = ON;` al inicializar la conexión.
- **Soft delete**: No se usa en este schema. Los componentes del catálogo se desactivan con `is_active = 0`.
- **JSON**: Los campos `*_json` almacenan JSON como TEXT. Validar en la capa de aplicación.
- **Seed data**: `categories`, `components`, `component_specs`, `component_pinouts`, `component_tags` y `resistor_color_bands` se pre-cargan con datos reales.
- **Identity**: El campo `users.identity_id` se vincula al UID del provider externo (Firebase, Supabase, Clerk, etc.). No almacenar passwords.
- **Calculadora de Ohm**: No requiere tablas adicionales. La lógica es puramente frontend. Solo se persiste el historial en `calculation_history`.
- **Código de colores**: La lógica de decodificación usa `resistor_color_bands` como lookup table. Soportar 4, 5 y 6 bandas.
