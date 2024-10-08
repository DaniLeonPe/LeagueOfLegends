// URL del JSON que contiene la información de los campeones
const championsUrl = 'https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json';

// Función para obtener los datos y mostrar las imágenes
async function fetchChampions() {
    try {
        const response = await fetch(championsUrl);
        const data = await response.json();
        const champions = data.data;

        const container = document.getElementById('championContainer');

        // Recorrer cada campeón y crear un elemento de imagen utilizando la clase Campeon
        Object.keys(champions).forEach(key => {
            const championData = champions[key];
            const campeon = new Campeon(championData);
            const championElement = campeon.crearElemento();
            
            // Agregar el elemento al contenedor principal
            container.appendChild(championElement);
        });
    } catch (error) {
        console.error('Error al obtener los datos de los campeones:', error);
    }
}

// Función que muestra los campeones y oculta el botón
function mostrarCampeones() {
    // Ocultar el botón
    const button = document.getElementById('mostrarCampeonesBtn');
    button.style.display = 'none';

    // Llamar a la función para obtener y mostrar los campeones
    fetchChampions();
}

// Añadir el evento click al botón para mostrar campeones
document.getElementById('mostrarCampeonesBtn').addEventListener('click', mostrarCampeones);
