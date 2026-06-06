import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Exporta la configuración básica de Vite para proyectos React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto estándar de desarrollo
  }
});