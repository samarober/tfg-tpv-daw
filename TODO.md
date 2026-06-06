# 📝 Próximos Pasos - Desarrollo TPV

## 🟩 Pendiente (Siguiente Sesión)
- [ ] Crear la rama de trabajo `feature/frontend-terminal`.
- [ ] Diseñar la interfaz principal del `Terminal.jsx` dividida en dos columnas con Tailwind CSS.
  - [ ] **Columna Izquierda (Catálogo):** Renderizar la cuadrícula de productos consumiendo el endpoint `GET /api/products` mediante un `fetch`.
  - [ ] **Columna Derecha (Ticket):** Crear el panel del carrito de compra actual (lista de artículos seleccionados, cantidades y cálculo dinámico del total).
  - [ ] **Acción de Cierre:** Añadir el botón de "Cobrar" que dispare la petición estructurada hacia `POST /api/sales`.

## 🟦 Ideas para el futuro (Refactorización de Seguridad)
- [ ] Integrar el cifrado de credenciales con `bcrypt` en el controlador de usuarios del backend.