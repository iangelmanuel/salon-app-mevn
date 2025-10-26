# Backend - Salon MEVN

API REST construida con Express, MongoDB y Mongoose para gestionar usuarios, servicios y citas de un salon de belleza.

## Stack y dependencias

- Express 5 en modo ESM.
- MongoDB con Mongoose.
- Autenticacion con JWT y bcrypt.
- Envio de correos con Nodemailer.
- Utilidades: CORS, dotenv, colors, date-fns.

## Requisitos previos

- Node.js 20 o superior.
- pnpm 10 o superior.
- Instancia de MongoDB accesible desde el entorno de desarrollo.

## Instalacion

```powershell
cd backend
pnpm install
```

## Variables de entorno (`backend/.env`)

| Variable       | Descripcion                                         |
| -------------- | --------------------------------------------------- |
| `PORT`         | Puerto para el servidor Express (4000 por defecto). |
| `MONGODB_URI`  | Cadena de conexion a la base de datos MongoDB.      |
| `JWT_SECRET`   | Llave privada para firmar tokens JWT.               |
| `FRONTEND_URL` | URL del cliente permitida por CORS.                 |
| `EMAIL_HOST`   | Host SMTP usado para correos transaccionales.       |
| `EMAIL_PORT`   | Puerto SMTP.                                        |
| `EMAIL_USER`   | Usuario o API key del servicio SMTP.                |
| `EMAIL_PASS`   | Contrasena del servicio SMTP.                       |

Crea el archivo `.env` tomando como referencia las variables anteriores antes de iniciar el servidor.

## Scripts principales

| Comando             | Descripcion                                            |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`          | Levanta el servidor con nodemon y recarga en caliente. |
| `pnpm start`        | Ejecuta el servidor en modo produccion.                |
| `pnpm seed:import`  | Inserta datos de servicios desde `src/data/seed.js`.   |
| `pnpm seed:destroy` | Elimina la informacion generada por la semilla.        |

## Flujo principal

1. `src/index.js` configura Express, CORS y monta los enrutadores.
2. `src/config/db.js` establece la conexion con MongoDB usando Mongoose.
3. Controladores en `src/controllers` gestionan la logica de negocios para autenticacion, servicios, usuarios y citas.
4. `src/middleware/authMiddleware.js` protege rutas mediante verificacion de JWT.
5. Los servicios de correo en `src/emails` envian notificaciones de registro y citas.

## Estructura destacada

```text
src/
  config/
  controllers/
  data/
  emails/
  middleware/
  models/
  router/
  utils/
```

Cada carpeta agrupa responsabilidades especificas, manteniendo el codigo modular y alineado con las practicas del curso.

## Pruebas manuales sugeridas

- Crear un usuario con `/api/auth/register` y confirmar la cuenta mediante el enlace enviado.
- Solicitar un token con `/api/auth/login` y usarlo para crear y listar citas en `/api/appointments`.
- Ejecutar `pnpm seed:import` para poblar servicios y verificar `/api/services`.
