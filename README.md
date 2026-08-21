# YaOficios

YaOficios es una aplicación web diseñada para conectar a trabajadores especializados con personas que necesitan servicios en una variedad de oficios.

La aplicación ha sido construida utilizando [React](https://reactjs.org/) y [Vite](https://vite.dev/), con [Tailwind CSS](https://tailwindcss.com/) para el diseño y estilo de la interfaz de usuario, [Firebase](https://firebase.google.com/) (Auth y Firestore) como backend, íconos de [React Icons](https://react-icons.github.io/react-icons/) y notificaciones con [React Toastify](https://www.npmjs.com/package/react-toastify).

## Funcionalidades

1. Conexión entre trabajadores y clientes
2. Lista de trabajadores disponibles para contratar
3. Funcionalidad para contratar trabajadores
4. Notificaciones y alertas en la aplicación

## Instalación

Para instalar y ejecutar la aplicación:

1. Clona el repositorio y entrá a la carpeta del proyecto:
   ```sh
   git clone https://github.com/itsjuanit/workers.git
   cd workers
   ```
2. Instalá las dependencias:
   ```sh
   npm install
   ```
3. Copiá `.env.example` a `.env` y completá las credenciales de tu proyecto de Firebase (Configuración del proyecto → Tus apps → SDK de Firebase):
   ```sh
   cp .env.example .env
   ```
4. Iniciá el servidor de desarrollo (puerto 3001):
   ```sh
   npm run dev
   ```

Otros comandos disponibles: `npm run build` (build de producción), `npm run preview` (sirve el build), `npm test` (corre los tests con Vitest).
