-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pin VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'cajero'
);

-- 2. Tabla de Categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Tabla de Productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- 4. Tabla Cabecera de Ventas (Tickets)
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    usuario_id INT REFERENCES usuarios(id) ON DELETE RESTRICT
);

-- 5. Tabla Detalle de Ventas
CREATE TABLE lineas_venta (
    id SERIAL PRIMARY KEY,
    venta_id INT REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id INT REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL
);