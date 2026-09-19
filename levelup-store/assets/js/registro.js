const formRegistro = document.getElementById("formRegistro");

const inputRun = document.getElementById("run");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputCorreoRegistro = document.getElementById("correo");
const inputFecha = document.getElementById("fechaNacimiento");
const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");
const inputDireccion = document.getElementById("direccion");
const inputContrasenaRegistro = document.getElementById("contrasena");
const inputConfirmar = document.getElementById("confirmarContrasena");

const mensajeRegistro = document.getElementById("mensajeRegistro");

const errorRun = document.getElementById("errorRun");
const errorNombre = document.getElementById("errorNombre");
const errorApellidos = document.getElementById("errorApellidos");
const errorCorreoRegistro = document.getElementById("errorCorreo");
const errorRegion = document.getElementById("errorRegion");
const errorComuna = document.getElementById("errorComuna");
const errorDireccion = document.getElementById("errorDireccion");
const errorContrasenaRegistro = document.getElementById("errorContrasena");
const errorConfirmar = document.getElementById("errorConfirmar");

const DOMINIOS_PERMITIDOS_REGISTRO = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
];

function mostrarErrorRegistro(input, elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";

    input.classList.add("campo-invalido");
    input.classList.remove("campo-valido");

    input.setAttribute("aria-invalid", "true");
}

function limpiarErrorRegistro(input, elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";

    input.classList.remove("campo-invalido");
    input.classList.add("campo-valido");

    input.removeAttribute("aria-invalid");
}

function runValido(run) {
    run = run
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/-/g, "");

    if (!/^[0-9]{6,8}[0-9K]$/.test(run)) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = 11 - (suma % 11);

    let dvCalculado;

    if (resto === 11) {
        dvCalculado = "0";
    } else if (resto === 10) {
        dvCalculado = "K";
    } else {
        dvCalculado = String(resto);
    }

    return dvIngresado === dvCalculado;
}

function validarRun() {
    const run = inputRun.value
        .trim()
        .toUpperCase();

    if (run === "") {
        mostrarErrorRegistro(
            inputRun,
            errorRun,
            "El RUN es obligatorio."
        );

        return false;
    }

    if (run.includes(".") || run.includes("-")) {
        mostrarErrorRegistro(
            inputRun,
            errorRun,
            "Ingresa el RUN sin puntos ni guion."
        );

        return false;
    }

    if (run.length < 7 || run.length > 9) {
        mostrarErrorRegistro(
            inputRun,
            errorRun,
            "El RUN debe tener entre 7 y 9 caracteres."
        );

        return false;
    }

    if (!runValido(run)) {
        mostrarErrorRegistro(
            inputRun,
            errorRun,
            "El RUN ingresado no es válido."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputRun,
        errorRun
    );

    return true;
}

function validarNombre() {
    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        mostrarErrorRegistro(
            inputNombre,
            errorNombre,
            "El nombre es obligatorio."
        );

        return false;
    }

    if (nombre.length > 50) {
        mostrarErrorRegistro(
            inputNombre,
            errorNombre,
            "El nombre no puede superar los 50 caracteres."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputNombre,
        errorNombre
    );

    return true;
}

function validarApellidos() {
    const apellidos = inputApellidos.value.trim();

    if (apellidos === "") {
        mostrarErrorRegistro(
            inputApellidos,
            errorApellidos,
            "Los apellidos son obligatorios."
        );

        return false;
    }

    if (apellidos.length > 100) {
        mostrarErrorRegistro(
            inputApellidos,
            errorApellidos,
            "Los apellidos no pueden superar los 100 caracteres."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputApellidos,
        errorApellidos
    );

    return true;
}

function validarCorreoRegistro() {
    const correo = inputCorreoRegistro.value
        .trim()
        .toLowerCase();

    if (correo === "") {
        mostrarErrorRegistro(
            inputCorreoRegistro,
            errorCorreoRegistro,
            "El correo es obligatorio."
        );

        return false;
    }

    if (correo.length > 100) {
        mostrarErrorRegistro(
            inputCorreoRegistro,
            errorCorreoRegistro,
            "El correo no puede superar los 100 caracteres."
        );

        return false;
    }

    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresion.test(correo)) {
        mostrarErrorRegistro(
            inputCorreoRegistro,
            errorCorreoRegistro,
            "Ingresa un correo electrónico válido."
        );

        return false;
    }

    const dominioValido =
        DOMINIOS_PERMITIDOS_REGISTRO.some(
            function (dominio) {
                return correo.endsWith(dominio);
            }
        );

    if (!dominioValido) {
        mostrarErrorRegistro(
            inputCorreoRegistro,
            errorCorreoRegistro,
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputCorreoRegistro,
        errorCorreoRegistro
    );

    return true;
}

function validarRegion() {
    if (selectRegion.value === "") {
        mostrarErrorRegistro(
            selectRegion,
            errorRegion,
            "Selecciona una región."
        );

        return false;
    }

    limpiarErrorRegistro(
        selectRegion,
        errorRegion
    );

    return true;
}

function validarComuna() {
    if (selectComuna.value === "") {
        mostrarErrorRegistro(
            selectComuna,
            errorComuna,
            "Selecciona una comuna."
        );

        return false;
    }

    limpiarErrorRegistro(
        selectComuna,
        errorComuna
    );

    return true;
}

function validarDireccion() {
    const direccion = inputDireccion.value.trim();

    if (direccion === "") {
        mostrarErrorRegistro(
            inputDireccion,
            errorDireccion,
            "La dirección es obligatoria."
        );

        return false;
    }

    if (direccion.length > 300) {
        mostrarErrorRegistro(
            inputDireccion,
            errorDireccion,
            "La dirección no puede superar los 300 caracteres."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputDireccion,
        errorDireccion
    );

    return true;
}

function validarContrasenaRegistro() {
    const contrasena = inputContrasenaRegistro.value;

    if (contrasena === "") {
        mostrarErrorRegistro(
            inputContrasenaRegistro,
            errorContrasenaRegistro,
            "La contraseña es obligatoria."
        );

        return false;
    }

    if (
        contrasena.length < 4 ||
        contrasena.length > 10
    ) {
        mostrarErrorRegistro(
            inputContrasenaRegistro,
            errorContrasenaRegistro,
            "La contraseña debe tener entre 4 y 10 caracteres."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputContrasenaRegistro,
        errorContrasenaRegistro
    );

    return true;
}

function validarConfirmacion() {
    if (inputConfirmar.value === "") {
        mostrarErrorRegistro(
            inputConfirmar,
            errorConfirmar,
            "Debes confirmar la contraseña."
        );

        return false;
    }

    if (
        inputConfirmar.value !==
        inputContrasenaRegistro.value
    ) {
        mostrarErrorRegistro(
            inputConfirmar,
            errorConfirmar,
            "Las contraseñas no coinciden."
        );

        return false;
    }

    limpiarErrorRegistro(
        inputConfirmar,
        errorConfirmar
    );

    return true;
}

function cargarRegiones() {
    REGIONES_COMUNAS.forEach(
        function (item, indice) {
            const option =
                document.createElement("option");

            option.value = indice;
            option.textContent = item.region;

            selectRegion.appendChild(option);
        }
    );
}

function cargarComunas() {
    selectComuna.innerHTML =
        '<option value="">Selecciona una comuna</option>';

    if (selectRegion.value === "") {
        selectComuna.disabled = true;
        return;
    }

    const indice =
        Number(selectRegion.value);

    const region =
        REGIONES_COMUNAS[indice];

    region.comunas.forEach(
        function (comuna) {
            const option =
                document.createElement("option");

            option.value = comuna;
            option.textContent = comuna;

            selectComuna.appendChild(option);
        }
    );

    selectComuna.disabled = false;
}

function obtenerUsuariosRegistro() {
    const datos =
        localStorage.getItem("levelupUsuarios");

    if (!datos) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
}

function correoYaRegistrado(correo) {
    const usuarios =
        obtenerUsuariosRegistro();

    return usuarios.some(
        function (usuario) {
            return (
                usuario.correo.toLowerCase() ===
                correo.toLowerCase()
            );
        }
    );
}

function runYaRegistrado(run) {
    const usuarios =
        obtenerUsuariosRegistro();

    return usuarios.some(
        function (usuario) {
            return usuario.run === run;
        }
    );
}

function guardarUsuario() {
    const usuarios =
        obtenerUsuariosRegistro();

    const indiceRegion =
        Number(selectRegion.value);

    const usuario = {
        run:
            inputRun.value
                .trim()
                .toUpperCase(),

        nombre:
            inputNombre.value.trim(),

        apellidos:
            inputApellidos.value.trim(),

        correo:
            inputCorreoRegistro.value
                .trim()
                .toLowerCase(),

        fechaNacimiento:
            inputFecha.value,

        region:
            REGIONES_COMUNAS[indiceRegion].region,

        comuna:
            selectComuna.value,

        direccion:
            inputDireccion.value.trim(),

        contrasena:
            inputContrasenaRegistro.value,

        rol:
            "cliente"
    };

    usuarios.push(usuario);

    localStorage.setItem(
        "levelupUsuarios",
        JSON.stringify(usuarios)
    );
}

function mostrarMensajeRegistro(mensaje, tipo) {
    mensajeRegistro.textContent = mensaje;

    mensajeRegistro.style.padding = "12px";
    mensajeRegistro.style.borderRadius = "8px";

    if (tipo === "correcto") {
        mensajeRegistro.style.color = "#2ecc71";
        mensajeRegistro.style.border = "1px solid #2ecc71";
        mensajeRegistro.style.background = "rgba(46,204,113,.12)";
    } else {
        mensajeRegistro.style.color = "#ff5252";
        mensajeRegistro.style.border = "1px solid #ff5252";
        mensajeRegistro.style.background = "rgba(255,82,82,.12)";
    }
}

inputRun.addEventListener(
    "input",
    validarRun
);

inputNombre.addEventListener(
    "input",
    validarNombre
);

inputApellidos.addEventListener(
    "input",
    validarApellidos
);

inputCorreoRegistro.addEventListener(
    "input",
    validarCorreoRegistro
);

inputDireccion.addEventListener(
    "input",
    validarDireccion
);

inputContrasenaRegistro.addEventListener(
    "input",
    function () {
        validarContrasenaRegistro();

        if (inputConfirmar.value !== "") {
            validarConfirmacion();
        }
    }
);

inputConfirmar.addEventListener(
    "input",
    validarConfirmacion
);

selectRegion.addEventListener(
    "change",
    function () {
        cargarComunas();
        validarRegion();
    }
);

selectComuna.addEventListener(
    "change",
    validarComuna
);

cargarRegiones();

formRegistro.addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        const runCorrecto =
            validarRun();

        const nombreCorrecto =
            validarNombre();

        const apellidosCorrectos =
            validarApellidos();

        const correoCorrecto =
            validarCorreoRegistro();

        const regionCorrecta =
            validarRegion();

        const comunaCorrecta =
            validarComuna();

        const direccionCorrecta =
            validarDireccion();

        const contrasenaCorrecta =
            validarContrasenaRegistro();

        const confirmacionCorrecta =
            validarConfirmacion();

        if (
            !runCorrecto ||
            !nombreCorrecto ||
            !apellidosCorrectos ||
            !correoCorrecto ||
            !regionCorrecta ||
            !comunaCorrecta ||
            !direccionCorrecta ||
            !contrasenaCorrecta ||
            !confirmacionCorrecta
        ) {
            mostrarMensajeRegistro(
                "Revisa los campos marcados antes de continuar.",
                "error"
            );

            return;
        }

        const correo =
            inputCorreoRegistro.value
                .trim()
                .toLowerCase();

        const run =
            inputRun.value
                .trim()
                .toUpperCase();

        if (correoYaRegistrado(correo)) {
            mostrarErrorRegistro(
                inputCorreoRegistro,
                errorCorreoRegistro,
                "Este correo ya se encuentra registrado."
            );

            return;
        }

        if (runYaRegistrado(run)) {
            mostrarErrorRegistro(
                inputRun,
                errorRun,
                "Este RUN ya se encuentra registrado."
            );

            return;
        }

        guardarUsuario();

        mostrarMensajeRegistro(
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
            "correcto"
        );

        formRegistro.reset();

        document
            .querySelectorAll("#formRegistro input, #formRegistro select")
            .forEach(
                function (campo) {
                    campo.classList.remove(
                        "campo-valido",
                        "campo-invalido"
                    );
                }
            );

        selectComuna.innerHTML =
            '<option value="">Primero selecciona una región</option>';

        selectComuna.disabled = true;

        setTimeout(
            function () {
                window.location.href =
                    "login.html";
            },
            1500
        );
    }
);