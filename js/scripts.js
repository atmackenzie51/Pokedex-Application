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

pokemonList.forEach(function(pokemon){
  if (pokemon.height > 0.8) {
    document.write (
      pokemon.name + `: (Height: ${pokemon.height})` + " - WOW, that\'s a big one!"
    )
  }else{

  document.write(
    pokemon.name + `: (Height: ${pokemon.height})`
  );
  }
  document.write('<br> <br>')
});
