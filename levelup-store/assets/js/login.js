
/* =========================================================================
   ELEMENTOS DEL FORMULARIO
   ========================================================================= */

const formularioLogin =
    document.getElementById("formLogin");

const inputCorreo =
    document.getElementById("correo");

const inputContrasena =
    document.getElementById("contrasena");

const errorCorreo =
    document.getElementById("errorCorreo");

const errorContrasena =
    document.getElementById("errorContrasena");

const mensajeLogin =
    document.getElementById("mensajeLogin");


/* =========================================================================
   DOMINIOS PERMITIDOS
   ========================================================================= */

const dominiosPermitidos = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
];


/* =========================================================================
   CUENTAS DE PRUEBA

   Sirven para probar posteriormente los roles del sistema administrativo.

   No reemplazan una base de datos.
   ========================================================================= */

const usuariosDemo = [

    {
        correo: "admin@duoc.cl",
        contrasena: "Admin123",
        nombre: "Administrador",
        rol: "administrador"
    },

    {
        correo: "vendedor@duoc.cl",
        contrasena: "Venta123",
        nombre: "Vendedor",
        rol: "vendedor"
    },

    {
        correo: "cliente@gmail.com",
        contrasena: "Game123",
        nombre: "Cliente",
        rol: "cliente"
    }

];


/* =========================================================================
   VALIDAR CORREO
   ========================================================================= */

function validarCorreo() {

    const correo =
        inputCorreo.value
            .trim()
            .toLowerCase();


    /* ---------------------------------------------------------
       OBLIGATORIO
       --------------------------------------------------------- */

    if (correo === "") {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo electrónico es obligatorio."
        );

        return false;

    }


    /* ---------------------------------------------------------
       MÁXIMO 100 CARACTERES
       --------------------------------------------------------- */

    if (correo.length > 100) {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "El correo no puede superar los 100 caracteres."
        );

        return false;

    }


    /* ---------------------------------------------------------
       FORMATO GENERAL DE CORREO
       --------------------------------------------------------- */

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!expresionCorreo.test(correo)) {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "Ingresa un correo electrónico válido."
        );

        return false;

    }


    /* ---------------------------------------------------------
       DOMINIOS PERMITIDOS
       --------------------------------------------------------- */

    const dominioValido =
        dominiosPermitidos.some(
            function (dominio) {

                return correo.endsWith(dominio);

            }
        );


    if (!dominioValido) {

        mostrarError(
            inputCorreo,
            errorCorreo,
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;

    }


    /* ---------------------------------------------------------
       CORRECTO
       --------------------------------------------------------- */

    limpiarError(
        inputCorreo,
        errorCorreo
    );

    return true;

}


/* =========================================================================
   VALIDAR CONTRASEÑA
   ========================================================================= */

function validarContrasena() {

    const contrasena =
        inputContrasena.value;


    /* ---------------------------------------------------------
       OBLIGATORIA
       --------------------------------------------------------- */

    if (contrasena === "") {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña es obligatoria."
        );

        return false;

    }


    /* ---------------------------------------------------------
       MÍNIMO 4 CARACTERES
       --------------------------------------------------------- */

    if (contrasena.length < 4) {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña debe tener al menos 4 caracteres."
        );

        return false;

    }


    /* ---------------------------------------------------------
       MÁXIMO 10 CARACTERES
       --------------------------------------------------------- */

    if (contrasena.length > 10) {

        mostrarError(
            inputContrasena,
            errorContrasena,
            "La contraseña no puede superar los 10 caracteres."
        );

        return false;

    }


    /* ---------------------------------------------------------
       CORRECTA
       --------------------------------------------------------- */

    limpiarError(
        inputContrasena,
        errorContrasena
    );

    return true;

}


/* =========================================================================
   MOSTRAR ERROR
   ========================================================================= */

function mostrarError(
    input,
    elementoError,
    mensaje
) {

    elementoError.textContent =
        mensaje;

    elementoError.style.display =
        "block";

    elementoError.style.color =
        "#ff5252";

    input.setAttribute(
        "aria-invalid",
        "true"
    );

    input.style.borderColor =
        "#ff5252";

}


/* =========================================================================
   LIMPIAR ERROR
   ========================================================================= */

function limpiarError(
    input,
    elementoError
) {

    elementoError.textContent =
        "";

    elementoError.style.display =
        "none";

    input.removeAttribute(
        "aria-invalid"
    );

    input.style.borderColor =
        "";

}


/* =========================================================================
   VALIDACIÓN EN TIEMPO REAL
   ========================================================================= */

if (inputCorreo) {

    inputCorreo.addEventListener(
        "input",
        function () {

            validarCorreo();

        }
    );

}


if (inputContrasena) {

    inputContrasena.addEventListener(
        "input",
        function () {

            validarContrasena();

        }
    );

}


/* =========================================================================
   BUSCAR USUARIOS REGISTRADOS
   ========================================================================= */

function obtenerUsuariosRegistrados() {

    const datos =
        localStorage.getItem(
            "levelupUsuarios"
        );


    if (!datos) {

        return [];

    }


    try {

        return JSON.parse(datos);

    }

    catch (error) {

        console.error(
            "Error al cargar usuarios:",
            error
        );

        return [];

    }

}


/* =========================================================================
   BUSCAR USUARIO
   ========================================================================= */

function buscarUsuario(
    correo,
    contrasena
) {


    /* ---------------------------------------------------------
       PRIMERO BUSCAR CUENTAS DEMO
       --------------------------------------------------------- */

    const usuarioDemo =
        usuariosDemo.find(
            function (usuario) {

                return (
                    usuario.correo.toLowerCase() ===
                    correo.toLowerCase()
                    &&
                    usuario.contrasena ===
                    contrasena
                );

            }
        );


    if (usuarioDemo) {

        return usuarioDemo;

    }


    /* ---------------------------------------------------------
       BUSCAR USUARIOS REGISTRADOS
       --------------------------------------------------------- */

    const usuariosRegistrados =
        obtenerUsuariosRegistrados();


    const usuarioRegistrado =
        usuariosRegistrados.find(
            function (usuario) {

                return (
                    usuario.correo.toLowerCase() ===
                    correo.toLowerCase()
                    &&
                    usuario.contrasena ===
                    contrasena
                );

            }
        );


    return usuarioRegistrado || null;

}


/* =========================================================================
   GUARDAR SESIÓN
   ========================================================================= */

function guardarSesion(usuario) {

    const sesion = {

        correo:
            usuario.correo,

        nombre:
            usuario.nombre || "Usuario",

        rol:
            usuario.rol || "cliente",

        fechaInicio:
            new Date().toISOString()

    };


    localStorage.setItem(
        "levelupSesion",
        JSON.stringify(sesion)
    );

}


/* =========================================================================
   MOSTRAR MENSAJE GENERAL
   ========================================================================= */

function mostrarMensaje(
    mensaje,
    tipo
) {

    if (!mensajeLogin) {

        return;

    }


    mensajeLogin.textContent =
        mensaje;


    mensajeLogin.style.padding =
        "12px";

    mensajeLogin.style.borderRadius =
        "8px";


    if (tipo === "correcto") {

        mensajeLogin.style.background =
            "rgba(46, 204, 113, 0.12)";

        mensajeLogin.style.color =
            "#2ecc71";

        mensajeLogin.style.border =
            "1px solid #2ecc71";

    }

    else {

        mensajeLogin.style.background =
            "rgba(255, 82, 82, 0.12)";

        mensajeLogin.style.color =
            "#ff5252";

        mensajeLogin.style.border =
            "1px solid #ff5252";

    }

}


/* =========================================================================
   ENVIAR FORMULARIO
   ========================================================================= */

if (formularioLogin) {

    formularioLogin.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            /* ---------------------------------------------------------
               VALIDAR CAMPOS
               --------------------------------------------------------- */

            const correoCorrecto =
                validarCorreo();

            const contrasenaCorrecta =
                validarContrasena();


            /* ---------------------------------------------------------
               SI EXISTE ALGÚN ERROR
               --------------------------------------------------------- */

            if (
                !correoCorrecto ||
                !contrasenaCorrecta
            ) {

                mostrarMensaje(
                    "Revisa los campos marcados antes de continuar.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------------------
               OBTENER DATOS
               --------------------------------------------------------- */

            const correo =
                inputCorreo.value
                    .trim()
                    .toLowerCase();

            const contrasena =
                inputContrasena.value;


            /* ---------------------------------------------------------
               BUSCAR USUARIO
               --------------------------------------------------------- */

            const usuario =
                buscarUsuario(
                    correo,
                    contrasena
                );


            /* ---------------------------------------------------------
               USUARIO NO ENCONTRADO
               --------------------------------------------------------- */

            if (!usuario) {

                mostrarMensaje(
                    "El correo o la contraseña no coinciden con una cuenta registrada.",
                    "error"
                );

                return;

            }


            /* ---------------------------------------------------------
               GUARDAR SESIÓN
               --------------------------------------------------------- */

            guardarSesion(usuario);


            /* ---------------------------------------------------------
               MENSAJE CORRECTO
               --------------------------------------------------------- */

            mostrarMensaje(
                "Inicio de sesión correcto. Redirigiendo...",
                "correcto"
            );


            /* ---------------------------------------------------------
               REDIRECCIÓN SEGÚN ROL
               --------------------------------------------------------- */

            setTimeout(
                function () {


                    if (
                        usuario.rol ===
                        "administrador"
                    ) {

                        window.location.href =
                            "admin.html";

                    }


                    else if (
                        usuario.rol ===
                        "vendedor"
                    ) {

                        window.location.href =
                            "admin.html";

                    }


                    else {

                        window.location.href =
                            "index.html";

                    }

                },
                800
            );

        }
    );

}