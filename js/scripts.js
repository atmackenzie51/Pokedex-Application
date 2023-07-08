// Setting a IIFE for Database of Gen 1 pokemon
let pokemonRepository = (function () {
  let pokemonList = [];

  //API for the first 150 pokemon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  
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

    //creates and sets button parameters
    let button = document.createElement("button"); //this creates a new button element
    button.innerText = pokemon.name; //this has the inner text of the button be pokemon name defined in function in line 10 
    button.classList.add("button-class"); // this adds the CSS of button-class to the button
    button.setAttribute('id', 'show-modal'); //adds ID to button

    listPokemon.appendChild(button); //appends button to listPokemon
    pokemonList.appendChild(listPokemon); //appends listPokemon to PokemonList
    // adds a click listener
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
    

    
  }
  
  

  function loadList(){
    //this fetches API then executes function with response as a variable
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
  loadList(item).then(function (){ 
    loadDetails(item).then(function() {
      showModal(item.name, "Height: " + item.height/10 + "m", item.imageUrl);
    });
    
  });

}


  function showModal (title, text, img) {

    // Clear all existing modal content
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title; 
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.classList.add('modal-img');
    imageElement.setAttribute("src", img);
    imageElement.setAttribute("width", "300");
    imageElement.setAttribute("height", "300");
    imageElement.setAttribute("alt", "sprite");
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

  
    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

function hideModal () {
  modalContainer.classList.remove('is-visible');
}
  
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  


  // IIFE keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList, 
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal

  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
