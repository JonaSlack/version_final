let filtroActivo = "todos";
let terminoBusqueda = "";

document.addEventListener(
    "DOMContentLoaded",
    function () {
        llenarSugerencias();
        renderizarJuegos();

        const botonesFiltro =
            document.querySelectorAll(".filtro-btn");

        botonesFiltro.forEach(
            function (boton) {
                boton.addEventListener(
                    "click",
                    function () {
                        botonesFiltro.forEach(
                            function (b) {
                                b.setAttribute(
                                    "aria-pressed",
                                    "false"
                                );
                            }
                        );

                        boton.setAttribute(
                            "aria-pressed",
                            "true"
                        );

                        filtroActivo =
                            boton.dataset.filtro;

                        renderizarJuegos();
                    }
                );
            }
        );

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

        if (btnLimpiar && inputBuscar) {
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

function llenarSugerencias() {
    const datalist =
        document.getElementById(
            "sugerenciasJuegos"
        );

    if (!datalist) {
        return;
    }

    datalist.innerHTML =
        obtenerCatalogoCompleto()
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

function obtenerJuegosFiltrados() {
    return obtenerCatalogoCompleto().filter(
        function (juego) {
            let cumplePlataforma = true;

            if (filtroActivo === "ps5") {
                cumplePlataforma =
                    juego.plataforma === "ps5" ||
                    juego.plataforma === "ambas";
            } else if (filtroActivo === "pc") {
                cumplePlataforma =
                    juego.plataforma === "pc" ||
                    juego.plataforma === "ambas";
            } else if (filtroActivo === "oferta") {
                cumplePlataforma =
                    Boolean(
                        juego.precioAnterior
                    );
            }

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

function obtenerEtiquetaPlataforma(juego) {
    if (juego.plataforma === "ambas") {
        return (
            '<span class="badge badge-ps5">' +
            'PS5' +
            '</span>' +
            '<span class="badge badge-pc">' +
            'PC' +
            '</span>'
        );
    }

    if (juego.plataforma === "ps5") {
        return (
            '<span class="badge badge-ps5">' +
            'PS5' +
            '</span>'
        );
    }

    if (juego.plataforma === "pc") {
        return (
            '<span class="badge badge-pc">' +
            'PC' +
            '</span>'
        );
    }

    return (
        '<span class="badge">' +
        'Producto' +
        '</span>'
    );
}

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

    if (contador) {
        contador.textContent =
            resultados.length +
            " producto(s) encontrado(s).";
    }

    if (mensajeVacio) {
        mensajeVacio.style.display =
            resultados.length === 0
                ? "block"
                : "none";
    }

    contenedor.innerHTML =
        resultados
            .map(
                function (juego) {
                    const etiquetaPlataforma =
                        obtenerEtiquetaPlataforma(
                            juego
                        );

                    let precioAnterior = "";

                    if (juego.precioAnterior) {
                        precioAnterior =
                            '<span class="anterior">' +
                            formatearCLP(
                                juego.precioAnterior
                            ) +
                            '</span>';
                    }

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
                            'onerror="this.style.display=\'none\'">';
                    }

                    let avisoStock = "";

                    if (
                        typeof juego.stock ===
                            "number" &&
                        juego.stock <= 0
                    ) {
                        avisoStock =
                            '<p class="genero">' +
                            'Sin stock' +
                            '</p>';
                    }

                    const botonAgregar =
                        typeof juego.stock ===
                            "number" &&
                        juego.stock <= 0
                            ? (
                                '<button ' +
                                'type="button" ' +
                                'class="btn btn-primario" ' +
                                'disabled>' +
                                'Sin stock' +
                                '</button>'
                            )
                            : (
                                '<button ' +
                                'type="button" ' +
                                'class="btn btn-primario" ' +
                                'data-agregar="' +
                                juego.id +
                                '">' +
                                'Agregar' +
                                '</button>'
                            );

                    return (
                        '<article class="tarjeta-juego">' +

                            '<div class="portada ' +
                            juego.tema +
                            '">' +

                                imagenJuego +

                                '<div class="etiquetas">' +
                                    etiquetaPlataforma +
                                '</div>' +

                                '<span class="icono">' +
                                    (juego.icono || "") +
                                '</span>' +

                            '</div>' +

                            '<div class="cuerpo">' +

                                '<h3>' +
                                    juego.titulo +
                                '</h3>' +

                                '<p class="genero">' +
                                    capitalizar(
                                        juego.genero
                                    ) +
                                '</p>' +

                                avisoStock +

                                '<div class="precio">' +

                                    '<span class="actual">' +
                                        formatearCLP(
                                            juego.precio
                                        ) +
                                    '</span>' +

                                    precioAnterior +

                                '</div>' +

                                '<div class="acciones">' +

                                    '<a ' +
                                        'href="producto.html?id=' +
                                        encodeURIComponent(
                                            juego.id
                                        ) +
                                        '" ' +
                                        'class="btn btn-secundario">' +
                                        'Ver detalle' +
                                    '</a>' +

                                    botonAgregar +

                                '</div>' +

                            '</div>' +

                        '</article>'
                    );
                }
            )
            .join("");

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

function capitalizar(texto) {
    if (!texto) {
        return "";
    }

    const palabra =
        texto.replace(
            /-/g,
            " "
        );

    return (
        palabra
            .charAt(0)
            .toUpperCase() +
        palabra.slice(1)
    );
}