// Database of Gen 1 and 2 starter pokemon with a hatch steps
let pokemonList = [
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
  {
    name: "Chikorita",
    pokedexID: 152,
    height: 0.9,
    type: ["grass"],
    hatchSteps: 5100,
  },
  {
    name: "Cyndaquil",
    pokedexID: 155,
    height: 0.5,
    type: ["fire"],
    hatchSteps: 5100,
  },
  {
    name: "Totodile",
    pokedexID: 158,
    height: 0.6,
    type: ["water"],
    hatchSteps: 5100,
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.8) {
    document.write(
      pokemonList[i].name + ':' + ` (Height: ${pokemonList[i].height})` + ' - WOW, that\'s a big one!'
    );
  } else {
    document.write(
      pokemonList[i].name + ':' + ` (Height: ${pokemonList[i].height})`
    );
  }
  //adds a row space in-between each pokemon entry
  document.write('<br> <br>') 
}
