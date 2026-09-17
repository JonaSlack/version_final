/* =========================================================================
   contacto.js
   Validación del formulario de contacto usando el evento "submit"
   (event.preventDefault + mensaje de resultado en el contexto del
   formulario), igual como se practicó en form_submit.html.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formContacto");
    if (!formulario) return;

    const nombre = document.getElementById("nombreContacto");
    const email = document.getElementById("emailContacto");
    const asunto = document.getElementById("asuntoContacto");
    const mensaje = document.getElementById("mensajeContacto");
    const resultado = document.getElementById("resultadoContacto");

    function marcarError(campo, idError, texto) {
        campo.classList.add("campo-invalido");
        campo.classList.remove("campo-valido");
        document.getElementById(idError).textContent = texto;
    }

    function marcarValido(campo, idError) {
        campo.classList.remove("campo-invalido");
        campo.classList.add("campo-valido");
        document.getElementById(idError).textContent = "";
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let valido = true;
        resultado.classList.remove("exito", "error");

        if (nombre.value.trim() === "") {
            marcarError(nombre, "errorNombreContacto", "Debes ingresar tu nombre.");
            valido = false;
        } else {
            marcarValido(nombre, "errorNombreContacto");
        }

        const correo = email.value.trim();
        if (correo === "" || !correo.includes("@") || !correo.includes(".")) {
            marcarError(email, "errorEmailContacto", "Ingresa un correo electrónico válido.");
            valido = false;
        } else {
            marcarValido(email, "errorEmailContacto");
        }

        if (asunto.value === "") {
            marcarError(asunto, "errorAsuntoContacto", "Selecciona el motivo de tu mensaje.");
            valido = false;
        } else {
            marcarValido(asunto, "errorAsuntoContacto");
        }

        const textoMensaje = mensaje.value.trim();
        if (textoMensaje === "") {
            marcarError(mensaje, "errorMensajeContacto", "Escribe tu mensaje antes de enviar.");
            valido = false;
        } else if (textoMensaje.length < 10) {
            marcarError(mensaje, "errorMensajeContacto", "Tu mensaje debe tener al menos 10 caracteres.");
            valido = false;
        } else {
            marcarValido(mensaje, "errorMensajeContacto");
        }

        resultado.style.display = "block";

        if (valido) {
            resultado.classList.add("exito");
            resultado.textContent = "✔ ¡Gracias, " + nombre.value.trim() + "! Recibimos tu mensaje y te responderemos pronto.";

            console.log("Mensaje de contacto:", {
                nombre: nombre.value.trim(),
                email: correo,
                asunto: asunto.value,
                mensaje: textoMensaje
            });

            formulario.reset();
            document.querySelectorAll("#formContacto input, #formContacto select, #formContacto textarea").forEach(function (campo) {
                campo.classList.remove("campo-valido", "campo-invalido");
            });

        } else {
            resultado.classList.add("error");
            resultado.textContent = "❌ Revisa los campos marcados antes de enviar el formulario.";
        }
    });

});
