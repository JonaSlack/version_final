/* =========================================================================
   main.js
   Script compartido por TODAS las páginas del sitio LevelUp Store.
   Responsabilidades:
     1. Menú de navegación responsivo (botón hamburguesa).
     2. Resaltar el enlace de la página activa en la navegación.
     3. Mantener y mostrar el contador del carrito de compras (localStorage).
     4. Año dinámico en el footer.
     5. Función utilitaria mostrarToast() usada por otros scripts.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------------
    // 1. MENÚ RESPONSIVO
    // -----------------------------------------------------------
    const botonMenu = document.getElementById("botonMenu");
    const listaNav = document.getElementById("navLinks");

    if (botonMenu && listaNav) {
        botonMenu.addEventListener("click", function () {
            const abierto = listaNav.classList.toggle("abierto");
            botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
        });
    }

    // -----------------------------------------------------------
    // 2. RESALTAR ENLACE ACTIVO SEGÚN LA URL ACTUAL
    // -----------------------------------------------------------
    const pagina = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (enlace) {
        const destino = enlace.getAttribute("href");
        if (destino === pagina) {
            enlace.classList.add("activo");
            enlace.setAttribute("aria-current", "page");
        }
    });

    // -----------------------------------------------------------
    // 3. CONTADOR DEL CARRITO
    // -----------------------------------------------------------
    actualizarContadorCarrito();

    // -----------------------------------------------------------
    // 4. AÑO DINÁMICO EN EL FOOTER
    // -----------------------------------------------------------
    const spanAnio = document.getElementById("anioActual");
    if (spanAnio) {
        spanAnio.textContent = new Date().getFullYear();
    }
});

/**
 * Lee el carrito guardado en localStorage y actualiza la burbuja
 * numérica que aparece junto al ícono del carrito en la navegación.
 */
function actualizarContadorCarrito() {
    const insignia = document.getElementById("carritoContador");
    if (!insignia) return;

    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce(function (acumulado, item) {
        return acumulado + item.cantidad;
    }, 0);

    insignia.textContent = totalItems;
    insignia.style.display = totalItems > 0 ? "inline-block" : "none";
}

/**
 * Obtiene el arreglo de productos del carrito desde localStorage.
 * Si no existe o está corrupto, devuelve un arreglo vacío.
 */
function obtenerCarrito() {
    try {
        const datos = localStorage.getItem("levelup_carrito");
        return datos ? JSON.parse(datos) : [];
    } catch (error) {
        console.warn("No fue posible leer el carrito guardado:", error);
        return [];
    }
}

/**
 * Guarda el arreglo del carrito en localStorage y refresca el contador.
 */
function guardarCarrito(carrito) {
    localStorage.setItem("levelup_carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

/**
 * Agrega un juego al carrito (o incrementa su cantidad si ya existía).
 */
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(function (item) {
        return item.id === producto.id;
    });

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            plataforma: producto.plataforma,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    mostrarToast(producto.titulo + " se agregó al carrito 🛒");
}

/**
 * Muestra una notificación flotante (toast) breve en la esquina inferior
 * derecha de la pantalla. Se usa como retroalimentación de botones
 * operativos (agregar al carrito, enviar formularios, etc).
 */
function mostrarToast(texto) {
    let toast = document.getElementById("toastGlobal");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastGlobal";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = texto;
    toast.classList.add("visible");

    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(function () {
        toast.classList.remove("visible");
    }, 2600);
}

/**
 * Formatea un número como precio en pesos chilenos (CLP).
 */
function formatearCLP(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}
