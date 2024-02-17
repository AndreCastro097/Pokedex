const pokemonImg = document.querySelector(".pokemon__img");
const pokemonId = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const pokeForm = document.querySelector(".form");
const pokeInput = document.querySelector(".input__search");
const pokeNext = document.querySelector(".btn-next");
const pokePrev = document.querySelector(".btn-prev");
let pokeContador = 1


async function  fetchPoke (pokemon){
    const apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiPokemon.status === 200){
        // c o status for diferente de 200 (q é o para pokemons validos) o codigo vai pro not found
        const apiConvertida = await apiPokemon.json();

        return apiConvertida;
    }

}

async function renderPokemon(pokemon){
    pokemonId.textContent = "";
    pokemonName.textContent = "Loading..." //fica aqui pq vai aparecer antes da api renderizar 
    const dados = await fetchPoke(pokemon);

    if(dados){
        pokemonImg.style.display = "block"; // depois q ele cai no else e volta pra esse bloco. a img precisa ser convertida em display block dnv. 
        pokemonImg.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonId.textContent = dados.id;
        pokemonName.textContent = dados.name;
        pokeContador = dados.id; //vai guarda o id atual, assim vai da next ou prev sequencialmente.
    }else{
        pokemonImg.style.display = 'none';
        pokemonId.textContent = "";
        pokemonName.textContent = "Not Found";
    }
}

pokeForm.addEventListener("submit", function(e){
    e.preventDefault();
    renderPokemon(pokeInput.value.toLowerCase());
    pokeInput.value = "";
})

pokeNext.addEventListener("click", function(){
    pokeContador += 1;
    renderPokemon(pokeContador)
});

pokePrev.addEventListener("click", function(){
    if(pokeContador > 1){
        pokeContador -= 1;
        renderPokemon(pokeContador)
    }
});

renderPokemon(pokeContador)




