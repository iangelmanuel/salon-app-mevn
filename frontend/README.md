# Frontend - Salon MEVN

Aplicacion SPA construida con Vue 3 y Vite para gestionar citas, autenticar usuarios y administrar servicios del salon.

## Stack destacado

- Vue 3 con Composition API.
- Pinia para manejo de estado y Vue Router para rutas dinamicas.
- Axios con interceptores para llamadas autenticadas.
- Tailwind CSS y FormKit para UI y formularios.

## Requisitos previos

- Node.js 20 o superior.
- pnpm 10 o superior.

## Instalacion

```powershell
cd frontend
pnpm install
```

## Variables de entorno (`frontend/.env`)

| Variable       | Descripcion                                                     |
| -------------- | --------------------------------------------------------------- |
| `VITE_API_URL` | URL base del backend (por ejemplo `http://localhost:4000/api`). |

## Scripts disponibles

| Comando        | Descripcion                                    |
| -------------- | ---------------------------------------------- |
| `pnpm dev`     | Inicia Vite con hot reload en desarrollo.      |
| `pnpm build`   | Genera la version optimizada para produccion.  |
| `pnpm preview` | Sirve la carpeta `dist` para validar el build. |

## Estructura principal

```text
src/
  api/
  components/
  helpers/
  lib/
  router/
  stores/
  views/
```

- `api/` agrupa clientes de Axios para servicios, citas y autenticacion.
- `stores/` define los modulos de Pinia que sincronizan datos con la API.
- `views/` contiene las pantallas para usuarios finales y administradores.
- `components/` reune piezas reutilizables como tarjetas de servicio y formularios.

## Flujos basicos

1. Configura `VITE_API_URL` apuntando al backend (por ejemplo `http://localhost:4000/api`).
2. Ejecuta `pnpm dev` y accede a la URL que imprime Vite.
3. Usa las vistas de autenticacion para registrar o iniciar sesion y probar la gestion de citas.
