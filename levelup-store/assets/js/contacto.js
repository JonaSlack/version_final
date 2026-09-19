const formContacto = document.getElementById("formContacto");

const inputNombreContacto = document.getElementById("nombre");
const inputCorreoContacto = document.getElementById("correo");
const inputComentario = document.getElementById("comentario");

const errorNombreContacto = document.getElementById("errorNombre");
const errorCorreoContacto = document.getElementById("errorCorreo");
const errorComentario = document.getElementById("errorComentario");

const mensajeContacto = document.getElementById("mensajeContacto");
const contadorCaracteres = document.getElementById("contadorCaracteres");

const DOMINIOS_PERMITIDOS_CONTACTO = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
];

function mostrarErrorContacto(input, elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";

    input.classList.add("campo-invalido");
    input.classList.remove("campo-valido");

    input.setAttribute("aria-invalid", "true");
}

function limpiarErrorContacto(input, elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";

    input.classList.remove("campo-invalido");
    input.classList.add("campo-valido");

    input.removeAttribute("aria-invalid");
}

function validarNombreContacto() {
    const nombre = inputNombreContacto.value.trim();

    if (nombre === "") {
        mostrarErrorContacto(
            inputNombreContacto,
            errorNombreContacto,
            "El nombre es obligatorio."
        );

        return false;
    }

    if (nombre.length > 100) {
        mostrarErrorContacto(
            inputNombreContacto,
            errorNombreContacto,
            "El nombre no puede superar los 100 caracteres."
        );

        return false;
    }

    limpiarErrorContacto(
        inputNombreContacto,
        errorNombreContacto
    );

    return true;
}

function validarCorreoContacto() {
    const correo = inputCorreoContacto.value
        .trim()
        .toLowerCase();

    if (correo === "") {
        limpiarErrorContacto(
            inputCorreoContacto,
            errorCorreoContacto
        );

        return true;
    }

    if (correo.length > 100) {
        mostrarErrorContacto(
            inputCorreoContacto,
            errorCorreoContacto,
            "El correo no puede superar los 100 caracteres."
        );

        return false;
    }

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
        mostrarErrorContacto(
            inputCorreoContacto,
            errorCorreoContacto,
            "Ingresa un correo electrónico válido."
        );

        return false;
    }

    const dominioValido =
        DOMINIOS_PERMITIDOS_CONTACTO.some(
            function (dominio) {
                return correo.endsWith(dominio);
            }
        );

    if (!dominioValido) {
        mostrarErrorContacto(
            inputCorreoContacto,
            errorCorreoContacto,
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;
    }

    limpiarErrorContacto(
        inputCorreoContacto,
        errorCorreoContacto
    );

    return true;
}

function validarComentario() {
    const comentario =
        inputComentario.value.trim();

    if (comentario === "") {
        mostrarErrorContacto(
            inputComentario,
            errorComentario,
            "El comentario es obligatorio."
        );

        return false;
    }

    if (comentario.length > 500) {
        mostrarErrorContacto(
            inputComentario,
            errorComentario,
            "El comentario no puede superar los 500 caracteres."
        );

        return false;
    }

    limpiarErrorContacto(
        inputComentario,
        errorComentario
    );

    return true;
}

function actualizarContador() {
    const cantidad =
        inputComentario.value.length;

    contadorCaracteres.textContent =
        cantidad;
}

function mostrarMensajeContacto(
    mensaje,
    tipo
) {
    mensajeContacto.textContent = mensaje;

    mensajeContacto.style.padding = "12px";
    mensajeContacto.style.borderRadius = "8px";

    if (tipo === "correcto") {
        mensajeContacto.style.color =
            "#2ecc71";

        mensajeContacto.style.border =
            "1px solid #2ecc71";

        mensajeContacto.style.background =
            "rgba(46,204,113,.12)";
    } else {
        mensajeContacto.style.color =
            "#ff5252";

        mensajeContacto.style.border =
            "1px solid #ff5252";

        mensajeContacto.style.background =
            "rgba(255,82,82,.12)";
    }
}

function guardarMensajeContacto() {
    const mensajes =
        JSON.parse(
            localStorage.getItem(
                "levelupMensajes"
            )
        ) || [];

    const mensaje = {
        nombre:
            inputNombreContacto.value.trim(),

        correo:
            inputCorreoContacto.value
                .trim()
                .toLowerCase(),

        comentario:
            inputComentario.value.trim(),

        fecha:
            new Date().toISOString()
    };

    mensajes.push(mensaje);

    localStorage.setItem(
        "levelupMensajes",
        JSON.stringify(mensajes)
    );
}

inputNombreContacto.addEventListener(
    "input",
    validarNombreContacto
);

inputCorreoContacto.addEventListener(
    "input",
    validarCorreoContacto
);

inputComentario.addEventListener(
    "input",
    function () {
        actualizarContador();
        validarComentario();
    }
);

formContacto.addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        const nombreCorrecto =
            validarNombreContacto();

        const correoCorrecto =
            validarCorreoContacto();

        const comentarioCorrecto =
            validarComentario();

        if (
            !nombreCorrecto ||
            !correoCorrecto ||
            !comentarioCorrecto
        ) {
            mostrarMensajeContacto(
                "Revisa los campos marcados antes de enviar.",
                "error"
            );

            return;
        }

        guardarMensajeContacto();

        mostrarMensajeContacto(
            "Mensaje enviado correctamente.",
            "correcto"
        );

        formContacto.reset();

        contadorCaracteres.textContent = "0";

        document
            .querySelectorAll(
                "#formContacto input, #formContacto textarea"
            )
            .forEach(
                function (campo) {
                    campo.classList.remove(
                        "campo-valido",
                        "campo-invalido"
                    );
                }
            );
    }
);