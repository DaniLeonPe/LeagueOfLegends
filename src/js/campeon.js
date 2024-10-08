class Campeon {
    constructor(data) {
        this.name = data.name; // Nombre del campeón
        this.imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${data.image.full}`; // URL de la imagen del campeón
        this.title = data.title || "Sin título"; // Título del campeón
        this.id = data.id; // ID del campeón
        this.skins = []; // Inicializar como un array vacío
        this.roles = data.tags; // Roles del campeón
        this.blurb = data.blurb; // Descripción del campeón
        this.info = data.info; // Información de ataque, defensa, magia y dificultad
        this.currentSkinIndex = 0; // Inicializar el índice de skin
        this.abilities = []; // Inicializar como un array vacío para habilidades

        // Cargar skins y habilidades
        this.loadSkins();
        this.loadAbilities();
    }

    async loadSkins() {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/es_MX/champion/${this.id}.json`);
            const data = await response.json();

            // Asignar la lista de skins
            this.skins = data.data[this.id].skins;
            console.log("Skins disponibles:", this.skins); // Verificar las skins
        } catch (error) {
            console.error("Error al cargar las skins:", error);
        }
    }

    async loadAbilities() {
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/es_MX/champion/${this.id}.json`);
            const data = await response.json();
            
            this.abilities = data.data[this.id].spells || []; // Asegúrate de que abilities sea un array
            console.log("Habilidades disponibles:", this.abilities); // Verificar las habilidades
        } catch (error) {
            console.error("Error al cargar las habilidades:", error);
        }
    }

    async checkImageExists(url) {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; // Verifica si la imagen existe
    }

    async cambiarSkin(championImg) {
        const maxSkins = this.skins.length; // Total de skins disponibles
        console.log(`Total de skins: ${maxSkins}`);

        // Incrementa currentSkinIndex
        this.currentSkinIndex = (this.currentSkinIndex + 1) % (maxSkins + 1); // Incrementa y devuelve el nuevo número de skin (modulo para volver al principio)

        let skinUrl;

        // Determine the URL for the current skin
        if (this.currentSkinIndex === 0) {
            // Skin original
            skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`;
        } else {
            // Usar el id de la skin correcta
            const skinId = this.skins[this.currentSkinIndex - 1].num; // Asegúrate de usar 'num' para obtener el número correcto de skin
            skinUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_${skinId}.jpg`;
        }

        const imageExists = await this.checkImageExists(skinUrl);
        if (imageExists) {
            championImg.src = skinUrl; // Cambia la imagen si existe
        } else {
            // Si la imagen no existe, simplemente vuelve a la skin original
            this.currentSkinIndex = 0; // Reinicia el índice
            championImg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`; // Cambia a la skin original
        }
    }

    crearElemento() {
        const championDiv = document.createElement('div');
        championDiv.classList.add('champion');

        const img = document.createElement('img'); // Usar la etiqueta img para la imagen completa
        img.src = this.imageUrl;
        img.alt = this.name;
        img.id = `img-${this.id}`; // Asignar un id a la imagen del campeón

        const name = document.createElement('p');
        name.textContent = this.name;

        const additionalInfo = document.createElement('div');
        additionalInfo.classList.add('additional-info'); // Contenedor para información adicional
        additionalInfo.innerHTML = `
            <p><strong>Roles:</strong> ${this.roles.join(', ')}</p>
            <p><strong>Título:</strong> ${this.title}</p>
        `;

        championDiv.appendChild(img); // Agregar la imagen
        championDiv.appendChild(name);
        championDiv.appendChild(additionalInfo); // Agregar el contenedor de información adicional

        // Evento para mostrar información del campeón
        championDiv.addEventListener('click', () => {
            this.mostrarInformacionCampeon();
        });

        return championDiv;
    }

    mostrarInformacionCampeon() {
        const fullImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`;
    
        // Crear o seleccionar el contenedor donde se mostrará la imagen grande
        let imagenGrande = document.getElementById('imagen-grande');
        if (!imagenGrande) {
            imagenGrande = document.createElement('div');
            imagenGrande.id = 'imagen-grande';
            document.body.appendChild(imagenGrande);
        }
    
        // Insertar la imagen y la información en el contenedor
        imagenGrande.innerHTML = `
            <div class="imagen-grande-container">
                <span id="cerrar-imagen-grande">&times;</span>
                <img id="img-grande" src="${fullImageUrl}" alt="Imagen Grande de ${this.name}">
                <div class="imagen-grande-texto">
                    <h2>${this.name}</h2>
                    <p><strong>Título:</strong> ${this.title}</p>
                    <p><strong>Descripción:</strong> ${this.blurb}</p>
                    <h3>Atributos:</h3>
                    <ul>
                        <li><strong>Ataque:</strong> ${this.info.attack}</li>
                        <li><strong>Defensa:</strong> ${this.info.defense}</li>
                        <li><strong>Magia:</strong> ${this.info.magic}</li>
                        <li><strong>Dificultad:</strong> ${this.info.difficulty}</li>
                    </ul>
                    <h3>Roles:</h3>
                    <p>${this.roles.join(', ')}</p>
                    <h3>Habilidades:</h3>
                    <div class="abilities">
                        ${this.abilities.length > 0 ? this.abilities.map(spell => `
                            <div class="ability">
                                <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${spell.image.full}" alt="${spell.name}">
                                <p>${spell.name}</p>
                                <p>${spell.description}</p>
                            </div>
                        `).join('') : '<p>No hay habilidades disponibles.</p>'}
                    </div>
                </div>
            </div>
        `;
    
        // Mostrar el modal
        imagenGrande.style.display = 'flex'; // Cambiado a 'flex' para centrar el contenido
    
        // Seleccionar el elemento de la imagen grande correctamente después de que se ha agregado al DOM
        const imgGrandeElement = document.getElementById('img-grande');
    
        // Evento para cambiar la skin al hacer clic en la imagen grande
        imgGrandeElement.onclick = async () => {
            await this.cambiarSkin(imgGrandeElement);
        };
    
        // Cerrar el modal al hacer clic en el botón de cierre
        document.getElementById('cerrar-imagen-grande').onclick = () => {
            imagenGrande.style.display = 'none';
        };
    }
}
