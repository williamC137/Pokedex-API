const pokeApi= {} //inicializar um objeto sem nenhum valor no mesmo

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type =type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json()) //refereciando cada URL dos pokemons com todas as informações deles no response, e convertendo para json
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url) //requisição à URL referida
        .then((response) => response.json())   //convertendo o response para json
        .then((jsonBody) => jsonBody.results)   //O segundo "then" recebe o retorno do anterior // filtrando o json para ficar apenas o results
        .catch((error)=> console.error(error))
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando a lista de pokemons em uma lista de requisições 
        .then((detailRequests)=>Promise.all(detailRequests)) //aguardar que todas as requisições terminem
        .then((pokemonsDetails) => pokemonsDetails) //devolvendo a lista
}


// Promise.all([
//     fetch(`https://pokeapi.co/api/v2/pokemon/1`),
//     fetch(`https://pokeapi.co/api/v2/pokemon/1`),
// ]).then((results) =>{
//     console.log(results)
// })
