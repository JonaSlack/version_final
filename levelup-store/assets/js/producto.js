document.addEventListener("DOMContentLoaded", function () {

    const parametros =
        new URLSearchParams(window.location.search);

    const catalogoCompleto =
        obtenerCatalogoCompleto();

    const idPredeterminado =
        catalogoCompleto.length > 0
            ? catalogoCompleto[0].id
            : "";

    const idJuego =
        parametros.get("id") ||
        idPredeterminado;

    const juego =
        buscarJuegoPorId(idJuego);

    const contenedor =
        document.getElementById("detalleProducto");

    const miga =
        document.getElementById("migaTitulo");

    if (!contenedor) {
        return;
    }

    if (!juego) {
        contenedor.innerHTML =
            "<p>No encontramos ese producto. " +
            "<a href='catalogo.html'>" +
            "Vuelve al catálogo" +
            "</a>.</p>";

        return;
    }

    document.title =
        juego.titulo +
        " | LevelUp Store";

    if (miga) {
        miga.textContent =
            juego.titulo;
    }

    const etiquetaPlataforma =
        obtenerEtiquetaProducto(juego);

    const especificaciones =
        juego.especificaciones || {};

    const filasEspecificaciones =
        Object.keys(especificaciones)
            .map(function (clave) {
                return (
                    "<li>" +
                        "<span>" +
                            clave +
                        "</span>" +
                        "<strong>" +
                            especificaciones[clave] +
                        "</strong>" +
                    "</li>"
                );
            })
            .join("");

    let imagenProducto = "";

    if (juego.imagen) {
        imagenProducto =
            '<div class="portada ' +
            (juego.tema || "") +
            '" style="height:350px;">' +

                '<img ' +
                    'src="' +
                    juego.imagen +
                    '" ' +
                    'alt="Imagen de ' +
                    juego.titulo +
                    '" ' +
                    'style="width:100%;height:100%;object-fit:cover;" ' +
                    'onerror="this.style.display=\'none\'">' +

                '<span class="icono">' +
                    (juego.icono || "") +
                '</span>' +

            '</div>';
    } else {
        imagenProducto =
            '<div class="portada ' +
            (juego.tema || "") +
            '" style="height:350px;">' +

                '<span class="icono" ' +
                    'style="font-size:5rem;">' +
                    (juego.icono || "🎮") +
                '</span>' +

            '</div>';
    }

    let precioAnterior = "";

    if (juego.precioAnterior) {
        precioAnterior =
            '<span class="anterior">' +
                formatearCLP(
                    juego.precioAnterior
                ) +
            '</span>';
    }

    const tieneStockControlado =
        typeof juego.stock === "number";

    const stockDisponible =
        tieneStockControlado
            ? juego.stock
            : 10;

    let informacionStock = "";

    if (tieneStockControlado) {
        if (stockDisponible > 0) {
            informacionStock =
                '<p class="mensaje-ok">' +
                    '✔ Stock disponible: ' +
                    stockDisponible +
                    ' unidad(es).' +
                '</p>';
        } else {
            informacionStock =
                '<p class="mensaje-error">' +
                    'Producto sin stock.' +
                '</p>';
        }
    }

    let formularioCarrito = "";

    if (stockDisponible > 0) {

        const maximoCantidad =
            tieneStockControlado
                ? Math.min(
                    stockDisponible,
                    10
                )
                : 10;

        formularioCarrito =
            '<form ' +
                'id="formAgregarCarrito" ' +
                'class="form-fila" ' +
                'style="align-items:end;">' +

                '<div ' +
                    'class="grupo-campo" ' +
                    'style="margin-bottom:0;">' +

                    '<label for="cantidadProducto">' +
                        'Cantidad' +
                    '</label>' +

                    '<input ' +
                        'type="number" ' +
                        'id="cantidadProducto" ' +
                        'name="cantidad" ' +
                        'min="1" ' +
                        'max="' +
                        maximoCantidad +
                        '" ' +
                        'value="1" ' +
                        'inputmode="numeric">' +

                '</div>' +

                '<button ' +
                    'type="submit" ' +
                    'class="btn btn-primario btn-ancho">' +
                    '🛒 Agregar al carrito' +
                '</button>' +

            '</form>' +

            '<p ' +
                'id="mensajeAgregado" ' +
                'class="mensaje-ok" ' +
                'role="status">' +
            '</p>';

    } else {

        formularioCarrito =
            '<button ' +
                'type="button" ' +
                'class="btn btn-primario btn-ancho" ' +
                'disabled>' +
                'Sin stock' +
            '</button>';
    }

    contenedor.innerHTML =
        '<div>' +

            imagenProducto +

        '</div>' +

        '<div>' +

            '<div style="margin-bottom:10px;">' +
                etiquetaPlataforma +
            '</div>' +

            '<h1>' +
                juego.titulo +
            '</h1>' +

            '<p class="subtitulo">' +
                (juego.descripcion || "") +
            '</p>' +

            '<div ' +
                'class="precio" ' +
                'style="margin-bottom:18px;">' +

                '<span ' +
                    'class="actual" ' +
                    'style="font-size:1.6rem;">' +

                    formatearCLP(
                        juego.precio
                    ) +

                '</span>' +

                precioAnterior +

            '</div>' +

            informacionStock +

            '<ul class="lista-especificaciones">' +
                filasEspecificaciones +
            '</ul>' +

            formularioCarrito +

        '</div>';

    const formAgregar =
        document.getElementById(
            "formAgregarCarrito"
        );

    if (formAgregar) {

        formAgregar.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();

                const inputCantidad =
                    document.getElementById(
                        "cantidadProducto"
                    );

                let cantidad =
                    Number(
                        inputCantidad.value
                    );

                if (
                    !Number.isInteger(cantidad) ||
                    cantidad < 1
                ) {
                    cantidad = 1;
                }

                if (
                    tieneStockControlado &&
                    cantidad > stockDisponible
                ) {
                    const mensaje =
                        document.getElementById(
                            "mensajeAgregado"
                        );

                    mensaje.textContent =
                        "No hay suficiente stock disponible.";

                    return;
                }

                const maximo =
                    Number(
                        inputCantidad.max
                    );

                if (cantidad > maximo) {
                    cantidad = maximo;
                    inputCantidad.value =
                        maximo;
                }

                for (
                    let i = 0;
                    i < cantidad;
                    i++
                ) {
                    agregarAlCarrito(
                        juego
                    );
                }

                const mensaje =
                    document.getElementById(
                        "mensajeAgregado"
                    );

                mensaje.textContent =
                    "✔ " +
                    cantidad +
                    " unidad(es) de " +
                    juego.titulo +
                    " agregada(s) al carrito.";
            }
        );
    }

    pintarRelacionados(juego);
});

function obtenerEtiquetaProducto(juego) {

    if (juego.plataforma === "ambas") {
        return (
            '<span class="badge badge-ps5">' +
                'PS5' +
            '</span> ' +

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

function pintarRelacionados(juegoActual) {

    const contenedor =
        document.getElementById(
            "grillaRelacionados"
        );

    if (!contenedor) {
        return;
    }

    const catalogo =
        obtenerCatalogoCompleto();

    const relacionados =
        catalogo
            .filter(function (juego) {
                return (
                    juego.id !==
                        juegoActual.id &&
                    juego.genero ===
                        juegoActual.genero
                );
            })
            .slice(0, 3);

    const listaFinal =
        relacionados.length > 0
            ? relacionados
            : catalogo
                .filter(
                    function (juego) {
                        return (
                            juego.id !==
                            juegoActual.id
                        );
                    }
                )
                .slice(0, 3);

    contenedor.innerHTML =
        listaFinal
            .map(
                function (juego) {

                    let imagen = "";

                    if (juego.imagen) {
                        imagen =
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

                    return (
                        '<article class="tarjeta-juego">' +

                            '<div class="portada ' +
                                (juego.tema || "") +
                            '">' +

                                imagen +

                                '<span class="icono">' +
                                    (juego.icono || "") +
                                '</span>' +

                            '</div>' +

                            '<div class="cuerpo">' +

                                '<h3>' +
                                    juego.titulo +
                                '</h3>' +

                                '<div class="precio">' +

                                    '<span class="actual">' +
                                        formatearCLP(
                                            juego.precio
                                        ) +
                                    '</span>' +

                                '</div>' +

                                '<div class="acciones">' +

                                    '<a ' +
                                        'href="producto.html?id=' +
                                        encodeURIComponent(
                                            juego.id
                                        ) +
                                        '" ' +
                                        'class="btn btn-secundario btn-ancho">' +

                                        'Ver detalle' +

                                    '</a>' +

                                '</div>' +

                            '</div>' +

                        '</article>'
                    );
                }
            )
            .join("");
}