let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("Pokemon is not correct")}function n(){return t}function o(t){return fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.shiny=e.sprites.front_shiny,t.height=e.height,t.types=e.types.map(function(t){return t.type.name})}).catch(function(t){console.error(t)})}function i(t){o(t).then(()=>{a(t)})}function a(t){let e=$(".modal-body"),n=$(".modal-title");$("#exampleModal").on("hidden.bs.modal",function(){n.empty(),e.empty()});let o=$("<h1>"+t.name+"</h1>"),i=$("<img class='modal-img' style='width:50%'>");i.attr("src",t.imageUrl);let a=$("<img class='modal-img' style='width:50%'>");a.attr("src",t.shiny);let l=$("<p><strong>Height:</strong> "+t.height/10+"m</p>"),r=$("<p><strong>Types:</strong> "+t.types.map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(", ")+"</p>");n.append(o),e.append(i),e.append(a),e.append(l),e.append(r)}return{add:e,getAll:n,addListItem:function t(e){let n=document.querySelector(".list-group"),o=document.createElement("li");o.classList.add("d-flex","flex-column","list-group-item");let a=document.createElement("button");a.innerText=e.name,a.classList.add("btn","btn-primary"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#exampleModal"),o.appendChild(a),n.appendChild(o),a.addEventListener("click",()=>{i(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:o,showDetails:i,showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});













