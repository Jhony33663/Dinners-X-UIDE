# REINVENTORS PAD — UIDE × Diners Club × Raúl Coka Barriga

Landing page de alta fidelidad, interactiva y cinematográfica para el programa de ahorro educativo **REINVENTORS PAD**, desarrollado en alianza estratégica entre la **Universidad Internacional del Ecuador (UIDE)**, **Diners Club del Ecuador** y **Raúl Coka Barriga (RCB)**.

---

## 🚀 Características Principales

* **Fondo Parallax Multicapa WebGL (Three.js)**:
  - Domo celeste institucional con degradé nocturno y descenso celeste con scroll.
  - Nubes volumétricas etéreas con mezcla aditiva y deriva procedural.
  - Cordillera Andina con niebla atmosférica difuminada que preserva la legibilidad y contraste WCAG AAA.
  - Iluminación cromática de marca (Azul Diners `#002D72`, Magenta UIDE `#910048`, Dorado RCB `#EAAA00`).
* **Tarjeta 3D Interactiva "Reinventors Key" (A2IV)**:
  - Acabado metálico en titanio cepillado con chip EMV dorado y efecto foil holográfico.
  - Física de inclinación (*tilt*) interactiva al mover el cursor.
  - Giro 180° para revelar el sello de innovación internacional de **Arizona State University (ASU)**.
* **Composición Panorámica & Responsiva**:
  - 100% libre de desbordamientos horizontales en dispositivos móviles (iPhone SE, 320px, tablets y desktops).
  - Menú desplegable interactivo de carreras de pregrado UIO y valor referencial.
  - Comparativa de decisión: *Si empiezas temprano* vs *Si esperas*.
  - Cotizador y simulador interactivo de ahorro y proyección a los 18 años.
  - Selector de pestañas dinámico para beneficios de Diners Club, RCB y UIDE.
  - Logotipos institucionales optimizados y de alto contraste en cápsulas blancas.

---

## 🛠️ Stack Tecnológico

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, TypeScript)
* **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Gráficos 3D**: [Three.js](https://threejs.org/)
* **Scroll Suave & Animaciones**: [Lenis](https://lenis.darkroom.engineering/) + [GSAP](https://gsap.com/)
* **Iconografía**: [Lucide React](https://lucide.dev/)

---

## 📦 Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Jhony33663/Dinners-X-UIDE.git
   cd Dinners-X-UIDE
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. Compilar para exportación estática:
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en GitHub Pages

El proyecto incluye un flujo de trabajo automatizado de GitHub Actions en `.github/workflows/deploy.yml`.

Para activar el despliegue automático:
1. En GitHub, ve a **Settings** > **Pages** de tu repositorio `Dinners-X-UIDE`.
2. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
3. Al hacer push a la rama `main`, la GitHub Action compilará y publicará automáticamente la web en:
   **`https://jhony33663.github.io/Dinners-X-UIDE/`**
