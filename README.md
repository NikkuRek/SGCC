# SGCC Backend

Backend API para la gestión del Sistema de Gestión de Censos Comunitarios (SGCC), construido con Node.js, Express y Sequelize.

## Características

- Gestión de personas, censos y participantes de censos
- Endpoints RESTful para CRUD de entidades principales
- Validaciones robustas y manejo de errores
- Documentación OpenAPI/Swagger integrada
- Estructura modular y escalable

## Estructura del Proyecto

```
src/
    app.ts
    config/
        index.ts
        sequelize.config.ts
        swagger.config.ts
    controllers/
        persona.controller.ts
        censo.controller.ts
        censo-participante.controller.ts
        index.ts
    docs/
        persona.doc.yml
        censo.doc.yml
        censo-participant.doc.yml
        health.doc.yml
    helpers/
        excel.helper.ts
        file.helper.ts
        index.ts
        jwt.helpers.ts
    interfaces/
        persona.interface.ts
        censo.interface.ts
        censo-participante.interface.ts
        index.ts
    middlewares/
        validate-fields.middlewares.ts
        index.ts
        ...
    models/
        persona.model.ts
        censo.model.ts
        censo-participante.model.ts
        index.ts
    public/
        index.html
    routes/
        persona.routes.ts
        censo.routes.ts
        censo-participante.routes.ts
        health.routes.ts
        index.route.ts
    server/
        server.ts
    services/
        persona.service.ts
        censo.service.ts
        censo-participante.service.ts
        index.ts
    validators/
        persona.validators.ts
        censo.validators.ts
        censo-participante.validators.ts
        index.ts
```

## Stack Tecnológico

- Node.js
- Express
- Sequelize (MySQL)
- Swagger (OpenAPI)
- TypeScript

## Primeros Pasos

### Requisitos Previos

- Node.js (v18+)
- MySQL

### Instalación

```bash
git clone https://github.com/NikkuRek/sgcc.git
cd sgcc
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_PORT=3306
API_URL=
DATABASE_DIALECT=mysql
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=[tu contraseña]
DATABASE_NAME=sgcc_DB
DEV=true
PORT=3000
```

### Ejecutar el Servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

## Documentación de la API

La documentación Swagger está disponible en:  
`http://localhost:3000/swagger`

Consulta los archivos en `src/docs/` para la definición OpenAPI de los endpoints.

## Scripts Disponibles

- `npm run build` — Compila TypeScript a JavaScript en la carpeta `dist`.
- `npm run start` — Inicia el servidor en modo producción.
- `npm run dev` — Inicia el servidor en modo desarrollo.
- `npm run seeds` — Ejecuta scripts para poblar la base de datos con datos de ejemplo.

## Licencia

[MIT](LICENSE)
