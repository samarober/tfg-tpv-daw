# 🛒 TPV System - Punto de Venta Full-Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Estado del Proyecto

### Backend (Completado)
- **Gestión de Usuarios:** Registro e inicio de sesión funcional mediante verificación de PIN.
- **Transacciones de Venta:** Endpoint `POST /api/sales` con control de concurrencia en base de datos (`FOR UPDATE`) y validación estricta de stock con reversión completa (`ROLLBACK`) en caso de fallo.
- **Documentación:** API completamente documentada con estándares JSDoc.

### Frontend (En Proceso)
- **Infraestructura:** Configuración base con Vite + React y sistema de enrutamiento con rutas protegidas.
- **Estilos:** Integración y configuración de Tailwind CSS.
- **Autenticación:** Vista de Login interactiva implementada con teclado numérico táctil y conexión real con la API.

Este proyecto es una solución integral de Terminal de Punto de Venta (TPV) diseñada como Trabajo Final de Grado (TFG) para el Ciclo Superior de Desarrollo de Aplicaciones Web (DAW). 

El sistema permite gestionar ventas en tiempo real, controlar el stock del catálogo y administrar tickets mediante una arquitectura desacoplada y robusta.

## ✨ Características Principales

- **Interfaz TPV Ágil (SPA):** Navegación fluida sin recargas, optimizada para entornos de caja rápida.
- **Gestión de Carrito en Tiempo Real:** Control de stock y cálculo de importes (Context API).
- **Catálogo Dinámico:** Lectura y filtrado de productos y categorías directamente desde la base de datos.
- **Transaccionalidad Segura:** Registro de ventas (cabecera y líneas de ticket) garantizando propiedades ACID.
- **Arquitectura API REST:** Comunicación estandarizada entre el cliente y el servidor.

## 🏗️ Arquitectura del Proyecto

El repositorio está estructurado en un formato monorepo que separa claramente el entorno cliente del servidor:

```text
tpv-proyecto/
├── backend/          # API REST (Node.js + Express)
│   ├── src/          # Controladores, Rutas y Configuración DB
│   └── package.json
└── frontend/         # Single Page Application (React + Vite)
    ├── src/          # Componentes, Contexto y Vistas
    └── package.json

```

## 🚀 Guía de Instalación y Despliegue Local

Para levantar este proyecto en tu entorno local, asegúrate de tener instalados [Node.js](https://nodejs.org/) y [Docker](https://www.docker.com/).

### 1. Base de Datos (PostgreSQL)

Levanta el contenedor de la base de datos ejecutando el siguiente comando:

```bash
docker run --name tpv-postgres-db -e POSTGRES_PASSWORD=root -e POSTGRES_USER=postgres -e POSTGRES_DB=tpv_db -p 5432:5432 -d postgres

```

*(Nota: Ejecuta el script DDL incluido en el proyecto para generar la estructura de tablas inicial).*

### 2. Backend (Servidor Node.js)

```bash
cd backend
npm install
npm run dev

```

El servidor de desarrollo se ejecutará en `http://localhost:5000`.

### 3. Frontend (Cliente React)

Abre una nueva terminal y ejecuta:

```bash
cd frontend
npm install
npm run dev

```

La interfaz de usuario estará disponible en `http://localhost:5173`.

## 📄 Documentación del Código

El proyecto sigue el estándar de la industria, utilizando nombres de variables y funciones en inglés, y manteniendo la documentación técnica en español mediante **JSDoc**.

## 👨‍💻 Autor

**Roberto** - *Desarrollador Web Full-Stack*
