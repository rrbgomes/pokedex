
const pokemonHtmlList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 15;
const limit=5
let offset=0

function convertPokemonTypes(pokemonTypes){
    return pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')
}

function convertPokemonToHtmlLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypes(pokemon.types)}
                    </ol>

                    <img src=${pokemon.image}
                        alt=${pokemon.name}>
                </div>
        </li>
    `
}


function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtmlLi).join('')
        pokemonList.innerHTML += newHtml})
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit
    if(maxRecords > offset+limit){
        loadPokemonItens(offset,limit)
    }else{
        loadPokemonItens(offset, maxRecords-offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
})
