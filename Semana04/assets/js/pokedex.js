const pokePhoto = document.getElementById("pokeImg");
const pokemonStats = document.getElementById("pokemonStats");
const pokemonType = document.getElementById("pokemonType");

const tipoColores = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./assets/img/quien.gif");     
            numeroPokemon.innerHTML='';
            pokemonStats.innerHTML = '';
            pokeType.innerHTML='';  
            pokemonType.innerHTML = '';
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            datosPokemon(data)
        }
    });
}
const listaPokemon=()=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
}

const datosPokemon =(pokemon) =>{

    let tipoPokemon="";
    let indice=0;
    for (indice ; indice<pokemon.types.length ; indice = indice + 1) {
        tipoPokemon += pokemon.types[indice].type.name+ " "
      }    
    
    numeroPokemon.innerHTML=pokemon.id
    agregaStats(pokemon.stats)
    cambiaColor(pokemon.types[0].type.name) 
    agregaTipos( pokemon.types )
}
const pokeImage = (url) => {
   // const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}


function cambiaColor(color)  {
    const colorUno = tipoColores[color];
    pokePhoto.style.background =  `${colorUno}`;
    pokePhoto.style.backgroundSize = ' 5px 5px';
}

function agregaStats( stats ) {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}

function agregaTipos( types ) {
    pokemonType.innerHTML = '';
    types.forEach(tipo => {
      //  const typeElement = document.createElement("div");
        const typesImage = document.createElement("img");
        typesImage.src=`./assets/img/${tipo.type.name}.png`
      //  typeElement.appendChild(typesImage);
        //pokemonType.appendChild(typeElement);
        pokemonType.appendChild(typesImage);
    });
}