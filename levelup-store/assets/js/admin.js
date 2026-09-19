const formProducto =
    document.getElementById("formProducto");

const productoIndice =
    document.getElementById("productoIndice");

const productoCodigo =
    document.getElementById("productoCodigo");

const productoNombre =
    document.getElementById("productoNombre");

const productoDescripcion =
    document.getElementById("productoDescripcion");

const productoPrecio =
    document.getElementById("productoPrecio");

const productoStock =
    document.getElementById("productoStock");

const productoCategoria =
    document.getElementById("productoCategoria");

const errorProductoCodigo =
    document.getElementById("errorProductoCodigo");

const errorProductoNombre =
    document.getElementById("errorProductoNombre");

const errorProductoPrecio =
    document.getElementById("errorProductoPrecio");

const errorProductoStock =
    document.getElementById("errorProductoStock");

const mensajeProducto =
    document.getElementById("mensajeProducto");

const tablaProductos =
    document.getElementById("tablaProductos");

const tablaUsuarios =
    document.getElementById("tablaUsuarios");

const btnCancelarProducto =
    document.getElementById("btnCancelarProducto");

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");

const adminBienvenida =
    document.getElementById("adminBienvenida");


function obtenerSesion() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "levelupSesion"
            )
        );

    } catch (error) {

        return null;
    }
}


function verificarAcceso() {

    const sesion =
        obtenerSesion();

    if (!sesion) {

        window.location.href =
            "login.html";

        return false;
    }

    if (
        sesion.rol !== "administrador" &&
        sesion.rol !== "vendedor"
    ) {

        window.location.href =
            "index.html";

        return false;
    }

    if (adminBienvenida) {

        adminBienvenida.textContent =
            "Sesión iniciada como " +
            (sesion.nombre || sesion.correo) +
            " (" +
            sesion.rol +
            ").";
    }

    return true;
}


function obtenerProductos() {

    try {

        const productos =
            JSON.parse(
                localStorage.getItem(
                    "levelupProductos"
                )
            ) || [];

        return Array.isArray(productos)
            ? productos
            : [];

    } catch (error) {

        return [];
    }
}


function guardarProductos(productos) {

    localStorage.setItem(
        "levelupProductos",
        JSON.stringify(productos)
    );
}


function obtenerUsuarios() {

    try {

        const usuarios =
            JSON.parse(
                localStorage.getItem(
                    "levelupUsuarios"
                )
            ) || [];

        return Array.isArray(usuarios)
            ? usuarios
            : [];

    } catch (error) {

        return [];
    }
}


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "levelupUsuarios",
        JSON.stringify(usuarios)
    );
}


function mostrarError(
    input,
    elemento,
    mensaje
) {

    if (!input || !elemento) {
        return;
    }

    elemento.textContent =
        mensaje;

    elemento.style.display =
        "block";

    input.classList.add(
        "campo-invalido"
    );

    input.classList.remove(
        "campo-valido"
    );

    input.setAttribute(
        "aria-invalid",
        "true"
    );
}


function limpiarError(
    input,
    elemento
) {

    if (!input || !elemento) {
        return;
    }

    elemento.textContent =
        "";

    elemento.style.display =
        "none";

    input.classList.remove(
        "campo-invalido"
    );

    input.classList.add(
        "campo-valido"
    );

    input.removeAttribute(
        "aria-invalid"
    );
}


function validarCodigo() {

    const codigo =
        productoCodigo.value.trim();

    if (codigo === "") {

        mostrarError(
            productoCodigo,
            errorProductoCodigo,
            "El código es obligatorio."
        );

        return false;
    }

    if (codigo.length > 20) {

        mostrarError(
            productoCodigo,
            errorProductoCodigo,
            "El código no puede superar los 20 caracteres."
        );

        return false;
    }

    const formatoCodigo =
        /^[A-Za-z0-9_-]+$/;

    if (!formatoCodigo.test(codigo)) {

        mostrarError(
            productoCodigo,
            errorProductoCodigo,
            "Usa solo letras, números, guion o guion bajo."
        );

        return false;
    }

    limpiarError(
        productoCodigo,
        errorProductoCodigo
    );

    return true;
}


function validarNombreProducto() {

    const nombre =
        productoNombre.value.trim();

    if (nombre === "") {

        mostrarError(
            productoNombre,
            errorProductoNombre,
            "El nombre del producto es obligatorio."
        );

        return false;
    }

    if (nombre.length > 100) {

        mostrarError(
            productoNombre,
            errorProductoNombre,
            "El nombre no puede superar los 100 caracteres."
        );

        return false;
    }

    limpiarError(
        productoNombre,
        errorProductoNombre
    );

    return true;
}


function validarPrecio() {

    const precio =
        Number(
            productoPrecio.value
        );

    if (
        productoPrecio.value.trim() === ""
    ) {

        mostrarError(
            productoPrecio,
            errorProductoPrecio,
            "El precio es obligatorio."
        );

        return false;
    }

    if (
        !Number.isFinite(precio) ||
        precio < 0
    ) {

        mostrarError(
            productoPrecio,
            errorProductoPrecio,
            "Ingresa un precio válido."
        );

        return false;
    }

    limpiarError(
        productoPrecio,
        errorProductoPrecio
    );

    return true;
}


function validarStock() {

    const stock =
        Number(
            productoStock.value
        );

    if (
        productoStock.value.trim() === ""
    ) {

        mostrarError(
            productoStock,
            errorProductoStock,
            "El stock es obligatorio."
        );

        return false;
    }

    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        mostrarError(
            productoStock,
            errorProductoStock,
            "El stock debe ser un número entero igual o mayor que 0."
        );

        return false;
    }

    limpiarError(
        productoStock,
        errorProductoStock
    );

    return true;
}


function validarCategoria() {

    if (
        productoCategoria.value === ""
    ) {

        mostrarMensajeProducto(
            "Selecciona una categoría.",
            "error"
        );

        productoCategoria.classList.add(
            "campo-invalido"
        );

        return false;
    }

    productoCategoria.classList.remove(
        "campo-invalido"
    );

    productoCategoria.classList.add(
        "campo-valido"
    );

    return true;
}


function mostrarMensajeProducto(
    mensaje,
    tipo
) {

    if (!mensajeProducto) {
        return;
    }

    mensajeProducto.textContent =
        mensaje;

    mensajeProducto.style.padding =
        "12px";

    mensajeProducto.style.marginBottom =
        "16px";

    mensajeProducto.style.borderRadius =
        "8px";

    if (tipo === "correcto") {

        mensajeProducto.style.color =
            "#2ecc71";

        mensajeProducto.style.border =
            "1px solid #2ecc71";

        mensajeProducto.style.background =
            "rgba(46,204,113,.12)";

    } else {

        mensajeProducto.style.color =
            "#ff5252";

        mensajeProducto.style.border =
            "1px solid #ff5252";

        mensajeProducto.style.background =
            "rgba(255,82,82,.12)";
    }
}


function limpiarMensajeProducto() {

    if (!mensajeProducto) {
        return;
    }

    mensajeProducto.textContent =
        "";

    mensajeProducto.removeAttribute(
        "style"
    );
}


function limpiarFormularioProducto() {

    if (!formProducto) {
        return;
    }

    formProducto.reset();

    productoIndice.value =
        "";

    if (btnCancelarProducto) {

        btnCancelarProducto.style.display =
            "none";
    }

    document
        .querySelectorAll(
            "#formProducto input, " +
            "#formProducto select, " +
            "#formProducto textarea"
        )
        .forEach(
            function (campo) {

                campo.classList.remove(
                    "campo-valido",
                    "campo-invalido"
                );

                campo.removeAttribute(
                    "aria-invalid"
                );
            }
        );

    [
        errorProductoCodigo,
        errorProductoNombre,
        errorProductoPrecio,
        errorProductoStock
    ].forEach(
        function (error) {

            if (error) {
                error.textContent = "";
                error.style.display =
                    "none";
            }
        }
    );
}


function formatoPrecio(precio) {

    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(
        Number(precio) || 0
    );
}


function mostrarProductos() {

    if (!tablaProductos) {
        return;
    }

    const productos =
        obtenerProductos();

    tablaProductos.innerHTML =
        "";

    if (productos.length === 0) {

        tablaProductos.innerHTML =
            "<tr>" +
                "<td colspan='6'>" +
                    "No hay productos creados." +
                "</td>" +
            "</tr>";

        return;
    }

    productos.forEach(
        function (producto, indice) {

            const fila =
                document.createElement(
                    "tr"
                );

            const celdaCodigo =
                document.createElement(
                    "td"
                );

            const celdaNombre =
                document.createElement(
                    "td"
                );

            const celdaPrecio =
                document.createElement(
                    "td"
                );

            const celdaStock =
                document.createElement(
                    "td"
                );

            const celdaCategoria =
                document.createElement(
                    "td"
                );

            const celdaAcciones =
                document.createElement(
                    "td"
                );

            celdaCodigo.textContent =
                producto.codigo || "-";

            celdaNombre.textContent =
                producto.nombre || "-";

            celdaPrecio.textContent =
                formatoPrecio(
                    producto.precio
                );

            celdaStock.textContent =
                String(
                    producto.stock ?? 0
                );

            celdaCategoria.textContent =
                producto.categoria || "-";

            const botonEditar =
                document.createElement(
                    "button"
                );

            botonEditar.type =
                "button";

            botonEditar.className =
                "btn btn-secundario";

            botonEditar.textContent =
                "Editar";

            botonEditar.addEventListener(
                "click",
                function () {

                    editarProducto(
                        indice
                    );
                }
            );

            const botonEliminar =
                document.createElement(
                    "button"
                );

            botonEliminar.type =
                "button";

            botonEliminar.className =
                "btn btn-secundario";

            botonEliminar.textContent =
                "Eliminar";

            botonEliminar.style.marginLeft =
                "6px";

            botonEliminar.addEventListener(
                "click",
                function () {

                    eliminarProducto(
                        indice
                    );
                }
            );

            celdaAcciones.appendChild(
                botonEditar
            );

            celdaAcciones.appendChild(
                botonEliminar
            );

            fila.appendChild(
                celdaCodigo
            );

            fila.appendChild(
                celdaNombre
            );

            fila.appendChild(
                celdaPrecio
            );

            fila.appendChild(
                celdaStock
            );

            fila.appendChild(
                celdaCategoria
            );

            fila.appendChild(
                celdaAcciones
            );

            tablaProductos.appendChild(
                fila
            );
        }
    );
}


function editarProducto(indice) {

    const productos =
        obtenerProductos();

    const producto =
        productos[indice];

    if (!producto) {
        return;
    }

    productoIndice.value =
        indice;

    productoCodigo.value =
        producto.codigo || "";

    productoNombre.value =
        producto.nombre || "";

    productoDescripcion.value =
        producto.descripcion || "";

    productoPrecio.value =
        producto.precio;

    productoStock.value =
        producto.stock;

    productoCategoria.value =
        producto.categoria || "";

    if (btnCancelarProducto) {

        btnCancelarProducto.style.display =
            "inline-flex";
    }

    limpiarMensajeProducto();

    const seccionProductos =
        document.getElementById(
            "productos"
        );

    if (seccionProductos) {

        seccionProductos.scrollIntoView({
            behavior: "smooth"
        });
    }
}


function eliminarProducto(indice) {

    const productos =
        obtenerProductos();

    const producto =
        productos[indice];

    if (!producto) {
        return;
    }

    const confirmar =
        window.confirm(
            "¿Deseas eliminar el producto " +
            producto.nombre +
            "?"
        );

    if (!confirmar) {
        return;
    }

    productos.splice(
        indice,
        1
    );

    guardarProductos(
        productos
    );

    mostrarProductos();

    mostrarMensajeProducto(
        "Producto eliminado correctamente.",
        "correcto"
    );
}


function codigoRepetido(
    codigo,
    indiceActual
) {

    const productos =
        obtenerProductos();

    return productos.some(
        function (
            producto,
            indice
        ) {

            return (
                String(
                    producto.codigo || ""
                ).toLowerCase() ===
                    codigo.toLowerCase() &&
                indice !== indiceActual
            );
        }
    );
}


function guardarProductoFormulario() {

    const productos =
        obtenerProductos();

    const indiceTexto =
        productoIndice.value;

    const indiceActual =
        indiceTexto === ""
            ? -1
            : Number(indiceTexto);

    const codigo =
        productoCodigo.value.trim();

    if (
        codigoRepetido(
            codigo,
            indiceActual
        )
    ) {

        mostrarError(
            productoCodigo,
            errorProductoCodigo,
            "Ya existe un producto con este código."
        );

        return;
    }

    const producto = {

        codigo:
            codigo,

        nombre:
            productoNombre.value.trim(),

        descripcion:
            productoDescripcion.value.trim(),

        precio:
            Number(
                productoPrecio.value
            ),

        stock:
            Number(
                productoStock.value
            ),

        categoria:
            productoCategoria.value
    };

    if (indiceActual === -1) {

        productos.push(
            producto
        );

        guardarProductos(
            productos
        );

        limpiarFormularioProducto();

        mostrarProductos();

        mostrarMensajeProducto(
            "Producto creado correctamente.",
            "correcto"
        );

    } else {

        if (!productos[indiceActual]) {

            mostrarMensajeProducto(
                "No se pudo encontrar el producto que intentas editar.",
                "error"
            );

            return;
        }

        productos[indiceActual] =
            producto;

        guardarProductos(
            productos
        );

        limpiarFormularioProducto();

        mostrarProductos();

        mostrarMensajeProducto(
            "Producto actualizado correctamente.",
            "correcto"
        );
    }
}


function mostrarUsuarios() {

    if (!tablaUsuarios) {
        return;
    }

    const usuarios =
        obtenerUsuarios();

    tablaUsuarios.innerHTML =
        "";

    if (usuarios.length === 0) {

        tablaUsuarios.innerHTML =
            "<tr>" +
                "<td colspan='7'>" +
                    "No hay usuarios registrados." +
                "</td>" +
            "</tr>";

        return;
    }

    usuarios.forEach(
        function (usuario, indice) {

            const fila =
                document.createElement(
                    "tr"
                );

            const nombreCompleto =
                (
                    (usuario.nombre || "") +
                    " " +
                    (usuario.apellidos || "")
                ).trim();

            const datos = [
                usuario.run || "-",
                nombreCompleto || "-",
                usuario.correo || "-",
                usuario.region || "-",
                usuario.comuna || "-",
                usuario.rol || "cliente"
            ];

            datos.forEach(
                function (dato) {

                    const celda =
                        document.createElement(
                            "td"
                        );

                    celda.textContent =
                        dato;

                    fila.appendChild(
                        celda
                    );
                }
            );

            const celdaAcciones =
                document.createElement(
                    "td"
                );

            const botonEliminar =
                document.createElement(
                    "button"
                );

            botonEliminar.type =
                "button";

            botonEliminar.className =
                "btn btn-secundario";

            botonEliminar.textContent =
                "Eliminar";

            botonEliminar.addEventListener(
                "click",
                function () {

                    eliminarUsuario(
                        indice
                    );
                }
            );

            celdaAcciones.appendChild(
                botonEliminar
            );

            fila.appendChild(
                celdaAcciones
            );

            tablaUsuarios.appendChild(
                fila
            );
        }
    );
}


function eliminarUsuario(indice) {

    const usuarios =
        obtenerUsuarios();

    const usuario =
        usuarios[indice];

    if (!usuario) {
        return;
    }

    const confirmar =
        window.confirm(
            "¿Deseas eliminar al usuario " +
            usuario.correo +
            "?"
        );

    if (!confirmar) {
        return;
    }

    usuarios.splice(
        indice,
        1
    );

    guardarUsuarios(
        usuarios
    );

    mostrarUsuarios();
}


if (productoCodigo) {

    productoCodigo.addEventListener(
        "input",
        validarCodigo
    );
}


if (productoNombre) {

    productoNombre.addEventListener(
        "input",
        validarNombreProducto
    );
}


if (productoPrecio) {

    productoPrecio.addEventListener(
        "input",
        validarPrecio
    );
}


if (productoStock) {

    productoStock.addEventListener(
        "input",
        validarStock
    );
}


if (productoCategoria) {

    productoCategoria.addEventListener(
        "change",
        validarCategoria
    );
}


if (formProducto) {

    formProducto.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            const codigoCorrecto =
                validarCodigo();

            const nombreCorrecto =
                validarNombreProducto();

            const precioCorrecto =
                validarPrecio();

            const stockCorrecto =
                validarStock();

            const categoriaCorrecta =
                validarCategoria();

            if (
                !codigoCorrecto ||
                !nombreCorrecto ||
                !precioCorrecto ||
                !stockCorrecto ||
                !categoriaCorrecta
            ) {

                mostrarMensajeProducto(
                    "Revisa los campos marcados.",
                    "error"
                );

                return;
            }

            guardarProductoFormulario();
        }
    );
}


if (btnCancelarProducto) {

    btnCancelarProducto.addEventListener(
        "click",
        function () {

            limpiarFormularioProducto();
            limpiarMensajeProducto();
        }
    );
}


if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "levelupSesion"
            );

            window.location.href =
                "login.html";
        }
    );
}


if (verificarAcceso()) {

    mostrarProductos();
    mostrarUsuarios();
}