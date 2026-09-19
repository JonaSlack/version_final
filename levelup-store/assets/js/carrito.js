document.addEventListener("DOMContentLoaded", function () {

    renderizarCarrito();

    const btnVaciarCarrito =
        document.getElementById("btnVaciarCarrito");

    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener(
            "click",
            function () {
                guardarCarrito([]);
                renderizarCarrito();
                mostrarToast("Carrito vaciado.");
            }
        );
    }

    const idPedido =
        document.getElementById("idPedido");

    if (idPedido) {
        idPedido.value =
            "LU-" + Date.now();
    }

    const rangoOfertas =
        document.getElementById("ofertasMes");

    const valorOfertas =
        document.getElementById("valorOfertasMes");

    if (rangoOfertas && valorOfertas) {
        rangoOfertas.addEventListener(
            "input",
            function () {
                valorOfertas.textContent =
                    rangoOfertas.value;
            }
        );
    }

    const selectPago =
        document.getElementById("pagoCheckout");

    const grupoComprobante =
        document.getElementById("grupoComprobante");

    if (selectPago && grupoComprobante) {
        selectPago.addEventListener(
            "change",
            function () {
                grupoComprobante.style.display =
                    selectPago.value === "transferencia"
                        ? "block"
                        : "none";
            }
        );
    }

    const formulario =
        document.getElementById("formCheckout");

    if (formulario) {
        formulario.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();

                const carritoActual =
                    obtenerCarrito();

                const resultado =
                    document.getElementById(
                        "resultadoCheckout"
                    );

                if (carritoActual.length === 0) {
                    resultado.classList.remove(
                        "exito"
                    );

                    resultado.classList.add(
                        "error"
                    );

                    resultado.style.display =
                        "block";

                    resultado.textContent =
                        "❌ Tu carrito está vacío. " +
                        "Agrega productos antes de finalizar la compra.";

                    return;
                }

                const validacionStock =
                    validarStockCarrito(
                        carritoActual
                    );

                if (!validacionStock.valido) {
                    resultado.classList.remove(
                        "exito"
                    );

                    resultado.classList.add(
                        "error"
                    );

                    resultado.style.display =
                        "block";

                    resultado.textContent =
                        validacionStock.mensaje;

                    renderizarCarrito();

                    return;
                }

                let valido = true;

                valido =
                    validarTexto(
                        "nombreCheckout",
                        "errorNombreCheckout",
                        "Debes ingresar tu nombre completo.",
                        3
                    ) && valido;

                valido =
                    validarEmailCampo(
                        "emailCheckout",
                        "errorEmailCheckout"
                    ) && valido;

                valido =
                    validarTelefono(
                        "telefonoCheckout",
                        "errorTelefonoCheckout"
                    ) && valido;

                valido =
                    validarFecha(
                        "fechaEntrega",
                        "errorFechaEntrega"
                    ) && valido;

                valido =
                    validarTexto(
                        "direccionCheckout",
                        "errorDireccionCheckout",
                        "Debes ingresar tu dirección de despacho.",
                        5
                    ) && valido;

                valido =
                    validarSelect(
                        "comunaCheckout",
                        "errorComunaCheckout",
                        "Selecciona tu región o comuna."
                    ) && valido;

                valido =
                    validarSelect(
                        "pagoCheckout",
                        "errorPagoCheckout",
                        "Selecciona un método de pago."
                    ) && valido;

                valido =
                    validarTerminosCheckout() &&
                    valido;

                resultado.classList.remove(
                    "exito",
                    "error"
                );

                if (valido) {

                    descontarStock(
                        carritoActual
                    );

                    resultado.classList.add(
                        "exito"
                    );

                    resultado.textContent =
                        "✔ ¡Pedido " +
                        document.getElementById(
                            "idPedido"
                        ).value +
                        " confirmado! Te enviamos un correo con el detalle.";

                    resultado.style.display =
                        "block";

                    console.log(
                        "Pedido confirmado:",
                        {
                            id:
                                document.getElementById(
                                    "idPedido"
                                ).value,
                            carrito:
                                carritoActual,
                            pago:
                                selectPago.value
                        }
                    );

                    guardarCarrito([]);

                    renderizarCarrito();

                    formulario.reset();

                    if (grupoComprobante) {
                        grupoComprobante.style.display =
                            "none";
                    }

                    if (
                        rangoOfertas &&
                        valorOfertas
                    ) {
                        valorOfertas.textContent =
                            rangoOfertas.value;
                    }

                    document
                        .querySelectorAll(
                            "#formCheckout input, " +
                            "#formCheckout select, " +
                            "#formCheckout textarea"
                        )
                        .forEach(
                            function (campo) {
                                campo.classList.remove(
                                    "campo-valido",
                                    "campo-invalido"
                                );
                            }
                        );

                    document.getElementById(
                        "idPedido"
                    ).value =
                        "LU-" + Date.now();

                } else {

                    resultado.classList.add(
                        "error"
                    );

                    resultado.textContent =
                        "❌ Revisa los campos marcados antes de confirmar tu pedido.";

                    resultado.style.display =
                        "block";
                }
            }
        );
    }
});

function obtenerStockProducto(id) {

    if (
        !id ||
        !id.startsWith("admin-")
    ) {
        return null;
    }

    const producto =
        typeof buscarJuegoPorId === "function"
            ? buscarJuegoPorId(id)
            : null;

    if (!producto) {
        return 0;
    }

    if (
        typeof producto.stock !== "number"
    ) {
        return null;
    }

    return producto.stock;
}

function validarStockCarrito(carrito) {

    for (
        let i = 0;
        i < carrito.length;
        i++
    ) {

        const item =
            carrito[i];

        const stock =
            obtenerStockProducto(
                item.id
            );

        if (stock === null) {
            continue;
        }

        if (stock <= 0) {
            return {
                valido: false,
                mensaje:
                    "❌ " +
                    item.titulo +
                    " está sin stock."
            };
        }

        if (item.cantidad > stock) {
            return {
                valido: false,
                mensaje:
                    "❌ Solo quedan " +
                    stock +
                    " unidad(es) de " +
                    item.titulo +
                    "."
            };
        }
    }

    return {
        valido: true,
        mensaje: ""
    };
}

function descontarStock(carrito) {

    let productos;

    try {
        productos =
            JSON.parse(
                localStorage.getItem(
                    "levelupProductos"
                )
            ) || [];
    } catch (error) {
        productos = [];
    }

    carrito.forEach(
        function (item) {

            if (
                !item.id ||
                !item.id.startsWith(
                    "admin-"
                )
            ) {
                return;
            }

            const codigo =
                item.id.substring(
                    "admin-".length
                );

            const producto =
                productos.find(
                    function (p) {
                        return (
                            p.codigo ===
                            codigo
                        );
                    }
                );

            if (!producto) {
                return;
            }

            const stockActual =
                Number(
                    producto.stock
                ) || 0;

            producto.stock =
                Math.max(
                    0,
                    stockActual -
                    item.cantidad
                );
        }
    );

    localStorage.setItem(
        "levelupProductos",
        JSON.stringify(
            productos
        )
    );
}

function renderizarCarrito() {

    const carrito =
        obtenerCarrito();

    const cuerpoTabla =
        document.getElementById(
            "cuerpoTablaCarrito"
        );

    const bloqueVacio =
        document.getElementById(
            "bloqueCarritoVacio"
        );

    const bloqueConProductos =
        document.getElementById(
            "bloqueCarritoConProductos"
        );

    if (
        !cuerpoTabla ||
        !bloqueVacio ||
        !bloqueConProductos
    ) {
        return;
    }

    if (carrito.length === 0) {

        bloqueVacio.style.display =
            "block";

        bloqueConProductos.style.display =
            "none";

        actualizarResumen([]);

        return;
    }

    bloqueVacio.style.display =
        "none";

    bloqueConProductos.style.display =
        "grid";

    cuerpoTabla.innerHTML =
        carrito
            .map(
                function (item) {

                    const stock =
                        obtenerStockProducto(
                            item.id
                        );

                    let maximo = 10;

                    if (stock !== null) {
                        maximo =
                            Math.max(
                                1,
                                Math.min(
                                    10,
                                    stock
                                )
                            );
                    }

                    let avisoStock = "";

                    if (
                        stock !== null &&
                        stock <= 0
                    ) {
                        avisoStock =
                            '<br><small class="mensaje-error">' +
                            'Sin stock' +
                            '</small>';
                    } else if (
                        stock !== null &&
                        item.cantidad > stock
                    ) {
                        avisoStock =
                            '<br><small class="mensaje-error">' +
                            'Máximo disponible: ' +
                            stock +
                            '</small>';
                    }

                    return (
                        "<tr>" +

                            "<td>" +
                                item.titulo +
                                avisoStock +
                            "</td>" +

                            "<td>" +
                                formatearCLP(
                                    item.precio
                                ) +
                            "</td>" +

                            "<td>" +

                                '<input ' +
                                    'type="number" ' +
                                    'min="1" ' +
                                    'max="' +
                                    maximo +
                                    '" ' +
                                    'value="' +
                                    item.cantidad +
                                    '" ' +
                                    'class="input-cantidad" ' +
                                    'data-id="' +
                                    item.id +
                                    '" ' +
                                    'style="width:80px;">' +

                            "</td>" +

                            "<td>" +
                                formatearCLP(
                                    item.precio *
                                    item.cantidad
                                ) +
                            "</td>" +

                            "<td>" +

                                '<button ' +
                                    'type="button" ' +
                                    'class="btn btn-secundario" ' +
                                    'data-quitar="' +
                                    item.id +
                                    '">' +
                                    'Quitar' +
                                '</button>' +

                            "</td>" +

                        "</tr>"
                    );
                }
            )
            .join("");

    cuerpoTabla
        .querySelectorAll(
            ".input-cantidad"
        )
        .forEach(
            function (input) {

                input.addEventListener(
                    "change",
                    function () {

                        cambiarCantidad(
                            input.dataset.id,
                            Number(
                                input.value
                            )
                        );
                    }
                );
            }
        );

    cuerpoTabla
        .querySelectorAll(
            "[data-quitar]"
        )
        .forEach(
            function (boton) {

                boton.addEventListener(
                    "click",
                    function () {

                        quitarDelCarrito(
                            boton.dataset.quitar
                        );
                    }
                );
            }
        );

    actualizarResumen(
        carrito
    );
}

function cambiarCantidad(
    id,
    cantidad
) {

    const carrito =
        obtenerCarrito();

    const item =
        carrito.find(
            function (producto) {
                return (
                    producto.id === id
                );
            }
        );

    if (!item) {
        return;
    }

    let nuevaCantidad =
        Number(cantidad);

    if (
        !Number.isInteger(
            nuevaCantidad
        ) ||
        nuevaCantidad < 1
    ) {
        nuevaCantidad = 1;
    }

    let maximo = 10;

    const stock =
        obtenerStockProducto(id);

    if (stock !== null) {

        if (stock <= 0) {
            mostrarToast(
                "Este producto está sin stock."
            );

            renderizarCarrito();

            return;
        }

        maximo =
            Math.min(
                10,
                stock
            );
    }

    if (nuevaCantidad > maximo) {

        nuevaCantidad =
            maximo;

        mostrarToast(
            "Cantidad ajustada al stock disponible."
        );
    }

    item.cantidad =
        nuevaCantidad;

    guardarCarrito(
        carrito
    );

    renderizarCarrito();
}

function quitarDelCarrito(id) {

    const carrito =
        obtenerCarrito()
            .filter(
                function (producto) {
                    return (
                        producto.id !== id
                    );
                }
            );

    guardarCarrito(
        carrito
    );

    renderizarCarrito();

    mostrarToast(
        "Producto eliminado del carrito."
    );
}

function actualizarResumen(carrito) {

    const subtotal =
        carrito.reduce(
            function (
                acumulado,
                item
            ) {
                return (
                    acumulado +
                    item.precio *
                    item.cantidad
                );
            },
            0
        );

    const envio =
        subtotal >= 30000 ||
        subtotal === 0
            ? 0
            : 3990;

    const total =
        subtotal + envio;

    const resumenSubtotal =
        document.getElementById(
            "resumenSubtotal"
        );

    const resumenEnvio =
        document.getElementById(
            "resumenEnvio"
        );

    const resumenTotal =
        document.getElementById(
            "resumenTotal"
        );

    if (resumenSubtotal) {
        resumenSubtotal.textContent =
            formatearCLP(
                subtotal
            );
    }

    if (resumenEnvio) {
        resumenEnvio.textContent =
            envio === 0
                ? "Gratis"
                : formatearCLP(
                    envio
                );
    }

    if (resumenTotal) {
        resumenTotal.textContent =
            formatearCLP(
                total
            );
    }
}

function validarTexto(
    idCampo,
    idError,
    mensaje,
    minimo
) {

    const campo =
        document.getElementById(
            idCampo
        );

    const valor =
        campo.value.trim();

    if (
        valor === "" ||
        valor.length < minimo
    ) {
        marcar(
            campo,
            idError,
            mensaje
        );

        return false;
    }

    marcarOk(
        campo,
        idError
    );

    return true;
}

function validarEmailCampo(
    idCampo,
    idError
) {

    const campo =
        document.getElementById(
            idCampo
        );

    const valor =
        campo.value
            .trim()
            .toLowerCase();

    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com"
    ];

    const formatoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(valor);

    const dominioValido =
        dominiosPermitidos.some(
            function (dominio) {
                return valor.endsWith(
                    dominio
                );
            }
        );

    if (
        valor === "" ||
        !formatoValido
    ) {
        marcar(
            campo,
            idError,
            "Ingresa un correo electrónico válido."
        );

        return false;
    }

    if (valor.length > 100) {
        marcar(
            campo,
            idError,
            "El correo no puede superar los 100 caracteres."
        );

        return false;
    }

    if (!dominioValido) {
        marcar(
            campo,
            idError,
            "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;
    }

    marcarOk(
        campo,
        idError
    );

    return true;
}

function validarTelefono(
    idCampo,
    idError
) {

    const campo =
        document.getElementById(
            idCampo
        );

    const soloNumeros =
        campo.value.replace(
            /\D/g,
            ""
        );

    if (
        soloNumeros.length < 8
    ) {
        marcar(
            campo,
            idError,
            "Ingresa un teléfono válido (mínimo 8 dígitos)."
        );

        return false;
    }

    marcarOk(
        campo,
        idError
    );

    return true;
}

function validarFecha(
    idCampo,
    idError
) {

    const campo =
        document.getElementById(
            idCampo
        );

    if (campo.value === "") {
        marcar(
            campo,
            idError,
            "Selecciona una fecha de entrega."
        );

        return false;
    }

    const hoy =
        new Date();

    hoy.setHours(
        0,
        0,
        0,
        0
    );

    const fechaElegida =
        new Date(
            campo.value +
            "T00:00:00"
        );

    if (fechaElegida < hoy) {
        marcar(
            campo,
            idError,
            "La fecha no puede ser anterior a hoy."
        );

        return false;
    }

    marcarOk(
        campo,
        idError
    );

    return true;
}

function validarSelect(
    idCampo,
    idError,
    mensaje
) {

    const campo =
        document.getElementById(
            idCampo
        );

    if (campo.value === "") {
        marcar(
            campo,
            idError,
            mensaje
        );

        return false;
    }

    marcarOk(
        campo,
        idError
    );

    return true;
}

function validarTerminosCheckout() {

    const campo =
        document.getElementById(
            "terminosCheckout"
        );

    const error =
        document.getElementById(
            "errorTerminosCheckout"
        );

    if (!campo.checked) {

        campo.classList.add(
            "campo-invalido"
        );

        error.textContent =
            "Debes aceptar los términos de compra y despacho.";

        return false;
    }

    campo.classList.remove(
        "campo-invalido"
    );

    error.textContent = "";

    return true;
}

function marcar(
    campo,
    idError,
    mensaje
) {

    campo.classList.add(
        "campo-invalido"
    );

    campo.classList.remove(
        "campo-valido"
    );

    document.getElementById(
        idError
    ).textContent =
        mensaje;
}

function marcarOk(
    campo,
    idError
) {

    campo.classList.remove(
        "campo-invalido"
    );

    campo.classList.add(
        "campo-valido"
    );

    document.getElementById(
        idError
    ).textContent = "";
}