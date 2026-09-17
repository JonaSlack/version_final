/* =========================================================================
   CATALOGO.JS
   =========================================================================

   Este archivo:

   1. Carga los juegos desde datos-juegos.js
   2. Genera las tarjetas del catálogo
   3. Muestra las imágenes de cada juego
   4. Permite filtrar por plataforma
   5. Permite buscar juegos
   6. Permite agregar juegos al carrito

   ========================================================================= */


/* -------------------------------------------------------------------------
   VARIABLES
   ------------------------------------------------------------------------- */

let filtroActivo = "todos";

let terminoBusqueda = "";


/* -------------------------------------------------------------------------
   CUANDO CARGA LA PÁGINA
   ------------------------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        llenarSugerencias();

        renderizarJuegos();


        /* =============================================================
           FILTROS
           ============================================================= */

        const botonesFiltro =
            document.querySelectorAll(".filtro-btn");


        botonesFiltro.forEach(
            function (boton) {

                boton.addEventListener(
                    "click",
                    function () {


                        /* Quitamos selección de todos */

                        botonesFiltro.forEach(
                            function (b) {

                                b.setAttribute(
                                    "aria-pressed",
                                    "false"
                                );

                            }
                        );


                        /* Activamos el botón seleccionado */

                        boton.setAttribute(
                            "aria-pressed",
                            "true"
                        );


                        /* Guardamos el filtro */

                        filtroActivo =
                            boton.dataset.filtro;


                        /* Volvemos a dibujar */

                        renderizarJuegos();

                    }
                );

            }
        );


        /* =============================================================
           BUSCADOR
           ============================================================= */

        const inputBuscar =
            document.getElementById(
                "buscadorJuegos"
            );


        const btnLimpiar =
            document.getElementById(
                "btnLimpiarBusqueda"
            );


        if (inputBuscar) {

            inputBuscar.addEventListener(
                "input",
                function () {

                    terminoBusqueda =
                        inputBuscar.value
                            .trim()
                            .toLowerCase();

                    renderizarJuegos();

                }
            );

        }


        /* =============================================================
           LIMPIAR BUSCADOR
           ============================================================= */

        if (btnLimpiar) {

            btnLimpiar.addEventListener(
                "click",
                function () {

                    inputBuscar.value = "";

                    terminoBusqueda = "";

                    renderizarJuegos();

                    inputBuscar.focus();

                }
            );

        }

    }
);


/* =========================================================================
   SUGERENCIAS DEL BUSCADOR
   ========================================================================= */

function llenarSugerencias() {

    const datalist =
        document.getElementById(
            "sugerenciasJuegos"
        );


    if (!datalist) {

        return;

    }


    datalist.innerHTML =
        CATALOGO_JUEGOS
            .map(
                function (juego) {

                    return (
                        '<option value="' +
                        juego.titulo +
                        '"></option>'
                    );

                }
            )
            .join("");

}


/* =========================================================================
   FILTRAR LOS JUEGOS
   ========================================================================= */

function obtenerJuegosFiltrados() {

    return CATALOGO_JUEGOS.filter(
        function (juego) {


            /* ---------------------------------------------------------
               FILTRO DE PLATAFORMA
               --------------------------------------------------------- */

            let cumplePlataforma = true;


            if (filtroActivo === "ps5") {

                cumplePlataforma =

                    juego.plataforma === "ps5" ||

                    juego.plataforma === "ambas";

            }


            else if (filtroActivo === "pc") {

                cumplePlataforma =

                    juego.plataforma === "pc" ||

                    juego.plataforma === "ambas";

            }


            else if (filtroActivo === "oferta") {

                cumplePlataforma =
                    Boolean(
                        juego.precioAnterior
                    );

            }


            /* ---------------------------------------------------------
               BUSCADOR
               --------------------------------------------------------- */

            const cumpleBusqueda =

                terminoBusqueda === "" ||

                juego.titulo
                    .toLowerCase()
                    .includes(
                        terminoBusqueda
                    );


            return (

                cumplePlataforma &&

                cumpleBusqueda

            );

        }
    );

}


/* =========================================================================
   MOSTRAR LOS JUEGOS
   ========================================================================= */

function renderizarJuegos() {


    const contenedor =
        document.getElementById(
            "grillaJuegos"
        );


    const mensajeVacio =
        document.getElementById(
            "sinResultados"
        );


    const contador =
        document.getElementById(
            "contadorResultados"
        );


    if (!contenedor) {

        return;

    }


    const resultados =
        obtenerJuegosFiltrados();


    /* -----------------------------------------------------------------
       CONTADOR
       ----------------------------------------------------------------- */

    if (contador) {

        contador.textContent =

            resultados.length +

            " juego(s) encontrado(s).";

    }


    /* -----------------------------------------------------------------
       MENSAJE SIN RESULTADOS
       ----------------------------------------------------------------- */

    if (mensajeVacio) {

        mensajeVacio.style.display =

            resultados.length === 0

                ? "block"

                : "none";

    }


    /* -----------------------------------------------------------------
       CREAR TODAS LAS TARJETAS
       ----------------------------------------------------------------- */

    contenedor.innerHTML =

        resultados
            .map(
                function (juego) {


                    /* =================================================
                       BADGES DE PLATAFORMA
                       ================================================= */

                    let etiquetaPlataforma = "";


                    if (
                        juego.plataforma === "ambas"
                    ) {

                        etiquetaPlataforma =

                            '<span class="badge badge-ps5">' +
                            'PS5' +
                            '</span>' +

                            '<span class="badge badge-pc">' +
                            'PC' +
                            '</span>';

                    }


                    else if (
                        juego.plataforma === "ps5"
                    ) {

                        etiquetaPlataforma =

                            '<span class="badge badge-ps5">' +
                            'PS5' +
                            '</span>';

                    }


                    else {

                        etiquetaPlataforma =

                            '<span class="badge badge-pc">' +
                            'PC' +
                            '</span>';

                    }


                    /* =================================================
                       PRECIO ANTERIOR
                       ================================================= */

                    let precioAnterior = "";


                    if (
                        juego.precioAnterior
                    ) {

                        precioAnterior =

                            '<span class="anterior">' +

                            formatearCLP(
                                juego.precioAnterior
                            ) +

                            '</span>';

                    }


                    /* =================================================
                       IMAGEN
                       AQUÍ ESTABA EL PROBLEMA
                       ================================================= */

                    let imagenJuego = "";


                    if (juego.imagen) {

                        imagenJuego =

                            '<img ' +

                            'src="' +
                            juego.imagen +
                            '" ' +

                            'alt="Portada de ' +
                            juego.titulo +
                            '" ' +

                            'loading="lazy" ' +

                            'onerror="this.style.display=\'none\'">' ;

                    }


                    /* =================================================
                       TARJETA DEL JUEGO
                       ================================================= */

                    return (

                        '<article class="tarjeta-juego">' +


                            /* -----------------------------------------
                               PORTADA
                               ----------------------------------------- */

                            '<div class="portada ' +
                            juego.tema +
                            '">' +


                                /* IMAGEN */

                                imagenJuego +


                                /* BADGES */

                                '<div class="etiquetas">' +

                                    etiquetaPlataforma +

                                '</div>' +


                                /* ICONO DE RESPALDO */

                                '<span class="icono">' +

                                    juego.icono +

                                '</span>' +


                            '</div>' +


                            /* -----------------------------------------
                               INFORMACIÓN
                               ----------------------------------------- */

                            '<div class="cuerpo">' +


                                /* TÍTULO */

                                '<h3>' +

                                    juego.titulo +

                                '</h3>' +


                                /* GÉNERO */

                                '<p class="genero">' +

                                    capitalizar(
                                        juego.genero
                                    ) +

                                '</p>' +


                                /* PRECIO */

                                '<div class="precio">' +


                                    '<span class="actual">' +

                                        formatearCLP(
                                            juego.precio
                                        ) +

                                    '</span>' +


                                    precioAnterior +


                                '</div>' +


                                /* BOTONES */

                                '<div class="acciones">' +


                                    '<a ' +

                                        'href="producto.html?id=' +
                                        juego.id +
                                        '" ' +

                                        'class="btn btn-secundario">' +

                                        'Ver detalle' +

                                    '</a>' +


                                    '<button ' +

                                        'type="button" ' +

                                        'class="btn btn-primario" ' +

                                        'data-agregar="' +
                                        juego.id +
                                        '">' +

                                        'Agregar' +

                                    '</button>' +


                                '</div>' +


                            '</div>' +


                        '</article>'

                    );

                }
            )
            .join("");


    /* =================================================================
       CONECTAR BOTONES AGREGAR
       ================================================================= */

    contenedor
        .querySelectorAll(
            "[data-agregar]"
        )
        .forEach(
            function (boton) {

                boton.addEventListener(
                    "click",
                    function () {

                        const juego =
                            buscarJuegoPorId(
                                boton.dataset.agregar
                            );


                        if (juego) {

                            agregarAlCarrito(
                                juego
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================================
   CAPITALIZAR TEXTO
   ========================================================================= */

function capitalizar(texto) {

    const palabra =
        texto.replace(
            "-",
            " "
        );


    return (

        palabra
            .charAt(0)
            .toUpperCase()

        +

        palabra.slice(1)

    );

}
