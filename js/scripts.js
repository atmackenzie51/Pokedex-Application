// Setting a IIFE for Database of Gen 1 and 2 starter pokemon with a hatch steps
let pokemonRepository = (function () {
  let pokeDex = [
    {
      name: "Bulbasaur",
      pokedexID: 1,
      height: 0.7,
      type: ["grass", "poison"],
      hatchSteps: 5100,
    },
    {
      name: "Charmander",
      pokedexID: 4,
      height: 0.6,
      type: ["fire"],
      hatchSteps: 5100,
    },
    {
      name: "Squirtle",
      pokedexID: 7,
      height: 0.5,
      type: ["water"],
      hatchSteps: 5100,
    },
  ];

  //two functions add and getAll within the IIFE
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokeDex.push(pokemon);
    }
  }

  function getAll() {
    return pokeDex;
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

  // when button is clicked, shows pokemon details in console log
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // creation of objects with the IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
