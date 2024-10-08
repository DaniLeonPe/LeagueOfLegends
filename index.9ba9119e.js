var i=globalThis,e={},t={},n=i.parcelRequirea37a;null==n&&((n=function(i){if(i in e)return e[i].exports;if(i in t){var n=t[i];delete t[i];var s={id:i,exports:{}};return e[i]=s,n.call(s.exports,s,s.exports),s.exports}var a=Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(i,e){t[i]=e},i.parcelRequirea37a=n),(0,n.register)("N0Tqk",function(i,e){Object.defineProperty(i.exports,"Campeon",{get:()=>t,set:void 0,enumerable:!0,configurable:!0});class t{constructor(i){this.name=i.name,this.imageUrl=`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${i.image.full}`,this.title=i.title||"Sin título",this.id=i.id,this.skins=[],this.roles=i.tags,this.blurb=i.blurb,this.info=i.info,this.currentSkinIndex=0,this.abilities=[],this.loadSkins(),this.loadAbilities()}async loadSkins(){try{let i=await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/es_MX/champion/${this.id}.json`),e=await i.json();this.skins=e.data[this.id].skins,console.log("Skins disponibles:",this.skins)}catch(i){console.error("Error al cargar las skins:",i)}}async loadAbilities(){try{let i=await fetch(`https://ddragon.leagueoflegends.com/cdn/14.19.1/data/es_MX/champion/${this.id}.json`),e=await i.json();this.abilities=e.data[this.id].spells||[],console.log("Habilidades disponibles:",this.abilities)}catch(i){console.error("Error al cargar las habilidades:",i)}}async checkImageExists(i){return(await fetch(i,{method:"HEAD"})).ok}async cambiarSkin(i){let e;let t=this.skins.length;if(console.log(`Total de skins: ${t}`),this.currentSkinIndex=(this.currentSkinIndex+1)%(t+1),0===this.currentSkinIndex)e=`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`;else{let i=this.skins[this.currentSkinIndex-1].num;e=`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_${i}.jpg`}await this.checkImageExists(e)?i.src=e:(this.currentSkinIndex=0,i.src=`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`)}crearElemento(){let i=document.createElement("div");i.classList.add("champion");let e=document.createElement("img");e.src=this.imageUrl,e.alt=this.name,e.id=`img-${this.id}`;let t=document.createElement("p");t.textContent=this.name;let n=document.createElement("div");return n.classList.add("additional-info"),n.innerHTML=`
            <p><strong>Roles:</strong> ${this.roles.join(", ")}</p>
            <p><strong>T\xedtulo:</strong> ${this.title}</p>
        `,i.appendChild(e),i.appendChild(t),i.appendChild(n),i.addEventListener("click",()=>{this.mostrarInformacionCampeon()}),i}mostrarInformacionCampeon(){let i=`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.id}_0.jpg`,e=document.getElementById("imagen-grande");e||((e=document.createElement("div")).id="imagen-grande",document.body.appendChild(e)),e.innerHTML=`
            <div class="imagen-grande-container">
                <span id="cerrar-imagen-grande">&times;</span>
                <img id="img-grande" src="${i}" alt="Imagen Grande de ${this.name}">
                <div class="imagen-grande-texto">
                    <h2>${this.name}</h2>
                    <p><strong>T\xedtulo:</strong> ${this.title}</p>
                    <p><strong>Descripci\xf3n:</strong> ${this.blurb}</p>
                    <h3>Atributos:</h3>
                    <ul>
                        <li><strong>Ataque:</strong> ${this.info.attack}</li>
                        <li><strong>Defensa:</strong> ${this.info.defense}</li>
                        <li><strong>Magia:</strong> ${this.info.magic}</li>
                        <li><strong>Dificultad:</strong> ${this.info.difficulty}</li>
                    </ul>
                    <h3>Roles:</h3>
                    <p>${this.roles.join(", ")}</p>
                    <h3>Habilidades:</h3>
                    <div class="abilities">
                        ${this.abilities.length>0?this.abilities.map(i=>`
                            <div class="ability">
                                <img src="https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${i.image.full}" alt="${i.name}">
                                <p>${i.name}</p>
                                <p>${i.description}</p>
                            </div>
                        `).join(""):"<p>No hay habilidades disponibles.</p>"}
                    </div>
                </div>
            </div>
        `,e.style.display="flex";let t=document.getElementById("img-grande");t.onclick=async()=>{await this.cambiarSkin(t)},document.getElementById("cerrar-imagen-grande").onclick=()=>{e.style.display="none"}}}}),n("N0Tqk");
//# sourceMappingURL=index.9ba9119e.js.map
