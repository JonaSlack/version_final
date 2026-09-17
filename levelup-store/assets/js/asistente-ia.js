/* =========================================================================
   asistente-ia.js
   RF-02 (RequerimientoAvanzado.txt): "El sistema deberá permitir al
   usuario ingresar una pregunta sobre videojuegos, enviarla mediante una
   API de IA y mostrar la respuesta generada en la página web."

   IMPORTANTE — SEGURIDAD:
   La API Key NUNCA se escribe en este archivo ni en ningún otro archivo
   del proyecto. El usuario la pega en un campo tipo "password" en tiempo
   de ejecución; la clave vive únicamente en la memoria del navegador
   durante esa sesión y se usa solo para esta llamada a la API de Gemini.
   No se guarda en localStorage, cookies ni se envía a otro servidor.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const btnPreguntar = document.getElementById("btnPreguntarIA");
    if (!btnPreguntar) return;

    btnPreguntar.addEventListener("click", async function () {

        const apiKey = document.getElementById("apiKeyIA").value.trim();
        const modelo = document.getElementById("modeloIA").value;
        const pregunta = document.getElementById("preguntaIA").value.trim();

        const cargando = document.getElementById("cargandoIA");
        const respuesta = document.getElementById("respuestaIA");

        // -----------------------------------------------------
        // VALIDACIONES
        // -----------------------------------------------------
        if (!apiKey) {
            alert("Primero debes ingresar tu API Key de Gemini.");
            return;
        }

        if (!pregunta) {
            alert("Escribe una pregunta sobre videojuegos.");
            return;
        }

        cargando.style.display = "block";
        respuesta.style.display = "none";
        btnPreguntar.disabled = true;

        try {

            const url =
                "https://generativelanguage.googleapis.com/v1beta/models/" +
                modelo +
                ":generateContent";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [
                            {
                                text:
                                    "Eres el asistente virtual de LevelUp Store, una tienda de " +
                                    "videojuegos para PS5 y PC. Responde en español, de forma " +
                                    "breve, amable y útil, recomendando juegos o resolviendo " +
                                    "dudas sobre plataformas, géneros y requisitos técnicos."
                            }
                        ]
                    },
                    contents: [
                        {
                            parts: [{ text: pregunta }]
                        }
                    ]
                })
            });

            const datos = await response.json();

            if (!response.ok) {
                const mensajeError = datos?.error?.message || "La API devolvió un error.";
                throw new Error(mensajeError);
            }

            const texto = datos?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!texto) {
                throw new Error("La API respondió, pero no se encontró texto en la respuesta.");
            }

            respuesta.innerHTML = texto.replace(/\n/g, "<br>");
            respuesta.style.display = "block";

        } catch (error) {

            respuesta.innerHTML = "<strong>❌ Error:</strong><br>" + error.message;
            respuesta.style.display = "block";

        } finally {

            cargando.style.display = "none";
            btnPreguntar.disabled = false;
        }
    });

});
