import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cv-3d-interactivo/", // <--- AGREGA ESTA LÍNEA (Usa el nombre exacto de tu repo)
})