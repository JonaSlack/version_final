# 🎮 LevelUp Store

Tienda en línea de videojuegos para **PS5 y PC**, desarrollada como
proyecto de la **Evaluación Parcial N° 1** de la asignatura **DSY1104 —
Desarrollo Fullstack II** (DuocUC).

Sitio 100% front-end: HTML5 semántico + CSS propio (sin frameworks
externos) + JavaScript nativo, sin dependencias de red para funcionar.

## Estructura del proyecto

```
levelup-store/
├── index.html              Página de inicio (hero, beneficios, destacados, video)
├── catalogo.html            Catálogo completo con filtros y buscador
├── producto.html            Ficha de producto (detalle + video + specs)
├── registro.html            Crear cuenta (formulario validado)
├── login.html                Iniciar sesión (validación con evento click)
├── carrito.html              Carrito de compras + checkout
├── contacto.html             Formulario de contacto + WhatsApp + Asistente IA
├── assets/
│   ├── css/styles.css        Hoja de estilos externa única para todo el sitio
│   ├── js/
│   │   ├── main.js           Navegación, carrito (localStorage), utilidades
│   │   ├── datos-juegos.js   Catálogo de productos (fuente de datos)
│   │   ├── catalogo.js       Filtros y buscador del catálogo
│   │   ├── producto.js       Render dinámico de la ficha de producto
│   │   ├── registro.js       Validaciones del formulario de registro
│   │   ├── login.js          Validación de inicio de sesión
│   │   ├── contacto.js       Validación del formulario de contacto
│   │   ├── asistente-ia.js   Asistente con IA (RF-02)
│   │   └── carrito.js        Lógica de carrito y checkout
│   └── img/                  Íconos SVG propios (sin material de terceros)
└── README.md
```

## Cómo ejecutar el proyecto

No requiere instalación ni servidor. Basta con abrir `index.html` en
cualquier navegador moderno, o servirlo con una extensión tipo
"Live Server" para una mejor experiencia de navegación entre páginas.

## Notas importantes antes de publicar en producción

1. **Video de tráiler**: se usa un video de muestra libre de derechos
   (cortesía de MDN Web Docs) como marcador de posición. Debe
   reemplazarse por el tráiler oficial de cada juego (archivo propio o
   `<iframe>` de YouTube) antes de publicar el sitio.
2. **Número de WhatsApp**: el botón de contacto usa un número de
   demostración (`+56 9 0000 0000`). Debe reemplazarse por el número
   real de la tienda en `contacto.html` (y en el footer de cada página).
3. **API Key de Gemini**: el asistente de IA solicita la clave al
   usuario en tiempo real; el código **nunca** la guarda ni la expone.
   Cada persona debe usar su propia clave desde
   [aistudio.google.com](https://aistudio.google.com/).
   ⚠️ Si alguna clave de API quedó expuesta en archivos de trabajo del
   equipo, debe revocarse y generarse una nueva antes de subir el
   proyecto a un repositorio público.
4. **Carrito de compras**: se guarda en `localStorage` del navegador
   (no hay backend). Es un front-end de demostración académica.

## Flujo de trabajo colaborativo sugerido (Git)

- Crear una rama por integrante o por funcionalidad (`feature/registro`,
  `feature/carrito`, etc.).
- Hacer commits pequeños y descriptivos (ej: `feat: agrega validación de
  contraseña en registro.html`, `fix: corrige ids duplicados en
  test.html`).
- Abrir Pull Requests hacia `main` para revisión entre compañeros antes
  de integrar.
- Mantener el enlace del repositorio público actualizado en la entrega.

## Créditos académicos

Proyecto desarrollado para la asignatura **DSY1104 — Desarrollo
Fullstack II**, Evaluación Parcial N° 1: *"Construyendo las bases para
mi aplicación web"*.
