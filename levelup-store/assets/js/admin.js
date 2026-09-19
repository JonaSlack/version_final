const formProducto = document.getElementById("formProducto");
const productoIndice = document.getElementById("productoIndice");
const productoCodigo = document.getElementById("productoCodigo");
const productoNombre = document.getElementById("productoNombre");
const productoDescripcion = document.getElementById("productoDescripcion");
const productoPrecio = document.getElementById("productoPrecio");
const productoStock = document.getElementById("productoStock");
const productoCategoria = document.getElementById("productoCategoria");

const errorProductoCodigo = document.getElementById("errorProductoCodigo");
const errorProductoNombre = document.getElementById("errorProductoNombre");
const errorProductoPrecio = document.getElementById("errorProductoPrecio");
const errorProductoStock = document.getElementById("errorProductoStock");

const mensajeProducto = document.getElementById("mensajeProducto");
const tablaProductos = document.getElementById("tablaProductos");
const tablaUsuarios = document.getElementById("tablaUsuarios");

const btnCancelarProducto = document.getElementById("btnCancelarProducto");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const adminBienvenida = document.getElementById("adminBienvenida");

function obtenerSesion() {
    try {
        return JSON.parse(
            localStorage.getItem("levelupSesion")
        );
    } catch (error) {
        return null;
    }
}

function verificarAcceso() {
    const sesion = obtenerSesion();

    if (!sesion) {
        window.location.href = "login.html";
        return false;
    }

    if (
        sesion.rol !== "administrador" &&
        sesion.rol !== "vendedor"
    ) {
        window.location.href = "index.html";
        return false;
    }

    if (adminBienvenida) {
        adminBienvenida.textContent =
            "Sesión iniciada como " +
            sesion.nombre +
            " (" +
            sesion.rol +
            ").";
    }

    return true;
}

function obtenerProductos() {
    try {
        return JSON.parse(
            localStorage.getItem("levelupProductos")
        ) || [];
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
        return JSON.parse(
            localStorage.getItem("levelupUsuarios")
        ) || [];
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

function mostrarError(input, elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";

    input.classList.add("campo-invalido");
    input.classList.remove("campo-valido");

    input.setAttribute("aria-invalid", "true");
}

function limpiarError(input, elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";

    input.classList.remove("campo-invalido");
    input.classList.add("campo-valido");

    input.removeAttribute("aria-invalid");
}

function validarCodigo() {
    const codigo = productoCodigo.value.trim();

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

    limpiarError(
        productoCodigo,
        errorProductoCodigo
    );

    return true;
}

function validarNombreProducto() {
    const nombre = productoNombre.value.trim();

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
    const precio = Number(productoPrecio.value);

    if (productoPrecio.value === "") {
        mostrarError(
            productoPrecio,
            errorProductoPrecio,
            "El precio es obligatorio."
        );

        return false;
    }

    if (precio < 0) {
        mostrarError(
            productoPrecio,
            errorProductoPrecio,
            "El precio no puede ser negativo."
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
    const stock = Number(productoStock.value);

    if (productoStock.value === "") {
        mostrarError(
            productoStock,
            errorProductoStock,
            "El stock es obligatorio."
        );

        return false;
    }

    if (stock < 0) {
        mostrarError(
            productoStock,
            errorProductoStock,
            "El stock no puede ser negativo."
        );

        return false;
    }

    limpiarError(
        productoStock,
        errorProductoStock
    );

    return true;
}

function mostrarMensajeProducto(mensaje, tipo) {
    mensajeProducto.textContent = mensaje;
    mensajeProducto.style.padding = "12px";
    mensajeProducto.style.marginBottom = "16px";
    mensajeProducto.style.borderRadius = "8px";

    if (tipo === "correcto") {
        mensajeProducto.style.color = "#2ecc71";
        mensajeProducto.style.border = "1px solid #2ecc71";
        mensajeProducto.style.background =
            "rgba(46,204,113,.12)";
    } else {
        mensajeProducto.style.color = "#ff5252";
        mensajeProducto.style.border = "1px solid #ff5252";
        mensajeProducto.style.background =
            "rgba(255,82,82,.12)";
    }
}

function limpiarFormularioProducto() {
    formProducto.reset();

    productoIndice.value = "";

    btnCancelarProducto.style.display = "none";

    document
        .querySelectorAll("#formProducto input, #formProducto select")
        .forEach(function (campo) {
            campo.classList.remove(
                "campo-valido",
                "campo-invalido"
            );
        });
}

function formatoPrecio(precio) {
    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }
    ).format(precio);
}

function mostrarProductos() {
    const productos = obtenerProductos();

    tablaProductos.innerHTML = "";

    if (productos.length === 0) {
        tablaProductos.innerHTML = `
            <tr>
                <td colspan="6">
                    No hay productos creados.
                </td>
            </tr>
        `;

        return;
    }

    productos.forEach(function (producto, indice) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${formatoPrecio(producto.precio)}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
            <td>
                <button
                    type="button"
                    class="btn btn-secundario"
                    onclick="editarProducto(${indice})">
                    Editar
                </button>

                <button
                    type="button"
                    class="btn btn-secundario"
                    onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        tablaProductos.appendChild(fila);
    });
}

function editarProducto(indice) {
    const productos = obtenerProductos();
    const producto = productos[indice];

    if (!producto) {
        return;
    }

    productoIndice.value = indice;
    productoCodigo.value = producto.codigo;
    productoNombre.value = producto.nombre;
    productoDescripcion.value =
        producto.descripcion || "";
    productoPrecio.value = producto.precio;
    productoStock.value = producto.stock;
    productoCategoria.value =
        producto.categoria || "";

    btnCancelarProducto.style.display =
        "inline-flex";

    document
        .getElementById("productos")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function eliminarProducto(indice) {
    const productos = obtenerProductos();
    const producto = productos[indice];

    if (!producto) {
        return;
    }

    const confirmar = window.confirm(
        "¿Deseas eliminar el producto " +
        producto.nombre +
        "?"
    );

    if (!confirmar) {
        return;
    }

    productos.splice(indice, 1);

    guardarProductos(productos);
    mostrarProductos();

    mostrarMensajeProducto(
        "Producto eliminado correctamente.",
        "correcto"
    );
}

function codigoRepetido(codigo, indiceActual) {
    const productos = obtenerProductos();

    return productos.some(
        function (producto, indice) {
            return (
                producto.codigo.toLowerCase() ===
                    codigo.toLowerCase() &&
                indice !== indiceActual
            );
        }
    );
}

function guardarProductoFormulario() {
    const productos = obtenerProductos();

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
        codigo: codigo,
        nombre: productoNombre.value.trim(),
        descripcion:
            productoDescripcion.value.trim(),
        precio: Number(productoPrecio.value),
        stock: Number(productoStock.value),
        categoria: productoCategoria.value
    };

    if (indiceActual === -1) {
        productos.push(producto);

        mostrarMensajeProducto(
            "Producto creado correctamente.",
            "correcto"
        );
    } else {
        productos[indiceActual] = producto;

        mostrarMensajeProducto(
            "Producto actualizado correctamente.",
            "correcto"
        );
    }

    guardarProductos(productos);
    limpiarFormularioProducto();
    mostrarProductos();
}

function mostrarUsuarios() {
    const usuarios = obtenerUsuarios();

    tablaUsuarios.innerHTML = "";

    if (usuarios.length === 0) {
        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="7">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }

    usuarios.forEach(function (usuario, indice) {
        const fila = document.createElement("tr");

        const nombreCompleto =
            (
                (usuario.nombre || "") +
                " " +
                (usuario.apellidos || "")
            ).trim();

        fila.innerHTML = `
            <td>${usuario.run || "-"}</td>
            <td>${nombreCompleto || "-"}</td>
            <td>${usuario.correo || "-"}</td>
            <td>${usuario.region || "-"}</td>
            <td>${usuario.comuna || "-"}</td>
            <td>${usuario.rol || "cliente"}</td>
            <td>
                <button
                    type="button"
                    class="btn btn-secundario"
                    onclick="eliminarUsuario(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        tablaUsuarios.appendChild(fila);
    });
}

function eliminarUsuario(indice) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios[indice];

    if (!usuario) {
        return;
    }

    const confirmar = window.confirm(
        "¿Deseas eliminar al usuario " +
        usuario.correo +
        "?"
    );

    if (!confirmar) {
        return;
    }

    usuarios.splice(indice, 1);

    guardarUsuarios(usuarios);
    mostrarUsuarios();
}

productoCodigo.addEventListener(
    "input",
    validarCodigo
);

productoNombre.addEventListener(
    "input",
    validarNombreProducto
);

productoPrecio.addEventListener(
    "input",
    validarPrecio
);

productoStock.addEventListener(
    "input",
    validarStock
);

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

        if (
            !codigoCorrecto ||
            !nombreCorrecto ||
            !precioCorrecto ||
            !stockCorrecto
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

btnCancelarProducto.addEventListener(
    "click",
    function () {
        limpiarFormularioProducto();

        mensajeProducto.textContent = "";
        mensajeProducto.removeAttribute("style");
    }
);

btnCerrarSesion.addEventListener(
    "click",
    function () {
        localStorage.removeItem("levelupSesion");

        window.location.href =
            "login.html";
    }
);

if (verificarAcceso()) {
    mostrarProductos();
    mostrarUsuarios();
}