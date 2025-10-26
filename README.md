# Salon MEVN

Proyecto fullstack basado en el curso de Juan Pablo De La Torre para gestionar citas de un salon de belleza utilizando MongoDB, Express, Vue y Node.js.

## Estructura del repositorio

- `backend/`: API REST en Express con MongoDB, autenticacion JWT y servicios de correo.
- `frontend/`: SPA en Vue 3 con Pinia, Vue Router, Tailwind CSS y consumo de la API.

## Requisitos previos

- Node.js 20 o superior.
- pnpm (se instala con `npm install -g pnpm`).
- Cuenta y URI de MongoDB para la API.

## Puesta en marcha rapida

1. Duplicar `.env.example` en cada carpeta (o crear `.env`) y completar los valores descritos mas abajo.
2. Instalar dependencias en cada paquete:
   - `cd backend` y `pnpm install`
   - `cd frontend` y `pnpm install`
3. Inicializar servicios de desarrollo en terminales separadas:
   - Backend: `pnpm dev`
   - Frontend: `pnpm dev`
4. Abrir el navegador en la URL que entrega Vite (por defecto `http://localhost:5173`).

## Variables de entorno

### Backend (`backend/.env`)

| Variable       | Descripcion                                               |
| -------------- | --------------------------------------------------------- |
| `PORT`         | Puerto del servidor Express (opcional, 4000 por defecto). |
| `MONGODB_URI`  | Cadena de conexion a MongoDB.                             |
| `JWT_SECRET`   | Clave privada para firmar tokens JWT.                     |
| `FRONTEND_URL` | URL permitida para CORS y enlaces de confirmacion.        |
| `EMAIL_HOST`   | Host SMTP para envio de correos.                          |
| `EMAIL_PORT`   | Puerto SMTP.                                              |
| `EMAIL_USER`   | Usuario SMTP.                                             |
| `EMAIL_PASS`   | Contrasena SMTP.                                          |

### Frontend (`frontend/.env`)

| Variable       | Descripcion                                                     |
| -------------- | --------------------------------------------------------------- |
| `VITE_API_URL` | URL base del backend (por ejemplo `http://localhost:4000/api`). |

## Comandos utiles

- `pnpm -r install`: instala dependencias en frontend y backend desde la raiz.
- `pnpm --filter backend dev`: levanta el servidor en modo desarrollo.
- `pnpm --filter frontend dev`: inicia Vite con hot reload.
- `pnpm --filter backend seed:import`: carga datos de servicios desde el archivo de semillas.

## Recursos adicionales

- Curso de referencia: _Desarrollo Web Completo con Vue.js 3 y Firebase_ (Juan Pablo De La Torre) y modulo MEVN.
- Documentacion oficial:
  - [Vue.js](https://vuejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/docs/)
