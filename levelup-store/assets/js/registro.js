/* =========================================================================
   registro.js
   Validación completa del formulario "Crear cuenta" (registro.html).
   Cumple los requerimientos del documento RequerimientosFormulario.txt:
     1. El select "Plataforma preferida" no puede quedar en la opción por
        defecto ("Seleccione una plataforma").
     2. El select "Nivel de experiencia" no puede quedar en la opción por
        defecto ("Seleccione nivel").
     3. La contraseña debe tener mínimo 8 caracteres.
     4. La confirmación de contraseña debe coincidir con la contraseña.
   Además valida nombre, correo, edad y aceptación de términos, mostrando
   siempre un mensaje de error específico junto al campo correspondiente.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formRegistro");
    if (!formulario) return;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const edad = document.getElementById("edad");
    const plataforma = document.getElementById("plataforma");
    const genero = document.getElementById("genero");
    const nivel = document.getElementById("nivel");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");
    const terminos = document.getElementById("terminos");
    const resultado = document.getElementById("resultadoRegistro");
    const barraFuerza = document.getElementById("barraFuerza");

    // -----------------------------------------------------------
    // FUNCIONES AUXILIARES DE UI
    // -----------------------------------------------------------

    function mostrarError(campo, idError, mensaje) {
        campo.classList.add("campo-invalido");
        campo.classList.remove("campo-valido");
        document.getElementById(idError).textContent = mensaje;
        return false;
    }

    function mostrarCorrecto(campo, idError) {
        campo.classList.remove("campo-invalido");
        campo.classList.add("campo-valido");
        document.getElementById(idError).textContent = "";
        return true;
    }

    // -----------------------------------------------------------
    // VALIDACIONES INDIVIDUALES
    // -----------------------------------------------------------

    function validarNombre() {
        const valor = nombre.value.trim();

        if (valor === "") {
            return mostrarError(nombre, "errorNombre", "Debes ingresar tu nombre completo.");
        }
        if (valor.length < 3) {
            return mostrarError(nombre, "errorNombre", "El nombre debe tener al menos 3 caracteres.");
        }
        return mostrarCorrecto(nombre, "errorNombre");
    }

    function validarEmail() {
        const valor = email.value.trim();

        if (valor === "") {
            return mostrarError(email, "errorEmail", "Debes ingresar tu correo electrónico.");
        }
        if (!valor.includes("@") || !valor.includes(".")) {
            return mostrarError(email, "errorEmail", "Ingresa un correo válido (ejemplo: nombre@dominio.com).");
        }
        return mostrarCorrecto(email, "errorEmail");
    }

    function validarEdad() {
        const valor = edad.value;

        if (valor === "") {
            return mostrarError(edad, "errorEdad", "Debes ingresar tu edad.");
        }
        if (Number(valor) < 13) {
            return mostrarError(edad, "errorEdad", "Debes tener al menos 13 años para crear una cuenta.");
        }
        if (Number(valor) > 99) {
            return mostrarError(edad, "errorEdad", "Ingresa una edad válida.");
        }
        return mostrarCorrecto(edad, "errorEdad");
    }

    // Requerimiento 1: el <select> de plataforma no puede quedar vacío.
    function validarPlataforma() {
        if (plataforma.value === "") {
            return mostrarError(plataforma, "errorPlataforma", "Selecciona tu plataforma preferida.");
        }
        return mostrarCorrecto(plataforma, "errorPlataforma");
    }

    function validarGenero() {
        if (genero.value === "") {
            return mostrarError(genero, "errorGenero", "Selecciona tu género favorito.");
        }
        return mostrarCorrecto(genero, "errorGenero");
    }

    // Requerimiento 2: el <select> de nivel no puede quedar vacío.
    function validarNivel() {
        if (nivel.value === "") {
            return mostrarError(nivel, "errorNivel", "Selecciona tu nivel de experiencia.");
        }
        return mostrarCorrecto(nivel, "errorNivel");
    }

    // Requerimiento 3: contraseña de al menos 8 caracteres.
    function validarPassword() {
        const valor = password.value;

        actualizarMedidorFuerza(valor);

        if (valor === "") {
            return mostrarError(password, "errorPassword", "Debes ingresar una contraseña.");
        }
        if (valor.length < 8) {
            return mostrarError(password, "errorPassword", "La contraseña debe tener mínimo 8 caracteres.");
        }
        return mostrarCorrecto(password, "errorPassword");
    }

    // Requerimiento 4: ambas contraseñas deben coincidir.
    function validarConfirmacion() {
        if (confirmarPassword.value === "") {
            return mostrarError(confirmarPassword, "errorConfirmar", "Debes confirmar tu contraseña.");
        }
        if (confirmarPassword.value !== password.value) {
            return mostrarError(confirmarPassword, "errorConfirmar", "Las contraseñas no coinciden.");
        }
        return mostrarCorrecto(confirmarPassword, "errorConfirmar");
    }

    function validarTerminos() {
        const errorTerminos = document.getElementById("errorTerminos");

        if (!terminos.checked) {
            terminos.classList.add("campo-invalido");
            errorTerminos.textContent = "Debes aceptar los términos y la política de privacidad.";
            return false;
        }
        terminos.classList.remove("campo-invalido");
        errorTerminos.textContent = "";
        return true;
    }

    // Medidor visual de fortaleza de contraseña (mejora de experiencia,
    // no es parte estricta del requerimiento pero refuerza IE1.2.1/IE1.2.2).
    function actualizarMedidorFuerza(valor) {
        let puntaje = 0;
        if (valor.length >= 8) puntaje++;
        if (/[A-Z]/.test(valor)) puntaje++;
        if (/[0-9]/.test(valor)) puntaje++;
        if (/[^A-Za-z0-9]/.test(valor)) puntaje++;

        const porcentajes = [0, 25, 55, 80, 100];
        const colores = ["#f43f5e", "#f43f5e", "#f59e0b", "#22d3ee", "#22c55e"];

        barraFuerza.style.width = porcentajes[puntaje] + "%";
        barraFuerza.style.background = colores[puntaje];
    }

    // -----------------------------------------------------------
    // EVENTOS EN TIEMPO REAL (input / change)
    // -----------------------------------------------------------
    nombre.addEventListener("input", validarNombre);
    email.addEventListener("input", validarEmail);
    edad.addEventListener("input", validarEdad);
    password.addEventListener("input", validarPassword);
    confirmarPassword.addEventListener("input", validarConfirmacion);

    plataforma.addEventListener("change", validarPlataforma);
    genero.addEventListener("change", validarGenero);
    nivel.addEventListener("change", validarNivel);
    terminos.addEventListener("change", validarTerminos);

    // -----------------------------------------------------------
    // EVENTO SUBMIT: valida todo antes de "enviar"
    // -----------------------------------------------------------
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const todoValido = [
            validarNombre(),
            validarEmail(),
            validarEdad(),
            validarPlataforma(),
            validarGenero(),
            validarNivel(),
            validarPassword(),
            validarConfirmacion(),
            validarTerminos()
        ].every(Boolean);

        resultado.classList.remove("exito", "error");

        if (todoValido) {
            resultado.classList.add("exito");
            resultado.textContent = "✔ ¡Cuenta creada correctamente! Bienvenido/a a LevelUp Store, " + nombre.value.trim() + ".";
            resultado.style.display = "block";

            console.log("Nuevo registro:", {
                nombre: nombre.value.trim(),
                email: email.value.trim(),
                edad: edad.value,
                plataforma: plataforma.value,
                genero: genero.value,
                nivel: nivel.value
            });

            formulario.reset();
            document.querySelectorAll("#formRegistro input, #formRegistro select").forEach(function (campo) {
                campo.classList.remove("campo-valido", "campo-invalido");
            });
            barraFuerza.style.width = "0%";

        } else {
            resultado.classList.add("error");
            resultado.textContent = "❌ Revisa los campos marcados en rojo antes de continuar.";
            resultado.style.display = "block";
        }
    });

    // -----------------------------------------------------------
    // BOTÓN LIMPIAR
    // -----------------------------------------------------------
    document.getElementById("btnLimpiarRegistro").addEventListener("click", function () {
        setTimeout(function () {
            document.querySelectorAll("#formRegistro input, #formRegistro select").forEach(function (campo) {
                campo.classList.remove("campo-valido", "campo-invalido");
            });
            document.querySelectorAll("#formRegistro .mensaje-error").forEach(function (p) {
                p.textContent = "";
            });
            resultado.style.display = "none";
            barraFuerza.style.width = "0%";
        }, 0);
    });

});
