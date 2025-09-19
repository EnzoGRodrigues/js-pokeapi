const pokemonList = document.getElementById('pokemonList'); //indo ao html, pegando atraves do id a lista de pokemons.
const loadMoreButton = document.getElementById('loadMoreButton') //chamando o botão do html
let offset = 0;
const limit = 10;
const maxRecords = 151


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

/**
 * Comentando o código:
 * pokeApi.getPokemons() -> fazendo a requisição http para buscar a lista de pokemons
 * pokemons = [] -> recebemos a lista na nossa mão
 * pokemons.map -> transformamos esses pokemons em uma lista de html
 * convertPokemonToLi -> a transformação na lista de html ocorre por causa dessa função.
 * newListHtml = pokemons.map(convertPokemonToLi) -> para cada pokemons, estamos convertendo um objeto em uma string que é nosso html.
 * join('') -> concatenamos essa string sem separador
 * const newListHtml -> toda essa string concatenada, vira uma nova lista de HTML.
 * pokemonList.innerHTML = newListHtml -> e agora nossa lista html já existente passa a receber a nova lista de html
 * 
 */

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newListHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newListHtml
    })
}
/**
 * O que está acontecendo no código acima?
 *   O código basicamente diz: pega a lista de pokemons, mapeia os pokemons, ou seja converte a lista de pokemons
 *   para uma lista de li, ou seja uma lista de html. E depois justa todos esses li's (através do join('')) sem separador nenhum.
 *   Por isso tem aspas simples dentro do join('').
 *   
 *   Depois de tudo isso, isso vai virar um html novo. E no final, esse html novo será inserido no html antigo.
 */

/**
 * Coisas que nós estamos usando para manipular o HTML:
 * document.getElementById -> usamos o dom (document) para acessar o html
 * pokemonList.innerHTML -> e o innerHTML para inserir no html
 */

/**
 * O mais importante não é como manipular o html mas sim:
 * como manipular uma promise
 * como manipular uma lista de objetos
 * como transformar essa lista de objetos em outro tipo
 * como concatenar esses objetos de uma forma fácil
 */

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit //

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})

