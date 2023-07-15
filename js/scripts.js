// Setting an IIFE for the Pokémon Repository
let pokemonRepository = (function () {
  let pokemonList = [];

  // API for the first 150 Pokémon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Functions add and getAll within the IIFE
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

  // Function that adds Pokémon as a list item
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listPokemon = document.createElement("li");
    listPokemon.classList.add("d-flex", "flex-column", "list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.shiny = details.sprites.front_shiny;
        item.height = details.height;
        item.types = details.types.map(function (type) {
          return type.type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(() => {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $("<h1>" + item.name + "</h1>");
    let pokemonImageDefault = $("<img class='modal-img' style='width:50%'>");
    pokemonImageDefault.attr("src", item.imageUrl);
    let pokemonImageShiny = $("<img class='modal-img' style='width:50%'>");
    pokemonImageShiny.attr("src", item.shiny);

    let pokemonHeight = $("<p>" + "Height : " + item.height/10 + "m" + "</p>");
    let capitalizedTypes = item.types.map(type => type.charAt(0).toUpperCase() + type.slice(1));
    let pokemonTypes = $("<p>" + "Types: " + capitalizedTypes.join(", ") + "</p>");



    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageDefault);
    modalBody.append(pokemonImageShiny);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
  }



  // Return public methods
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
