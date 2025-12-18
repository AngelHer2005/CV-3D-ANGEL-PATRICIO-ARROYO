# 🧊 CV 3D Interactivo - Angel Hernan Patricio Arroyo

> **Mi hoja de vida transformada en una experiencia virtual inmersiva.** Explora mi perfil, habilidades y trayectoria profesional navegando por un mundo 3D interactivo construido con tecnología web moderna.

![Preview](public/CV-image.jpg)
*(Reemplaza esta línea con una captura real de tu ciudad 3D)*

## 🚀 Sobre el Proyecto

Este no es un portafolio estático tradicional. He desarrollado una aplicación web que renderiza todos los datos de mi CV en un entorno tridimensional (una "Ciudad de Gelatina"). El usuario puede recorrer mi experiencia laboral y académica como si fuera un videojuego en primera persona, interactuando con diferentes elementos para descubrir más sobre mi perfil profesional.

🔗 **Demo en vivo:** [Inserte tu link de Vercel/Netlify aquí]

## ✨ Características Principales

* **Visualización de Datos 3D:** Mis *Hard Skills*, *Soft Skills*, *Educación* y *Certificaciones* están representadas como monumentos interactivos en el mundo virtual.
* **Navegación Inmersiva:** Control de personaje en primera persona (WASD + Mouse) con físicas realistas implementadas con `Rapier`.
* **Descarga de CV Nativa:** Generación de PDF en tiempo real directamente desde la aplicación, manteniendo un diseño profesional y texto seleccionable.
* **Optimización de Rendimiento:** Uso de técnicas como *Instancing* para renderizar una ciudad completa y nubes volumétricas a 60 FPS en el navegador.
* **Interfaz Glassmorphism:** Paneles de información modernos y elegantes que se integran con la estética 3D.

## 🛠️ Stack Tecnológico

Este proyecto demuestra mis capacidades en desarrollo Frontend avanzado:

**Core:**
* [React 18](https://reactjs.org/) - Arquitectura de componentes.
* [TypeScript](https://www.typescriptlang.org/) - Tipado estático para código robusto y escalable.
* [Vite](https://vitejs.dev/) - Entorno de desarrollo de última generación.

**Gráficos & Físicas:**
* **Three.js** (@react-three/fiber) - Motor de renderizado 3D.
* **Rapier** (@react-three/rapier) - Motor de físicas para colisiones y movimiento.
* **Drei** - Abstracciones y utilidades para Three.js.

**Herramientas Adicionales:**
* **@react-pdf/renderer** - Generación de documentos PDF dinámicos.
* **Tailwind CSS** - Estilizado rápido y responsivo.

## 📦 Instalación y Uso Local

Si quieres explorar el código fuente o ejecutarlo en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/AngelHer2005/cv-3d-interactivo.git](https://github.com/AngelHer2005/cv-3d-interactivo.git)
    cd cv-3d-interactivo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita `http://localhost:5173` para ver la experiencia.

## 🎮 Controles

| Tecla | Acción |
| :--- | :--- |
| **W, A, S, D** | Moverse por el mundo |
| **Mouse** | Mirar alrededor |
| **Click Izq** | Interactuar con paneles y botones |
| **Esc** | Liberar el cursor / Pausa |
| **C** | Descargar CV en PDF |
| **V** | Visualizar CV (Imagen rápida) |
| **O** | Abrir Menú de Ajustes |

## 👨‍💻 Autor

**Angel Hernan Patricio Arroyo**
* *Ingeniero de Software con Inteligencia Artificial*
* [LinkedIn](https://linkedin.com/in/angelhernanpatricioarroyo)
* [Email](mailto:angelhernanpatricioarroyo@gmail.com)
* [GitHub](https://github.com/AngelHer2005)

---
*Hecho con código, creatividad y React Three Fiber.*