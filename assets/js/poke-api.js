

const pokeApi = {} //esse objeto vai representar nossa pokeAPI

function convertPokeApiDetailToPokemon(pokeDetail){ //o parâmetro pokeDetail refere-se a nossa PokeAPI. Então ele representa os parâmetros da API.
    // função que vai converter o detalhe do pokemon da pokeapi para o nosso objeto pokemon.
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.experience = pokeDetail.base_experience
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name) //pegando as habilidades do pokemon e com o map() transformando em uma nova lista só com o nome das habilidades.
    pokemon.generation = pokeDetail.past_abilities.map((past_abilitySlot) => past_abilitySlot.generation.name)
    
    const statsName = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const statsValues = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.stats = statsName.reduce((acc, name, index) =>{ //o reduce() é usado para transformar uma lista em um objeto.
        acc[name] = statsValues[index]; //mapeando os nomes das stats para seus valores
        return acc;
    },{});//o {} é o valor inicial do acumulador, ou seja, o objeto vazio que vai ser preenchido com as stats.

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon 
}

pokeApi.getPokemonDetail = (pokemon) => { // essa função vai receber um objeto pokemon que tem o name e a url.
    //essa url é a url de detalhes do pokemon. Exemplo: https://pokeapi.co/api/v2/pokemon/1/
    return fetch(pokemon.url) 
            .then((response) => response.json()) //quando a promise for resolvida. Ele vai entrar no primeiro .then() e aqui eu to pedindo para transformar o body para JSON. por isso response.json(). Isso vai retornar uma Promise de Any
            .then(convertPokeApiDetailToPokemon) //quando eu receber o detalhe do pokemon em json, eu vou converter esse detalhe para o meu objeto pokemon.
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

