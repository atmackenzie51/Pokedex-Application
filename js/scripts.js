// Setting a IIFE for Database of Gen 1 and 2 starter pokemon with a hatch steps
let pokemonRepository = (function () {
  let pokemonList = [];
  
  //API for the first 150 pokemon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 
  
  //two functions add and getAll within the IIFE
  function add(pokemon) {
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  //function that puts the DOM nodes as a list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");

    // adds a click listener
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }
  function loadList(){
    return fetch(apiUrl).then(function (response){
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  }

  // when button is clicked, shows pokemon details in console log
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function(){
      console.log(item);
    });
  }

  // creation of objects with the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList, 
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
