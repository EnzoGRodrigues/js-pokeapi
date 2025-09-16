

const pokeApi = {} //esse objeto vai representar nossa pokeAPI

function convertPokeApiDetailToPokemon(pokeDetail){ //o parâmetro pokeDetail refere-se a nossa PokeAPI. Então ele representa os parâmetros da API.
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
    
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url) //fetch devolvendo uma Promise de Response
                .then((response) => { //utilizando arrow function para declarar a função.
                    //quando a promise for resolvida. Ele vai entrar no primeiro .then() e aqui eu to pedindo para transformar o body para JSON. por isso response.json(). 
                    return response.json() // Isso vai retornar uma Promise de Any
                })
                .then((jsonBody) => jsonBody.results) //quando o body for convertido, ele vai entrar no segundo .then() e vai pegar o results dentro do json. O results é a lista de pokemons.
                .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //agora estamos pegando essa lista e estamos transformando ela em uma nova lista (através do map()) de promessas de detalhes do pokemon em json.
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonsDetails) => pokemonsDetails)
}

