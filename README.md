# Electronic System ⚡

Bienvenido al repositorio de **Electronic System**, una aplicación integral diseñada para entusiastas de la electrónica, estudiantes y profesionales. El sistema ofrece un entorno visualmente impactante y un conjunto de herramientas esenciales para el trabajo de laboratorio y diseño de circuitos, incluyendo cálculo de resistencias, bibliotecas de componentes y herramientas basadas en leyes físicas como la Ley de Ohm.

El diseño de la interfaz destaca por su estilo **"Deep Midnight"** e implementación de _Glassmorphism_, que proporciona una experiencia premium, oscura, elegante y moderna.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Framework:** Angular 
- **Librería UI:** Taiga UI 5
- **Estilos:** CSS puro / utilidades personalizadas (Estética Glassmorphism "Deep Midnight")

### Backend (En Desarrollo 🚧)
- **Framework:** .NET (ASP.NET Core Web API)
- **Arquitectura:** Clean Architecture (Domain, Application, Infrastructure, Api)
- **Propósito Futuro:** El backend estará encargado de manejar la autenticación real, almacenamiento de componentes y persistencia de catálogos o históricos de los usuarios. Actualmente se encuentra _iniciado_ pero sin completa integración de funcionalidades (mockeado en el frontend).

---

## 💻 Secciones y Módulos del Sistema

A continuación se detalla cómo funciona cada sección de la aplicación, su rol dentro del ecosistema y sus características principales.

### 1. Autenticación (`/auth`)
**Estado Backend:** Interfaz terminada, lógica de backend no integrada.
- **Login:** Permite a los usuarios ingresar al sistema mediante correo y contraseña.
- **Registro:** Permite crear una nueva cuenta.
- **Aspecto Visual:** Destaca con tarjetas glassmorphism sobre un fondo de malla dinámica en tonos morados nocturnos.

### 2. Panel Principal (`/home`)
**Estado:** Funcional (Informativo y de Navegación).
- El núcleo donde el usuario aterriza al iniciar la app.
- Exhibe una arquitectura de tarjetas de vidrio (glassmorphism) donde se puede acceder rápidamente a las demás herramientas: "Catálogo", "Resistencias" y "Calculadora Ohm".
- Tiene llamadas a la acción (CTAs) directas que mejoran el flujo del experiencia de usuario (UX).

### 3. Buscador de Resistencias (`/resistencias`)
**Estado:** Lógica en Frontend Funcional.
- **¿Cómo funciona?** Esta herramienta permite al usuario determinar el valor óhmico de una resistencia simplemente seleccionando los colores de sus bandas (4, 5 o 6 bandas).
- **Proceso:** El usuario, a través de botones selectores de color (badges), arma el código de colores igual al que ve en en el elemento físico real. La interfaz le calcula inmediatamente la resistencia equivalente (ej. 47kΩ) con su debida tolerancia.
- **Propósito Backend:** A futuro, esta sección podrá permitir "guardar" valores usados frecuentemente en un inventario personal del usuario.

### 4. Calculadora de Ley de Ohm (`/ohm-calculator`)
**Estado:** Lógica en Frontend Funcional.
- **¿Cómo funciona?** Basado en el triángulo mágico de la Ley de Ohm ($V = I \times R$), permite al usuario calcular uno de los tres parámetros eléctricos principales (Voltaje, Corriente o Resistencia) ingresando los otros dos.
- **Proceso:** Seleccionas qué deseas calcular mediante tabs o selectores, completas los datos (ej. Resistencia e Intensidad) y la herramienta te arroja automáticamente el resultado del Voltaje.
- **Propósito Backend:** Esta herramienta funcionará íntegramente en el cliente, pero en futuras iteraciones el backend procesará registros de estos cálculos si el usuario desea guardarlos en un archivo de laboratorio virtual.

### 5. Catálogo de Componentes (`/componentes`)
**Estado:** Interfaz diseñada, datos mockeados (Esperando Backend).
- **¿Cómo funciona?** Un explorador para buscar y visualizar hojas de especificaciones de componentes electrónicos (datasheets), como capacitores, diodos, circuitos integrados, etc.
- **Proceso:** Muestra una lista filtrable. El usuario puede ver imagen, tipo y valores comunes de los componentes.
- **Propósito Backend:** Esta sección dependerá fuertemente del backend. La API en `.NET` deberá proveer la base de datos de estos componentes a través del dominio `Application / Infrastructure`, respondiendo a búsquedas enviadas por el frontend.

---

## 🚀 Cómo ejecutar el proyecto en modo Desarrollo

Para correr la aplicación se necesitan tener en ejecución ambos entornos de manera coordinada.

### 1. Iniciar Frontend (Angular)
Actualmente en ejecución.
```bash
cd frontend
npm install   # Instala dependencias (si es primera vez)
npm start     # (o ng serve) Levanta la web en http://localhost:4200
```

### 2. Iniciar Backend (.NET Core)
Actualmente el backend expone su estructura Clean Architecture. Ya se encuentra iniciado y corriendo en paralelo.
```bash
cd backend
dotnet restore   # (si es primera vez) Restaurar paquetes
dotnet run --project src/Api   # Inicializa el servidor API (usualmente http://localhost:5000 o puerto random)
```

## 📐 Diseño Base y Estructura
El proyecto ha sido estructurado meticulosamente manteniendo un grado muy alto de desacoplamiento:
- **Angular:** Usa *Feature Modules/Standalone Components*, servicios (servicios inyectables para abstraer lógica) e interfaces estrictas de TypeScript.
- **Estética y UI/UX:** Se eliminaron las interfaces crudas estándar en favor de Taiga UI y CSS puro enfocado en fondos vibrantes difusos, superposiciones oscuras tipo cristal con bordes semi transparentes y gradientes sutiles. Se implementaron interacciones de alta gama como *3D-tilt hover effects*, vistas rápidas (drawers) e ilustraciones con física visual.
- **Responsividad Total (Mobile-Ready):** La aplicación ha sido adaptada integralmente para dispositivos móviles. En pantallas pequeñas, el _Sidebar_ se convierte inteligentemente en un **menú retráctil estilo hamburguesa (off-canvas)**, las grillas de contenido fluyen con Flexbox/Grid apilándose perfectamente, e incluso implementaciones complejas como la simulación virtual interactiva de las bandas de resistencias y los SVG calculados en tiempo real se auto-escalan utilizando transformaciones matemáticas precisas para evitar bordes cortados o desbordes en celulares estrechos (resoluciones de 320px).
- **Clean Architecture:** El backend ha sido instanciado con `Api`, `Application`, `Domain`, e `Infrastructure` preparando el sistema para poder soportar inyección de dependencias (CQRS) en el futuro sólido y a prueba de escalamiento.

---
_Hecho con ♥ y alta tecnología_
