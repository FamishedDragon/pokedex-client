const pokeContainer = document.getElementById("poke-container");
const pokemonNum = 25;

const typeColors = {
    fire: '#e9a353',
    grass: '#65d16c',
    electric: '#faea5c',
    water: '#509ec2',
    fairy: '#d46a96',
    ghost: '#da8ff1',
    dark: '#747474',
    steel: '#8d8b9e',
    ice: '#7c99ce',
    ground: '#b96816',
    rock: '#646464',
    poison: '#9563c5',
    bug: '#9bc07c',
    dragon: '#e9c915',
    psychic: '#c91962',
    flying: '#b8e5fa',
    fighting: '#685735',
    normal: '#F5F5F5',
};

const typeColorsBold = {
    fire: '#d37b16',
    grass: '#197a20',
    electric: '#e6c005',
    water: '#0a5a80',
    fairy: '#d46a96',
    ghost: '#9e46b9',
    dark: '#32313a',
    steel: '#434157',
    ice: '#3f68b6',
    ground: '#685735',
    rock: '#646464',
    poison: '#8034c7',
    bug: '#4b6d2e',
    dragon: '#e9c915',
    psychic: '#c91962',
    flying: '#a0d9f3',
    fighting: '#685735',
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
    let types = pokemon.types[0].type.name;
    // We want the BG color to be the prominent type of the mon, not necisarily the first type
    // So we will welect the type that appears first on the list of colors above
    const pokeTypes = pokemon.types.map(element => element.type.name);
    const mainType = typeNames.find(type => pokeTypes.indexOf(type) > -1);
    const colorBG = typeColors[mainType];

    // Color for name plate
    let colorNameplate = typeColorsBold[types];
    if (pokemon.types.length > 1) {
        // If pokemon has more than one type, we will alter the name plate and type text to show both
        types = `${types}/${pokemon.types[1].type.name}`;
        colorNameplate = `linear-gradient(125deg, ${colorNameplate} 35%, ${typeColorsBold[pokemon.types[1].type.name]} 65%)`;
    }

    pokeEl.style.background = colorBG;
    const pokeInnerHTML = `
        <div class="img-container">
            <img class="img" src="${img}"/>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name" style="background:${colorNameplate}">${name}</h3>
            <small class="type">Type: <span>${types}</spam><small>
        </div>
    `;

    pokeEl.innerHTML = pokeInnerHTML;
    pokeContainer.appendChild(pokeEl);
}

fetchAllPokemon();