/* =========================================================================
   catalogo.js
   Lógica de la página catalogo.html:
     - Renderiza las tarjetas de juego (<article>) a partir de datos-juegos.js
     - Filtra por plataforma mediante botones (evento "click")
     - Busca por título con sugerencias nativas (<datalist>)
   ========================================================================= */

let filtroActivo = "todos";
let terminoBusqueda = "";

document.addEventListener("DOMContentLoaded", function () {

    llenarSugerencias();
    renderizarJuegos();

    // -----------------------------------------------------------
    // FILTROS POR PLATAFORMA / OFERTA
    // -----------------------------------------------------------
    const botonesFiltro = document.querySelectorAll(".filtro-btn");

    botonesFiltro.forEach(function (boton) {
        boton.addEventListener("click", function () {

            botonesFiltro.forEach(function (b) {
                b.setAttribute("aria-pressed", "false");
            });

            boton.setAttribute("aria-pressed", "true");
            filtroActivo = boton.dataset.filtro;

            renderizarJuegos();
        });
    });

    // -----------------------------------------------------------
    // BUSCADOR CON SUGERENCIAS
    // -----------------------------------------------------------
    const inputBuscar = document.getElementById("buscadorJuegos");
    const btnLimpiar = document.getElementById("btnLimpiarBusqueda");

    if (inputBuscar) {
        inputBuscar.addEventListener("input", function () {
            terminoBusqueda = inputBuscar.value.trim().toLowerCase();
            renderizarJuegos();
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", function () {
            inputBuscar.value = "";
            terminoBusqueda = "";
            renderizarJuegos();
        });
    }

});

/**
 * Llena el <datalist> con todos los títulos del catálogo para que el
 * navegador ofrezca sugerencias de autocompletado mientras el usuario
 * escribe en el buscador (requisito: "autocompletar, sugerencias").
 */
function llenarSugerencias() {
    const datalist = document.getElementById("sugerenciasJuegos");
    if (!datalist) return;

    datalist.innerHTML = CATALOGO_JUEGOS.map(function (juego) {
        return '<option value="' + juego.titulo + '"></option>';
    }).join("");
}

/**
 * Aplica el filtro de plataforma/oferta y el término de búsqueda actual
 * sobre el catálogo completo y devuelve el resultado.
 */
function obtenerJuegosFiltrados() {
    return CATALOGO_JUEGOS.filter(function (juego) {

        let cumplePlataforma = true;

        if (filtroActivo === "ps5") {
            cumplePlataforma = juego.plataforma === "ps5" || juego.plataforma === "ambas";
        } else if (filtroActivo === "pc") {
            cumplePlataforma = juego.plataforma === "pc" || juego.plataforma === "ambas";
        } else if (filtroActivo === "oferta") {
            cumplePlataforma = Boolean(juego.precioAnterior);
        }

        const cumpleBusqueda =
            terminoBusqueda === "" ||
            juego.titulo.toLowerCase().includes(terminoBusqueda);

        return cumplePlataforma && cumpleBusqueda;
    });
}

/**
 * Dibuja las tarjetas de juego dentro de #grillaJuegos según el filtro
 * y la búsqueda activos. Cada tarjeta es un <article> semántico.
 */
function renderizarJuegos() {
    const contenedor = document.getElementById("grillaJuegos");
    const mensajeVacio = document.getElementById("sinResultados");
    const contador = document.getElementById("contadorResultados");

    if (!contenedor) return;

    const resultados = obtenerJuegosFiltrados();

    contador.textContent = resultados.length + " juego(s) encontrado(s).";
    mensajeVacio.style.display = resultados.length === 0 ? "block" : "none";

    contenedor.innerHTML = resultados.map(function (juego) {

        const etiquetaPlataforma =
            juego.plataforma === "ambas"
                ? '<span class="badge badge-ps5">PS5</span><span class="badge badge-pc">PC</span>'
                : juego.plataforma === "ps5"
                    ? '<span class="badge badge-ps5">PS5</span>'
                    : '<span class="badge badge-pc">PC</span>';

        const precioAnterior = juego.precioAnterior
            ? '<span class="anterior">' + formatearCLP(juego.precioAnterior) + '</span>'
            : "";

        return (
            '<article class="tarjeta-juego">' +
                '<div class="portada ' + juego.tema + '">' +
                    '<div class="etiquetas">' + etiquetaPlataforma + '</div>' +
                    '<span class="icono">' + juego.icono + '</span>' +
                '</div>' +
                '<div class="cuerpo">' +
                    '<h3>' + juego.titulo + '</h3>' +
                    '<p class="genero">' + capitalizar(juego.genero) + '</p>' +
                    '<div class="precio">' +
                        '<span class="actual">' + formatearCLP(juego.precio) + '</span>' +
                        precioAnterior +
                    '</div>' +
                    '<div class="acciones">' +
                        '<a href="producto.html?id=' + juego.id + '" class="btn btn-secundario">Ver detalle</a>' +
                        '<button type="button" class="btn btn-primario" data-agregar="' + juego.id + '">Agregar</button>' +
                    '</div>' +
                '</div>' +
            '</article>'
        );
    }).join("");

    // Vuelve a conectar los botones "Agregar" recién creados con el carrito
    contenedor.querySelectorAll("[data-agregar]").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const juego = buscarJuegoPorId(boton.dataset.agregar);
            if (juego) {
                agregarAlCarrito(juego);
            }
        });
    });
}

function capitalizar(texto) {
    const palabra = texto.replace("-", " ");
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
