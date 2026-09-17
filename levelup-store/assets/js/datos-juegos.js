/* =========================================================================
   datos-juegos.js
   Catálogo de productos de la tienda. En una versión con backend real,
   este arreglo sería reemplazado por datos obtenidos desde una API o
   base de datos. Para esta entrega (front-end estático) se utiliza un
   arreglo de JavaScript como fuente de datos única, consumida por
   index.html, catalogo.html y producto.html.
   ========================================================================= */

const CATALOGO_JUEGOS = [
    {
        id: "gow-ragnarok",
        titulo: "God of War Ragnarök",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "⚔️",
        precio: 44990,
        precioAnterior: 54990,
        destacado: true,
        descripcion: "Kratos y Atreus enfrentan el Ragnarök en una aventura de acción y mitología nórdica aclamada por la crítica.",
        especificaciones: {
            "Plataforma": "PlayStation 5",
            "Género": "Acción / Aventura",
            "Clasificación": "18+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "spiderman-2",
        titulo: "Marvel's Spider-Man 2",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "🕸️",
        precio: 42990,
        destacado: true,
        descripcion: "Peter Parker y Miles Morales se unen para proteger Nueva York en esta secuela exclusiva de PS5.",
        especificaciones: {
            "Plataforma": "PlayStation 5",
            "Género": "Acción / Mundo abierto",
            "Clasificación": "16+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "gt7",
        titulo: "Gran Turismo 7",
        plataforma: "ps5",
        genero: "carreras",
        tema: "tema-carreras",
        icono: "🏎️",
        precio: 34990,
        descripcion: "El simulador de carreras definitivo con soporte para volante y realismo fotográfico.",
        especificaciones: {
            "Plataforma": "PlayStation 5",
            "Género": "Carreras / Simulación",
            "Clasificación": "3+",
            "Idioma": "Español",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "cyberpunk",
        titulo: "Cyberpunk 2077: Edición Definitiva",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "🌆",
        precio: 29990,
        precioAnterior: 39990,
        destacado: true,
        descripcion: "Sumérgete en Night City en este RPG de acción en mundo abierto, ahora con todo el contenido y mejoras.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Rol / Mundo abierto",
            "Clasificación": "18+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Descarga digital"
        }
    },
    {
        id: "elden-ring",
        titulo: "Elden Ring",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "🗡️",
        precio: 37990,
        descripcion: "Un vasto mundo de fantasía oscura creado por FromSoftware y George R. R. Martin.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Rol de acción",
            "Clasificación": "16+",
            "Idioma": "Español (subtítulos)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "bg3",
        titulo: "Baldur's Gate 3",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "🎲",
        precio: 41990,
        descripcion: "Un RPG por turnos ambientado en el universo de Dungeons & Dragons con decisiones que cambian la historia.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Rol táctico",
            "Clasificación": "18+",
            "Idioma": "Español (subtítulos)",
            "Formato": "Descarga digital"
        }
    },
    {
        id: "hogwarts",
        titulo: "Hogwarts Legacy",
        plataforma: "ambas",
        genero: "mundo-abierto",
        tema: "tema-mundo",
        icono: "🪄",
        precio: 32990,
        descripcion: "Vive tu propia historia de magia en un mundo abierto ambientado décadas antes de Harry Potter.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Mundo abierto / RPG",
            "Clasificación": "12+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "horizon-fw",
        titulo: "Horizon Forbidden West",
        plataforma: "ps5",
        genero: "mundo-abierto",
        tema: "tema-mundo",
        icono: "🏹",
        precio: 33990,
        descripcion: "Aloy explora tierras salvajes y peligrosas máquinas en esta exclusiva de mundo abierto.",
        especificaciones: {
            "Plataforma": "PlayStation 5",
            "Género": "Mundo abierto / Acción",
            "Clasificación": "16+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "eafc25",
        titulo: "EA Sports FC 25",
        plataforma: "ambas",
        genero: "deporte",
        tema: "tema-deporte",
        icono: "⚽",
        precio: 39990,
        destacado: true,
        descripcion: "El fútbol más realista con licencias oficiales de ligas y equipos de todo el mundo.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Deportes",
            "Clasificación": "3+",
            "Idioma": "Español (comentarios en vivo)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "witcher3",
        titulo: "The Witcher 3: Wild Hunt",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "🐺",
        precio: 24990,
        descripcion: "Geralt de Rivia recorre un mundo de fantasía oscura en busca de su hija adoptiva, Ciri.",
        especificaciones: {
            "Plataforma": "PS5 y PC",
            "Género": "Rol / Mundo abierto",
            "Clasificación": "18+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    },
    {
        id: "minecraft",
        titulo: "Minecraft",
        plataforma: "pc",
        genero: "sandbox",
        tema: "tema-sandbox",
        icono: "🧱",
        precio: 19990,
        descripcion: "Construye, explora y sobrevive en mundos generados de forma procedural, solo o con amigos.",
        especificaciones: {
            "Plataforma": "PC",
            "Género": "Sandbox / Supervivencia",
            "Clasificación": "7+",
            "Idioma": "Español",
            "Formato": "Descarga digital"
        }
    },
    {
        id: "ratchet",
        titulo: "Ratchet & Clank: Rift Apart",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "🔧",
        precio: 31990,
        descripcion: "Salta entre dimensiones en esta aventura de plataformas que exprime el hardware de PS5.",
        especificaciones: {
            "Plataforma": "PlayStation 5",
            "Género": "Acción / Plataformas",
            "Clasificación": "12+",
            "Idioma": "Español (subtítulos y voces)",
            "Formato": "Físico o descarga digital"
        }
    }
];

/**
 * Devuelve un producto del catálogo a partir de su id, o null si no existe.
 */
function buscarJuegoPorId(id) {
    return CATALOGO_JUEGOS.find(function (juego) {
        return juego.id === id;
    }) || null;
}
