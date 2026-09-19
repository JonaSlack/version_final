document.addEventListener("DOMContentLoaded", function () {

    const botonMenu =
        document.getElementById("botonMenu");

    const listaNav =
        document.getElementById("navLinks");

    if (botonMenu && listaNav) {

        botonMenu.addEventListener(
            "click",
            function () {

                const abierto =
                    listaNav.classList.toggle(
                        "abierto"
                    );

                botonMenu.setAttribute(
                    "aria-expanded",
                    abierto
                        ? "true"
                        : "false"
                );
            }
        );
    }

    const pagina =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";

    document
        .querySelectorAll(".nav-links a")
        .forEach(function (enlace) {

            const destino =
                enlace.getAttribute("href");

            if (destino === pagina) {

                enlace.classList.add(
                    "activo"
                );

                enlace.setAttribute(
                    "aria-current",
                    "page"
                );
            }
        });

    actualizarContadorCarrito();

    const spanAnio =
        document.getElementById(
            "anioActual"
        );

    if (spanAnio) {
        spanAnio.textContent =
            new Date().getFullYear();
    }
});

function actualizarContadorCarrito() {

    const insignia =
        document.getElementById(
            "carritoContador"
        );

    if (!insignia) {
        return;
    }

    const carrito =
        obtenerCarrito();

    const totalItems =
        carrito.reduce(
            function (acumulado, item) {

                return (
                    acumulado +
                    Number(
                        item.cantidad || 0
                    )
                );
            },
            0
        );

    insignia.textContent =
        totalItems;

    insignia.style.display =
        totalItems > 0
            ? "inline-block"
            : "none";
}

function obtenerCarrito() {

    try {

        const datos =
            localStorage.getItem(
                "levelup_carrito"
            );

        const carrito =
            datos
                ? JSON.parse(datos)
                : [];

        return Array.isArray(carrito)
            ? carrito
            : [];

    } catch (error) {

        console.warn(
            "No fue posible leer el carrito guardado:",
            error
        );

        return [];
    }
}

function guardarCarrito(carrito) {

    localStorage.setItem(
        "levelup_carrito",
        JSON.stringify(carrito)
    );

    actualizarContadorCarrito();
}

function agregarAlCarrito(
    producto,
    sinNotificacion
) {

    if (!producto) {
        return false;
    }

    const carrito =
        obtenerCarrito();

    const existente =
        carrito.find(
            function (item) {
                return (
                    item.id ===
                    producto.id
                );
            }
        );

    const cantidadActual =
        existente
            ? Number(
                existente.cantidad
            ) || 0
            : 0;

    const tieneStockControlado =
        typeof producto.stock ===
        "number";

    if (
        tieneStockControlado &&
        producto.stock <= 0
    ) {

        if (!sinNotificacion) {
            mostrarToast(
                producto.titulo +
                " está sin stock."
            );
        }

        return false;
    }

    if (
        tieneStockControlado &&
        cantidadActual >=
            producto.stock
    ) {

        if (!sinNotificacion) {
            mostrarToast(
                "Solo hay " +
                producto.stock +
                " unidad(es) disponibles de " +
                producto.titulo +
                "."
            );
        }

        return false;
    }

    if (cantidadActual >= 10) {

        if (!sinNotificacion) {
            mostrarToast(
                "Puedes agregar un máximo de 10 unidades por producto."
            );
        }

        return false;
    }

    if (existente) {

        existente.cantidad =
            cantidadActual + 1;

        if (tieneStockControlado) {
            existente.stock =
                producto.stock;
        }

    } else {

        const nuevoItem = {

            id:
                producto.id,

            titulo:
                producto.titulo,

            precio:
                Number(
                    producto.precio
                ),

            plataforma:
                producto.plataforma,

            cantidad: 1
        };

        if (tieneStockControlado) {
            nuevoItem.stock =
                producto.stock;
        }

        carrito.push(
            nuevoItem
        );
    }

    guardarCarrito(
        carrito
    );

    if (!sinNotificacion) {

        mostrarToast(
            producto.titulo +
            " se agregó al carrito 🛒"
        );
    }

    return true;
}

function mostrarToast(texto) {

    let toast =
        document.getElementById(
            "toastGlobal"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "toastGlobal";

        toast.className =
            "toast";

        toast.setAttribute(
            "role",
            "status"
        );

        toast.setAttribute(
            "aria-live",
            "polite"
        );

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        texto;

    toast.classList.add(
        "visible"
    );

    clearTimeout(
        window.__toastTimeout
    );

    window.__toastTimeout =
        setTimeout(
            function () {

                toast.classList.remove(
                    "visible"
                );

            },
            2600
        );
}

function formatearCLP(valor) {

    const numero =
        Number(valor);

    if (!Number.isFinite(numero)) {
        return "$0";
    }

    return (
        "$" +
        numero.toLocaleString(
            "es-CL"
        )
    );
}