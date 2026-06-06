# 🛒 TPV System - Punto de Venta Full-Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

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
