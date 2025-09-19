const pokemonList = document.getElementById('pokemonList'); //indo ao html, pegando atraves do id a lista de pokemons.
const loadMoreButton = document.getElementById('loadMoreButton') //chamando o botão do html
const modal = document.getElementById('pokemonModal');
const modalContent = modal.querySelector('.modal-content');

const pokemonDataMap = new Map()
let offset = 0;
const limit = 10;
const maxRecords = 151


function convertPokemonToLi(pokemon) { //função que converte o objeto pokemon em um li (html)
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}"> <!--O data-id serve como uma etiqueta de identificação para saber qual pokemon foi clicado.-->
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

function showPokemonDetails(pokemon){
    const modalHtml = `
        <div class="pokemon-modal-header ${pokemon.type}">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="pokemon-modal-body">
            <h3>Types</h3>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            
            <h3>Abilities</h3>
            <ol class="abilities">
                ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
            </ol>

            <h3>Stats</h3>
            <ul class="stats">
                ${Object.entries(pokemon.stats).map(([statName, statValue]) => `
                    <li>
                        <span>${statName.replace('-', ' ')}</span>
                        <span>${statValue}</span>
                        <div class="stat-bar">
                            <div style="width: ${statValue}%"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    modalContent.innerHTML = `<span class="close-button">&times;</span> 
        ${modalHtml}
    `;
    modal.style.display = 'flex'; // ou 'block'
}
function hideModal() {
    modal.style.display = 'none';
}
function loadPokemonItens(offset, limit) { //função que carrega os pokemons
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(pokemon => pokemonDataMap.set(pokemon.number, pokemon));
        const newListHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newListHtml
    })
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

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon'); //criando uma variavel que armazena o pokemon clicado, através do event.target.closest('.pokemon') que vai procurar o elemento mais próximo com a classe .pokemon
    if(clickedPokemon){ //se clicou em algum pokemon
        const pokemonId = clickedPokemon.dataset.id //pegando o id do pokemon clicado através do dataset.id
        const pokemonDetails = pokemonDataMap.get(Number(pokemonId)); //pegando os detalhes do pokemon clicado através do map que criamos no começo do arquivo. O Number é para converter a string em número, já que o map foi criado com números como chave.
        
        showPokemonDetails(pokemonDetails);
        // console.log(pokemonDetails)
    }
})

modalContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-button')) {
        hideModal();
    }
});

window.addEventListener('click', (event)=>{
    if(event.target == modal){
        hideModal()
    }
})

