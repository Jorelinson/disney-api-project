const contenedor = document.getElementById("contenedor");
const loader = document.getElementById("loader");

// Cargar al inicio
window.onload = () => {
    obtenerPersonajes();
};

function mostrarLoader() {
    loader.style.display = "block";
}

function ocultarLoader() {
    loader.style.display = "none";
}

function obtenerPersonajes() {
    mostrarLoader();

    fetch("https://api.disneyapi.dev/character")
        .then(res => res.json())
        .then(data => {
            mostrarPersonajes(data.data);
            ocultarLoader();
        })
        .catch(error => console.error("Error:", error));
}

function mostrarPersonajes(personajes) {
    contenedor.innerHTML = "";

    personajes.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // delay para animación escalonada
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <h3>${p.name}</h3>
            <img src="${p.imageUrl}" alt="${p.name}">
            <p><strong>Películas:</strong> ${p.films.join(", ") || "N/A"}</p>
            <p><strong>Series:</strong> ${p.tvShows.join(", ") || "N/A"}</p>
        `;

        contenedor.appendChild(card);
    });
}

function filtrar() {
    const nombre = document.getElementById("search").value.toLowerCase();
    const serie = document.getElementById("series").value.toLowerCase();

    mostrarLoader();

    fetch("https://api.disneyapi.dev/character")
        .then(res => res.json())
        .then(data => {
            let personajes = data.data;

            if (nombre) {
                personajes = personajes.filter(p =>
                    p.name.toLowerCase().includes(nombre)
                );
            }

            if (serie) {
                personajes = personajes.filter(p =>
                    p.tvShows.some(show =>
                        show.toLowerCase().includes(serie)
                    )
                );
            }

            mostrarPersonajes(personajes);
            ocultarLoader();
        })
        .catch(error => console.error("Error:", error));
}