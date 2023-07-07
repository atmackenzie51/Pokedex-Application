// Setting a IIFE for Database of Gen 1 pokemon
let pokemonRepository = (function () {
  let pokemonList = [];

  //API for the first 150 pokemon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1'; 
  
  //functions add and getAll within the IIFE
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

  //function that puts pokemon as a button
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); //this looks in the document for pokemon-list
    let listPokemon = document.createElement("li"); //this creates a new list element
    
    //creates and sets modal parameters
    let modalContainer = document.createElement("div"); //creates a div
    modalContainer.classList.add('#modal-container'); //adds CSS
    modalContainer.setAttribute('id', 'modal-container'); //adds ID

    //creates and sets button parameters
    let button = document.createElement("button"); //this creates a new button element
    button.innerText = pokemon.name; //this has the inner text of the button be pokemon name defined in function in line 10 
    button.classList.add("button-class"); // this adds the CSS of button-class to the button
    button.setAttribute('id', 'show-modal'); //adds ID to button

    // adds a click listener
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });

    listPokemon.appendChild(button); //appends button to listPokemon
    pokemonList.appendChild(listPokemon); //appends listPokemon to PokemonList
  }
  
  
  

  function loadList(){
    //this fetches API from site defined in line 6 then executes function with response as a variable
    return fetch(apiUrl).then(function (response){ 
    // end function and returns response as a json, then executes function with json as variable   
      return response.json();
    }).then(function (json){ //executes function with json as variable
      json.results.forEach(function (item){ //for each result of json, execute function with item as variable
        let pokemon = { //creates variable pokemon as name = item.name and detailsUrl = item.url from API
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); //this adds pokemon to the loadList
      });
    }).catch(function (e){ //if promise above is rejected, execution function that will console log error
      console.error(e);
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    // fetch url, then return response as a json
    return fetch(url).then(function (response){
      return response.json();
    }).then(function(details){ //then executes function with details as variable
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){ //if promise is rejected, console log error
      console.error(e);
    });
  }

  // when button is clicked, shows pokemon details from API in console log
  function showDetails(item) {
    //the overarching function pokemonRepository promises to execute loadDetails with item as an input
    //on success, then it will console log the item
    pokemonRepository.loadDetails(item).then(function(){
      console.log(item);
    });
  }


  // IIFE keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList, 
    loadDetails: loadDetails,
    showDetails: showDetails,

  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
