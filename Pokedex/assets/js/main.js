// const offset = 0;
// const limit = 10
// const url ='https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}';

// fetch(url)
//     .then(function(response){  // processamento assíncrono
//         return response.json() //transformação da informação em json
//     })   
//     .then(function(jsonBody){
//         console.log(jsonBody) //imprimindo o resultado em json
//     })
//     .catch(function(error){ // chamado em caso de erro
//         console.error(error)
//     })
//     .finally(function(){
//         console.log('Request completed') //chamado quando a requisição for concluida independente de erro ou sucesso.
//     })


// Abreviação da palavra reservada "function": =>

const pokemonList = (document.getElementById('pokemonList')) //referenciando o objeto com ID no documento
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0
const maxRecords = 151



function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { // [] default, se não houver pokemon. O método then é usado para aguardar a resolução da Promise.  
        const newHtml = pokemons.map(pokemon => 
           `  
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
            `).join('')//map referencia cada elemento do array para que sejam tratados pela função "convert" e sejam representados em uma lista HTML
            pokemonList.innerHTML += newHtml // Atualiza o conteúdo HTML do elemento identificado por "pokemonList" com a string HTML gerada a partir dos Pokémon
    })
}
loadPokemonItens(offset, limit)


//     const listItems = []
//     for (let i = 0; i < pokemons.length; i++) {
//         const pokemon = pokemons[i];
//         listItems.push(convertPokemonToLi(pokemon))  //convertendo uma lista de objetos em uma lista html
//     }        
loadMoreButton.addEventListener('click',()=>{
    offset += limit 

    const qtdRecordNextPage= offset +limit

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})

   