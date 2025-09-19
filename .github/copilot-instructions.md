# Copilot Instructions for Pokedex Project

## Visão Geral
Este projeto é uma Pokédex web simples que consome a [PokeAPI](https://pokeapi.co/) para listar e detalhar Pokémons da primeira geração (até 151). O código é organizado em três arquivos principais de JavaScript:

- `assets/js/main.js`: Controla a renderização da lista de Pokémons, paginação e interação com o DOM.
- `assets/js/poke-api.js`: Responsável por requisições à PokeAPI e transformação dos dados recebidos.
- `assets/js/pokemon-model.js`: Define o modelo de dados `Pokemon` usado internamente.

## Fluxo de Dados
- O frontend faz requisições para a PokeAPI usando funções em `poke-api.js`.
- Os dados recebidos são convertidos para instâncias do modelo `Pokemon`.
- A lista de Pokémons é renderizada dinamicamente no HTML via `main.js`.
- A paginação é feita por offset/limit, com botão para carregar mais.

## Convenções e Padrões
- O modelo `Pokemon` centraliza todos os atributos relevantes (número, nome, tipos, foto, habilidades, movimentos).
- O HTML é gerado dinamicamente usando template strings.
- O carregamento incremental ("load more") é feito até o máximo de 151 Pokémons.
- O código utiliza Promises e encadeamento de `.then()` para manipulação assíncrona.
- Não há uso de frameworks ou bundlers; apenas JS, HTML e CSS puros.

## Exemplos de Uso
- Para buscar Pokémons: use `pokeApi.getPokemons(offset, limit)`.
- Para buscar detalhes de um Pokémon: use `pokeApi.getPokemonDetail(pokemon)`.
- Para renderizar um Pokémon: use `convertPokemonToLi(pokemon)` em `main.js`.

## Dicas para Agentes AI
- Sempre utilize o modelo `Pokemon` para manipular dados de Pokémons.
- Siga o padrão de conversão de dados da API para o modelo antes de renderizar.
- Mantenha a separação entre lógica de API, modelo e manipulação de DOM.
- Não adicione dependências externas sem necessidade.
- O projeto não possui testes automatizados ou scripts de build; basta abrir o `index.html` no navegador para rodar.

## Arquivos-Chave
- `assets/js/main.js`
- `assets/js/poke-api.js`
- `assets/js/pokemon-model.js`
- `index.html`
- `assets/css/pokedex.css`, `assets/css/global.css`

## Limitações
- Apenas Pokémons da primeira geração (offset/limit até 151).
- Sem backend ou persistência local.
- Sem suporte mobile avançado.

---

Se adicionar novos recursos, siga a estrutura modular e mantenha a simplicidade do código.
