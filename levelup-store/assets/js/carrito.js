/* =========================================================================
   carrito.js
   Lógica de carrito.html:
     1. Renderiza la tabla del carrito desde localStorage (main.js).
     2. Permite cambiar cantidades y eliminar productos.
     3. Calcula subtotal, envío y total, y los muestra en el resumen.
     4. Valida el formulario de checkout (múltiples tipos de <input>).
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderizarCarrito();

    document.getElementById("btnVaciarCarrito").addEventListener("click", function () {
        guardarCarrito([]);
        renderizarCarrito();
        mostrarToast("Carrito vaciado.");
    });

    // -----------------------------------------------------------
    // ID de pedido único (input hidden)
    // -----------------------------------------------------------
    document.getElementById("idPedido").value = "LU-" + Date.now();

    // -----------------------------------------------------------
    // RANGE: mostrar el valor numérico en vivo
    // -----------------------------------------------------------
    const rangoOfertas = document.getElementById("ofertasMes");
    const valorOfertas = document.getElementById("valorOfertasMes");
    if (rangoOfertas) {
        rangoOfertas.addEventListener("input", function () {
            valorOfertas.textContent = rangoOfertas.value;
        });
    }

    // -----------------------------------------------------------
    // Mostrar el campo "comprobante" solo si el pago es transferencia
    // -----------------------------------------------------------
    const selectPago = document.getElementById("pagoCheckout");
    const grupoComprobante = document.getElementById("grupoComprobante");

    selectPago.addEventListener("change", function () {
        grupoComprobante.style.display = selectPago.value === "transferencia" ? "block" : "none";
    });

    // -----------------------------------------------------------
    // VALIDACIÓN DEL FORMULARIO DE CHECKOUT
    // -----------------------------------------------------------
    const formulario = document.getElementById("formCheckout");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const carritoActual = obtenerCarrito();
        const resultado = document.getElementById("resultadoCheckout");

        if (carritoActual.length === 0) {
            resultado.classList.remove("exito");
            resultado.classList.add("error");
            resultado.style.display = "block";
            resultado.textContent = "❌ Tu carrito está vacío. Agrega juegos antes de finalizar la compra.";
            return;
        }

        let valido = true;

        valido = validarTexto("nombreCheckout", "errorNombreCheckout", "Debes ingresar tu nombre completo.", 3) && valido;
        valido = validarEmailCampo("emailCheckout", "errorEmailCheckout") && valido;
        valido = validarTelefono("telefonoCheckout", "errorTelefonoCheckout") && valido;
        valido = validarFecha("fechaEntrega", "errorFechaEntrega") && valido;
        valido = validarTexto("direccionCheckout", "errorDireccionCheckout", "Debes ingresar tu dirección de despacho.", 5) && valido;
        valido = validarSelect("comunaCheckout", "errorComunaCheckout", "Selecciona tu región o comuna.") && valido;
        valido = validarSelect("pagoCheckout", "errorPagoCheckout", "Selecciona un método de pago.") && valido;
        valido = validarTerminosCheckout() && valido;

        resultado.classList.remove("exito", "error");

        if (valido) {
            resultado.classList.add("exito");
            resultado.textContent = "✔ ¡Pedido " + document.getElementById("idPedido").value + " confirmado! Te enviamos un correo con el detalle.";
            resultado.style.display = "block";

            console.log("Pedido confirmado:", {
                id: document.getElementById("idPedido").value,
                carrito: carritoActual,
                pago: selectPago.value
            });

            guardarCarrito([]);
            renderizarCarrito();
            formulario.reset();
            document.querySelectorAll("#formCheckout input, #formCheckout select, #formCheckout textarea").forEach(function (campo) {
                campo.classList.remove("campo-valido", "campo-invalido");
            });

        } else {
            resultado.classList.add("error");
            resultado.textContent = "❌ Revisa los campos marcados antes de confirmar tu pedido.";
            resultado.style.display = "block";
        }
    });

});

/* -------------------------------------------------------------------------
   RENDERIZADO DEL CARRITO Y RESUMEN
   ------------------------------------------------------------------------- */

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const cuerpoTabla = document.getElementById("cuerpoTablaCarrito");
    const bloqueVacio = document.getElementById("bloqueCarritoVacio");
    const bloqueConProductos = document.getElementById("bloqueCarritoConProductos");

    if (carrito.length === 0) {
        bloqueVacio.style.display = "block";
        bloqueConProductos.style.display = "none";
        return;
    }

    bloqueVacio.style.display = "none";
    bloqueConProductos.style.display = "grid";

    cuerpoTabla.innerHTML = carrito.map(function (item) {
        return (
            "<tr>" +
                "<td>" + item.titulo + "</td>" +
                "<td>" + formatearCLP(item.precio) + "</td>" +
                "<td>" +
                    '<input type="number" min="1" max="10" value="' + item.cantidad + '" ' +
                    'class="input-cantidad" data-id="' + item.id + '" style="width:80px;">' +
                "</td>" +
                "<td>" + formatearCLP(item.precio * item.cantidad) + "</td>" +
                "<td><button type=\"button\" class=\"btn btn-secundario\" data-quitar=\"" + item.id + "\">Quitar</button></td>" +
            "</tr>"
        );
    }).join("");

    cuerpoTabla.querySelectorAll(".input-cantidad").forEach(function (input) {
        input.addEventListener("change", function () {
            cambiarCantidad(input.dataset.id, Number(input.value));
        });
    });

    cuerpoTabla.querySelectorAll("[data-quitar]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            quitarDelCarrito(boton.dataset.quitar);
        });
    });

    actualizarResumen(carrito);
}

function cambiarCantidad(id, cantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(function (p) { return p.id === id; });

    if (item) {
        item.cantidad = Math.min(10, Math.max(1, cantidad || 1));
        guardarCarrito(carrito);
        renderizarCarrito();
    }
}

function quitarDelCarrito(id) {
    const carrito = obtenerCarrito().filter(function (p) { return p.id !== id; });
    guardarCarrito(carrito);
    renderizarCarrito();
    mostrarToast("Producto eliminado del carrito.");
}

function actualizarResumen(carrito) {
    const subtotal = carrito.reduce(function (acumulado, item) {
        return acumulado + item.precio * item.cantidad;
    }, 0);

    const envio = subtotal >= 30000 || subtotal === 0 ? 0 : 3990;
    const total = subtotal + envio;

    document.getElementById("resumenSubtotal").textContent = formatearCLP(subtotal);
    document.getElementById("resumenEnvio").textContent = envio === 0 ? "Gratis" : formatearCLP(envio);
    document.getElementById("resumenTotal").textContent = formatearCLP(total);
}

/* -------------------------------------------------------------------------
   VALIDACIONES REUTILIZABLES DEL FORMULARIO DE CHECKOUT
   ------------------------------------------------------------------------- */

function validarTexto(idCampo, idError, mensaje, minimo) {
    const campo = document.getElementById(idCampo);
    const valor = campo.value.trim();

    if (valor === "" || valor.length < minimo) {
        marcar(campo, idError, mensaje);
        return false;
    }
    marcarOk(campo, idError);
    return true;
}

function validarEmailCampo(idCampo, idError) {
    const campo = document.getElementById(idCampo);
    const valor = campo.value.trim();

    if (valor === "" || !valor.includes("@") || !valor.includes(".")) {
        marcar(campo, idError, "Ingresa un correo electrónico válido.");
        return false;
    }
    marcarOk(campo, idError);
    return true;
}

function validarTelefono(idCampo, idError) {
    const campo = document.getElementById(idCampo);
    const soloNumeros = campo.value.replace(/\D/g, "");

    if (soloNumeros.length < 8) {
        marcar(campo, idError, "Ingresa un teléfono válido (mínimo 8 dígitos).");
        return false;
    }
    marcarOk(campo, idError);
    return true;
}

function validarFecha(idCampo, idError) {
    const campo = document.getElementById(idCampo);

    if (campo.value === "") {
        marcar(campo, idError, "Selecciona una fecha de entrega.");
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaElegida = new Date(campo.value + "T00:00:00");

    if (fechaElegida < hoy) {
        marcar(campo, idError, "La fecha no puede ser anterior a hoy.");
        return false;
    }

    marcarOk(campo, idError);
    return true;
}

function validarSelect(idCampo, idError, mensaje) {
    const campo = document.getElementById(idCampo);

    if (campo.value === "") {
        marcar(campo, idError, mensaje);
        return false;
    }
    marcarOk(campo, idError);
    return true;
}

function validarTerminosCheckout() {
    const campo = document.getElementById("terminosCheckout");
    const idError = "errorTerminosCheckout";

    if (!campo.checked) {
        campo.classList.add("campo-invalido");
        document.getElementById(idError).textContent = "Debes aceptar los términos de compra y despacho.";
        return false;
    }

    campo.classList.remove("campo-invalido");
    document.getElementById(idError).textContent = "";
    return true;
}

function marcar(campo, idError, mensaje) {
    campo.classList.add("campo-invalido");
    campo.classList.remove("campo-valido");
    document.getElementById(idError).textContent = mensaje;
}

function marcarOk(campo, idError) {
    campo.classList.remove("campo-invalido");
    campo.classList.add("campo-valido");
    document.getElementById(idError).textContent = "";
}
