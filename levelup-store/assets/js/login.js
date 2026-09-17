/* =========================================================================
   login.js
   Validación del formulario de inicio de sesión mediante un evento
   "click" sobre un botón (a diferencia de registro.js, que usa el
   evento "submit"), para demostrar ambas técnicas de manejo de eventos.

   Como el proyecto es 100% front-end (sin backend/API real), el inicio
   de sesión se simula contra una única cuenta de demostración.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const correo = document.getElementById("correoLogin");
    const clave = document.getElementById("claveLogin");
    const boton = document.getElementById("btnIniciarSesion");
    const resultado = document.getElementById("resultadoLogin");
    const mostrarClave = document.getElementById("mostrarClave");

    const CUENTA_DEMO = {
        correo: "demo@levelupstore.cl",
        clave: "Gamer2026!"
    };

    // -----------------------------------------------------------
    // MOSTRAR / OCULTAR CONTRASEÑA
    // -----------------------------------------------------------
    mostrarClave.addEventListener("change", function () {
        clave.type = mostrarClave.checked ? "text" : "password";
    });

    // -----------------------------------------------------------
    // VALIDACIÓN + "INICIO DE SESIÓN" (evento click)
    // -----------------------------------------------------------
    boton.addEventListener("click", function () {

        let esValido = true;
        resultado.classList.remove("exito", "error");
        resultado.style.display = "none";

        const valorCorreo = correo.value.trim();
        const valorClave = clave.value;

        // Validar correo
        if (valorCorreo === "") {
            marcarError(correo, "errorCorreoLogin", "Debes ingresar tu correo electrónico.");
            esValido = false;
        } else if (!valorCorreo.includes("@") || !valorCorreo.includes(".")) {
            marcarError(correo, "errorCorreoLogin", "Ingresa un correo con formato válido.");
            esValido = false;
        } else {
            limpiarError(correo, "errorCorreoLogin");
        }

        // Validar contraseña
        if (valorClave === "") {
            marcarError(clave, "errorClaveLogin", "Debes ingresar tu contraseña.");
            esValido = false;
        } else {
            limpiarError(clave, "errorClaveLogin");
        }

        if (!esValido) {
            console.log("Intento de inicio de sesión inválido: campos incompletos.");
            return;
        }

        // Verificar credenciales contra la cuenta de demostración
        if (valorCorreo === CUENTA_DEMO.correo && valorClave === CUENTA_DEMO.clave) {

            resultado.classList.add("exito");
            resultado.textContent = "✔ ¡Bienvenido/a de nuevo! Sesión iniciada correctamente.";
            resultado.style.display = "block";

            console.log("Inicio de sesión exitoso para:", valorCorreo);

        } else {

            marcarError(correo, "errorCorreoLogin", "");
            marcarError(clave, "errorClaveLogin", "Correo o contraseña incorrectos.");

            resultado.classList.add("error");
            resultado.textContent = "❌ No pudimos iniciar tu sesión. Verifica tus datos.";
            resultado.style.display = "block";

            console.log("Inicio de sesión fallido para:", valorCorreo);
        }
    });

    function marcarError(campo, idError, mensaje) {
        campo.classList.add("campo-invalido");
        campo.classList.remove("campo-valido");
        document.getElementById(idError).textContent = mensaje;
    }

    function limpiarError(campo, idError) {
        campo.classList.remove("campo-invalido");
        campo.classList.add("campo-valido");
        document.getElementById(idError).textContent = "";
    }

});
