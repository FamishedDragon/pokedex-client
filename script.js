const pokeContainer = document.getElementById("poke-container");
const pokemonNum = 150;

const typeColors = {
    fire: '#e9a353',
    grass: '#65d16c',
    electric: '#fffc42',
    water: '#509ec2',
    fairy: '#ffb9d6',
    ghost: '#da8ff1',
    dark: '#747474',
    steel: '#8d8b9e',
    ice: '#7c99ce',
    poison: '#9563c5',
    rock: '#999999',
    ground: '#bba374',
    bug: '#9bc07c',
    dragon: '#ffdc6a',
    psychic: '#ff7195',
    flying: '#b8e5fa',
    fighting: '#ff5e52',
    normal: '#F5F5F5',
};

const typeColorsBold = {
    fire: '#d37b16',
    grass: '#197a20',
    electric: '#e2d409',
    water: '#0a5a80',
    fairy: '#d46a96',
    ghost: '#9e46b9',
    dark: '#32313a',
    steel: '#434157',
    ice: '#3f68b6',
    poison: '#8034c7',
    rock: '#646464',
    ground: '#685735',
    bug: '#4b6d2e',
    dragon: '#ffc401',
    psychic: '#c91962',
    flying: '#73bfe2',
    fighting: '#b92e16',
    normal: '#dddddd',
};

const typeNames = Object.keys(typeColors);

const fetchAllPokemon = async () => {
    for(let i=1; i<=pokemonNum; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    
    console.log(pokemon)
    createPokemonCard(pokemon);
}

function createPokemonCard(pokemon) {
    const pokeEl = document.createElement('div');
    pokeEl.classList.add('pokemon');

    // Make first character in name upper case
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    // ID with leading 0s
    const id = pokemon.id.toString().padStart(3, '0');
    // Get our image
    //const img = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png` //Defunct site
    //const img = pokemon.sprites.front_default; //Low rez, off center
    //const img = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`; //Images all cropped to different proportions
    const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

    // Type
    let typeMain = pokemon.types[0].type.name;
    let typeSecondary = "";
    // We want the BG color to be the prominent type of the mon, not necisarily the first type
    // So we will welect the type that appears first on the list of colors above
    const pokeTypes = pokemon.types.map(element => element.type.name);
    const mainType = typeNames.find(type => pokeTypes.indexOf(type) > -1);
    const colorBG = typeColors[mainType];

    // Color for name plate
    let colorNameplate = typeColorsBold[mainType];
    let type1Color = typeColorsBold[typeMain];
    let type2Color = "";
    let doubleType = false;
    if (pokemon.types.length > 1) {
        // If pokemon has more than one type, we will alter the name plate and type text to show both
        typeSecondary = `${pokemon.types[1].type.name}`;
        type2Color = typeColorsBold[pokemon.types[1].type.name];
        //colorNameplate = `linear-gradient(125deg, ${colorNameplate} 35%, ${typeColorsBold[pokemon.types[1].type.name]} 65%)`;
        doubleType = true;
    }

    // Put everything into HTML
    pokeEl.style.background = colorBG;
    const pokeInnerHTML = `
        <div class="img-container">
            <img class="img" src="${img}"/>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name" style="background:${colorNameplate}">${name}</h3>
            <h5 class="type">
                <span class="type-element" style="background:${type1Color}">${typeMain}</span>
                ${doubleType 
                    ? `<span class="type-element" style="background:${type2Color}">  ${typeSecondary}  </span>` 
                    : ""}
            <h5>
        </div>
    `;
    
    // Add HTML into our index.html file
    pokeEl.innerHTML = pokeInnerHTML;
    pokeContainer.appendChild(pokeEl);
}

fetchAllPokemon();