# Calvo Medina Abogados — Sitio Web

Maqueta front-end profesional. Scroll-driven, cinematográfico, listo para migrar a WordPress.

---

## Estructura del proyecto

```
calvo-medina-pro/
├── index.html              # Entrada principal
├── README.md               # Este archivo
│
├── css/
│   ├── reset.css           # Normalización de estilos
│   ├── variables.css       # Tokens de diseño (colores, tipografía, spacing)
│   ├── base.css            # Estilos globales y layout raíz
│   ├── grain.css           # Overlay de grano cinematográfico
│   ├── cursor.css          # Cursor personalizado
│   ├── nav.css             # Navegación, dots laterales, línea de progreso
│   ├── intro.css           # Hero / nombre de la firma
│   ├── scenes.css          # Escenas de áreas de práctica
│   └── contact.css         # Sección de contacto y formulario
│
├── js/
│   ├── config.js           # ← Todos los valores tuneable están aquí
│   ├── cursor.js           # Módulo de cursor personalizado
│   ├── particles.js        # Partículas flotantes de ambiente
│   ├── textures.js         # Texturas procedurales para cada escena
│   ├── scroll.js           # Motor principal de animación por scroll
│   ├── form.js             # Manejo del formulario de contacto
│   └── main.js             # Inicialización de módulos
│
└── assets/
    ├── images/             # ← Aquí van las fotos reales cuando el cliente las entregue
    └── fonts/              # Fuentes locales (opcional, ahora usa Google Fonts)
```

---

## Cómo correrlo localmente

Abre `index.html` directamente en Chrome o Firefox.  
No requiere servidor, no requiere instalaciones.

---

## Cómo personalizar

### Cambiar velocidad del scroll
Edita `js/config.js` → `scroll.sceneSpan` (número más alto = más lento).

### Cambiar colores de cada escena
Edita `js/config.js` → `palettes[i]` con tus propios valores RGB.

### Agregar fotos reales
En `js/textures.js`, reemplaza `paintScene()` por:
```js
// Ejemplo con imagen real
const img = new Image();
img.src = 'assets/images/propiedad-intelectual.jpg';
img.onload = () => ctx.drawImage(img, 0, 0, 900, 580);
```

### Conectar el formulario
En `js/form.js` → sección `TODO`, agrega tu integración:
- **FormSpree**: `fetch('https://formspree.io/f/TU_ID', ...)`
- **EmailJS**: `emailjs.send(...)`
- **WordPress CF7**: endpoint REST de Contact Form 7

---

## Migración a WordPress

Cada sección del HTML corresponde a un template part de WordPress:

| HTML                  | WordPress             |
|-----------------------|-----------------------|
| `<nav id="nav">`      | `header.php`          |
| `<section id="intro">`| `template-parts/intro.php` |
| `<div id="scenes-container">` | `template-parts/areas.php` |
| `<section id="contact-scene">` | `template-parts/contact.php` |
| `<footer>`            | `footer.php`          |

Los CSS y JS se enqueuean desde `functions.php` con `wp_enqueue_style()` y `wp_enqueue_script()`.

---

## Próximos pasos sugeridos

- [ ] Recibir fotos reales del cliente para reemplazar texturas
- [ ] Definir correo de destino del formulario
- [ ] Agregar sección "Nosotros" con foto del equipo
- [ ] Responsive móvil (breakpoints en `css/base.css`)
- [ ] SEO: meta tags, Open Graph, favicon
- [ ] Migrar a WordPress theme personalizado
