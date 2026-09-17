/* =========================================================================
   producto.js
   Lógica de la página producto.html:
     - Lee el parámetro ?id= de la URL con URLSearchParams
     - Busca el juego correspondiente en datos-juegos.js
     - Pinta la ficha completa: video embebido, especificaciones,
       selector de cantidad y botón "Agregar al carrito"
     - Muestra 3 juegos relacionados
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const parametros = new URLSearchParams(window.location.search);
    const idJuego = parametros.get("id") || CATALOGO_JUEGOS[0].id;
    const juego = buscarJuegoPorId(idJuego);

    const contenedor = document.getElementById("detalleProducto");
    const miga = document.getElementById("migaTitulo");

    if (!juego) {
        contenedor.innerHTML = "<p>No encontramos ese juego. <a href='catalogo.html'>Vuelve al catálogo</a>.</p>";
        return;
    }

    document.title = juego.titulo + " | LevelUp Store";
    miga.textContent = juego.titulo;

    const etiquetaPlataforma =
        juego.plataforma === "ambas"
            ? '<span class="badge badge-ps5">PS5</span> <span class="badge badge-pc">PC</span>'
            : juego.plataforma === "ps5"
                ? '<span class="badge badge-ps5">PS5</span>'
                : '<span class="badge badge-pc">PC</span>';

    const filasEspecificaciones = Object.keys(juego.especificaciones).map(function (clave) {
        return "<li><span>" + clave + "</span><strong>" + juego.especificaciones[clave] + "</strong></li>";
    }).join("");

    contenedor.innerHTML =
        '<div>' +
            '<div class="video-envoltura">' +
                '<video controls preload="metadata" poster="assets/img/poster-trailer.svg" aria-label="Tráiler de ' + juego.titulo + '">' +
                    '<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">' +
                    'Tu navegador no soporta la reproducción de video incrustado.' +
                '</video>' +
            '</div>' +
            '<p class="ayuda">* Video de demostración libre de derechos. Se reemplaza por el tráiler oficial en producción.</p>' +
        '</div>' +
        '<div>' +
            '<div style="margin-bottom:10px;">' + etiquetaPlataforma + '</div>' +
            '<h1>' + juego.titulo + '</h1>' +
            '<p class="subtitulo">' + juego.descripcion + '</p>' +

            '<div class="precio" style="margin-bottom:18px;">' +
                '<span class="actual" style="font-size:1.6rem;">' + formatearCLP(juego.precio) + '</span>' +
                (juego.precioAnterior ? '<span class="anterior">' + formatearCLP(juego.precioAnterior) + '</span>' : '') +
            '</div>' +

            '<ul class="lista-especificaciones">' + filasEspecificaciones + '</ul>' +

            '<form id="formAgregarCarrito" class="form-fila" style="align-items:end;">' +
                '<div class="grupo-campo" style="margin-bottom:0;">' +
                    '<label for="cantidadProducto">Cantidad</label>' +
                    '<input type="number" id="cantidadProducto" name="cantidad" min="1" max="10" value="1" inputmode="numeric">' +
                '</div>' +
                '<button type="submit" class="btn btn-primario btn-ancho">🛒 Agregar al carrito</button>' +
            '</form>' +
            '<p id="mensajeAgregado" class="mensaje-ok" role="status"></p>' +
        '</div>';

    document.getElementById("formAgregarCarrito").addEventListener("submit", function (evento) {
        evento.preventDefault();

        const cantidad = Number(document.getElementById("cantidadProducto").value) || 1;

        for (let i = 0; i < cantidad; i++) {
            agregarAlCarrito(juego);
        }

        const mensaje = document.getElementById("mensajeAgregado");
        mensaje.textContent = "✔ " + cantidad + " unidad(es) de " + juego.titulo + " agregada(s) al carrito.";
    });

    pintarRelacionados(juego);
});

/**
 * Muestra hasta 3 juegos del mismo género (excluyendo el actual) en la
 * sección "También te puede interesar".
 */
function pintarRelacionados(juegoActual) {
    const contenedor = document.getElementById("grillaRelacionados");
    if (!contenedor) return;

    const relacionados = CATALOGO_JUEGOS
        .filter(function (j) {
            return j.id !== juegoActual.id && j.genero === juegoActual.genero;
        })
        .slice(0, 3);

    const listaFinal = relacionados.length > 0
        ? relacionados
        : CATALOGO_JUEGOS.filter(function (j) { return j.id !== juegoActual.id; }).slice(0, 3);

    contenedor.innerHTML = listaFinal.map(function (juego) {
        return (
            '<article class="tarjeta-juego">' +
                '<div class="portada ' + juego.tema + '"><span class="icono">' + juego.icono + '</span></div>' +
                '<div class="cuerpo">' +
                    '<h3>' + juego.titulo + '</h3>' +
                    '<div class="precio"><span class="actual">' + formatearCLP(juego.precio) + '</span></div>' +
                    '<div class="acciones">' +
                        '<a href="producto.html?id=' + juego.id + '" class="btn btn-secundario btn-ancho">Ver detalle</a>' +
                    '</div>' +
                '</div>' +
            '</article>'
        );
    }).join("");
}
