const CATALOGO_JUEGOS = [
    {
        id: "gow-ragnarok",
        imagen: "assets/img/juegos/gow-ragnarok.jpg",
        titulo: "God of War Ragnarök",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "",
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
        imagen: "assets/img/juegos/spiderman-2.jpg",
        titulo: "Marvel's Spider-Man 2",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "",
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
        imagen: "assets/img/juegos/gt7.jpg",
        titulo: "Gran Turismo 7",
        plataforma: "ps5",
        genero: "carreras",
        tema: "tema-carreras",
        icono: "",
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
        imagen: "assets/img/juegos/cyberpunk.jpg",
        titulo: "Cyberpunk 2077: Edición Definitiva",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "",
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
        imagen: "assets/img/juegos/elden-ring.jpg",
        titulo: "Elden Ring",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "",
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
        imagen: "assets/img/juegos/bg3.jpg",
        titulo: "Baldur's Gate 3",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "",
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
        imagen: "assets/img/juegos/hogwarts.jpg",
        titulo: "Hogwarts Legacy",
        plataforma: "ambas",
        genero: "mundo-abierto",
        tema: "tema-mundo",
        icono: "",
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
        imagen: "assets/img/juegos/horizon-fw.jpg",
        titulo: "Horizon Forbidden West",
        plataforma: "ps5",
        genero: "mundo-abierto",
        tema: "tema-mundo",
        icono: "",
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
        imagen: "assets/img/juegos/eafc25.jpg",
        titulo: "EA Sports FC 25",
        plataforma: "ambas",
        genero: "deporte",
        tema: "tema-deporte",
        icono: "",
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
        imagen: "assets/img/juegos/witcher3.jpg",
        titulo: "The Witcher 3: Wild Hunt",
        plataforma: "ambas",
        genero: "rol",
        tema: "tema-rol",
        icono: "",
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
        imagen: "assets/img/juegos/minecraft.jpg",
        titulo: "Minecraft",
        plataforma: "pc",
        genero: "sandbox",
        tema: "tema-sandbox",
        icono: "",
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
        imagen: "assets/img/juegos/ratchet.jpg",
        titulo: "Ratchet & Clank: Rift Apart",
        plataforma: "ps5",
        genero: "accion",
        tema: "tema-accion",
        icono: "",
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

function obtenerProductosAdministracion() {
    try {
        const datos = localStorage.getItem("levelupProductos");

        const productos = datos
            ? JSON.parse(datos)
            : [];

        if (!Array.isArray(productos)) {
            return [];
        }

        return productos.map(function (producto, indice) {

            let plataforma = "producto";

            if (producto.categoria === "PS5") {
                plataforma = "ps5";
            } else if (producto.categoria === "PC") {
                plataforma = "pc";
            }

            return {
                id: "admin-" + producto.codigo,

                imagen: producto.imagen || "",

                titulo: producto.nombre,

                plataforma: plataforma,

                genero:
                    producto.categoria === "Accesorios"
                        ? "accesorios"
                        : "videojuego",

                tema: "tema-accion",

                icono: "🎮",

                precio: Number(producto.precio),

                stock: Number(producto.stock),

                descripcion:
                    producto.descripcion ||
                    "Producto disponible en LevelUp Store.",

                administracion: true,

                indiceAdministracion: indice,

                especificaciones: {
                    "Código": producto.codigo,
                    "Categoría": producto.categoria,
                    "Stock": String(producto.stock),
                    "Formato": "Producto LevelUp Store"
                }
            };
        });

    } catch (error) {

        console.warn(
            "No fue posible cargar los productos de administración:",
            error
        );

        return [];
    }
}

function obtenerCatalogoCompleto() {
    return CATALOGO_JUEGOS.concat(
        obtenerProductosAdministracion()
    );
}

function buscarJuegoPorId(id) {
    return obtenerCatalogoCompleto().find(
        function (juego) {
            return juego.id === id;
        }
    ) || null;
}