//pokemon.js 
//a pokemon object for a simple js pokedex app


//IIFE container for pokemon list with simple public accessor and setter
let pokemonRepository = (function(){
  let pokemonList = [];
  let pokemonLimit = 150;
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}`; 
  
  function getAll(){
    return pokemonList;
  }
  
  function loadList(){
    return fetch(apiUrl).then(function(response){ 
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let monster = {
          name: item.name,
          detailsUrl: item.url,
          id: parseInt(item.url.slice(item.url.indexOf("pokemon")+8,item.url.length-1))
        };
        add(monster);
      });
    }).catch(function(e) {
      console.log(e);
    });
  }
  
  function loadDetails(monster){
    let url = monster.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      monster.imageUrl = details.sprites.front_default;
      monster.height = details.height;
      monster.weight = details.weight;
      monster.types = details.types;
    }).catch(function(e){
      console.log(e);
    });
  }
  
  function checkTypes(monster){
    //check that id is an int
    if(typeof(monster.id) !== "number" || monster.id % 1 !== 0)
      return {good:false, var:monster.id, key:"id", error:"ERROR: id must be an int"};
    
    
    //check that name is a string
    if(typeof(monster.name) !== "string" )
      return {good:false, var:monster.name, key:"name", error:"ERROR: name must be a string"};
    
    
    //check that height is a number
    if(typeof(monster.height) !== "number")
      return {good:false, var:monster.height, key:"height", error:"ERROR: height must be a number"};
    
    
    //check that weight is a number
    if(typeof(monster.weight) !== "number")
      return {good:false, var:monster.weight, key:"weight", error:"ERROR: weight must be a number"};
    
    
    //check that types is an array of strings 
    if(!Array.isArray(monster.types)){
      return {good:false, var:monster.types, key:"types", error:"ERROR: types must be an array of strings"};
    }else{//make sure the elemets of the object are strings
      let allStrings = true;
      monster.types.forEach(function(e){(typeof(e) !== "string") ? allStrings=false: null});
      if(!allStrings)
        return {good:false, var:monster.types, key:"types", error:"ERROR: types must be an array of strings"};
    }
    
    
    //check description is a string
    if(typeof(monster.description) !== "string" )
      return {good:false, var:monster.description, key:"description", error:"ERROR: description must be a string"};
    //check if can evolve is a bool
    if(typeof(monster.canEvole) !== "boolean")
      return {good:false, var:monster.canEvole, key:"canEvolve", error:"ERROR: canEvolve must be a boolean"};
    
    //chech can evolve
    if(monster.canEvole === true){
      // check that nextEvolution is an int
      if(typeof(monster.nextEvolution) !== "number" || (monster.nextEvolution % 1)!== 0 || monster.nextEvolution < 1)
        return {good:false, var:monster.nextEvolution, key:"nextEvolution", error:"ERROR: nextEvolution must be a int that is 1 or higher"};
    }else{
      if(monster.nextEvolution !== null)
        return {good: false, var:monster.nextEvolution, key:"nextEvolution", error:"ERROR: if canEvolve is false nextEvolution must be null"};
    }
    
    
    // check that prevEvolution is a number or null
    if(!(typeof(monster.prevEvolution) === "number" && (monster.prevEvolution % 1)=== 0 && monster.prevEvolution >= 1) && monster.prevEvolution !== null)
      return {good:false, var:monster.prevEvolution, key:"prevEvolution", error:"ERROR: prevEvolution must be a int or null - "+monster.name+ " - "+monster.prevEvolution};
    
    
    //chech that species is a string
    if(typeof(monster.species) !== "string")
      return {good:false, var:monster.species, key:"species", error:"ERROR: description must be a string"};
    
    
    //return that there were no errors 
    return {good:true, var:null, error:null};
  }//END OF checkTypes function
  
  //FUNCTION add
  //add a pokemon to the list this uses checkTypes to verify that it is a good object
  //takes a pokemon object
  //will return true if object was added 
  //will return error object if object was not added
  function add(monster){
    if(typeof(monster.name) === "string"){
      pokemonList.push(monster);
      return true;
    }else{
      console.log(monster, "error adding pokemon to list");
      /*
      console.warn("tried to add either a non pokemon or a poorly constructed one to the repository", (typeof(check.var) === "undefined") ? "Missing key: " + check.key : check.error);
      return check;
      */
    }
  }
  
  //getPokemonByName takes a string for a name and retuns the pokemon of that name
  //the name is not case sensitive
  function getPokemonByName(name){
    if(typeof(name) !== "string"){
      return {good:false , error:"ERROR: Name must be a string"};
    }
    name = name.toUpperCase();
    return pokemonList.filter(monster => monster.name.toUpperCase() === name);
    
  }
  
  //getPokemonByName takes a string for a name and retuns the pokemon of that name
  //the name is not case sensitive
  function getPokemonById(id){
    if(typeof(id) !== "number"){
      return {good:false , error:"ERROR: id must be a Number"};
    }
    return pokemonList.filter(monster => monster.id === id);
    
  }
  
  //FUNCTION getPokemonByType
  //takes a string
  function getPokemonByType(type){
    if(typeof(type) !== "string"){
      return {good:false , error:"ERROR: Type must be a string"};
    }
    type = type.toUpperCase();
    return pokemonList.filter(monster => monster.types.includes(type));
  }
  
  //showDetails 
  //Opens a Modal with the pokemon info and image
  function showDetails(monster){
    loadDetails(monster).then(function(){
      showModal(monster, monster.name, `Height: ${monster.height}m Weight: ${monster.weight}`, monster.imageUrl);
    }).catch(function(e){
      console.log(e);
    });
  }
  
  
  ///addListItem function
  //
  function addListItem(monster){
    let list = document.querySelector(".pokemon-list");
    let item = document.createElement("li");
    let button = document.createElement("button");
      
    //populate button element
    button.innerText = monster.name;
    button.classList.add("pokemon");
    button.setAttribute('id', `${monster.id} ${monster.name}`);
    button.addEventListener('click', function(){showDetails(monster); })
    //adding button to list item
    item.appendChild(button);
      
    //adding list item to list
    list.appendChild(item);
  }
  
  
  //
  //Modal Functions
  //
  
  let activePokemon = null;
  
  let modalContainer = document.querySelector("#modal-container");
  function showModal(monster){
    
    activePokemon = monster.id;
    
    //clear the current contents
    modalContainer.innerHTML = "";

    //create a new modal element
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //create a close button element
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click",hideModal);

    //create an element for the title
    let titleElement = document.createElement("h1");
    titleElement.innerText = monster.name;
    
    //create the container for the info
    let infoContainerElement = document.createElement("div");

    //create the body element
    let heightElement = document.createElement("p");
    heightElement.innerText = `Height: ${monster.height}`;
    
    let imageElement = document.createElement("img");
    imageElement.src = monster.imageUrl;
    //add all the elements to the modal 
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    
    infoContainerElement.appendChild(imageElement);
    infoContainerElement.appendChild(heightElement);
    modal.appendChild(infoContainerElement);
    
    modalContainer.appendChild(modal);
    modalContainer.setAttribute("draggable","false");

    //display the modal
    if(!modalContainer.classList.contains("is-visible")){
      modalContainer.classList.add("is-visible");
    }
  }
  
  
  //hideModal sets display none for the modal
  function hideModal(){
    modalContainer.classList.remove("is-visible");
    activePokemon = null;
  }

  //
  //Event listeners
  //
  let startX = null;
  let lastX = null;
  
  window.addEventListener("touchstart", (e)=>{
    
    //console.log("start touch",e.touches[0].clientX);
    startX = e.touches[0].clientX;
    
  });
  
  window.addEventListener("touchmove", (e)=>{
    
    //console.log("start move",e.touches[0].clientX);
    lastX = e.touches[0].clientX;
    
  });
  
  window.addEventListener("touchend", (e)=>{
    if(!startX){
      return;
    }
    //console.log("start end",Math.abs(startX - lastX));
    if(Math.abs(startX - lastX) > 20){
      if(lastX > startX){
        if(activePokemon > 1){
          showDetails(getPokemonById(activePokemon-1)[0]);
          //console.log("prev");
          
          startX = null;
          lastX = null;
          
        }
      }else{
        if(activePokemon<pokemonLimit){
          showDetails(getPokemonById(activePokemon+1)[0]);
          //console.log("next");
          startX = null;
          lastX = null;
        
        }
      }
    }
    
  });
  
  window.addEventListener("keydown", (e)=>{
    
    if(e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  
  modalContainer.addEventListener("click", (e)=> {
      let target = e.target;
      if(target === modalContainer){
        hideModal();
      }
  });
  
  
  return { getAll: getAll, add: add, getPokemonByName: getPokemonByName, getPokemonById: getPokemonById, getPokemonByType: getPokemonByType, addListItem: addListItem, loadList: loadList, loadDetails: loadDetails};
  
})();//END OF IIFE for pokemon repository


function displayPokemon(){  
  //add each pokemon to the list
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(monster){ pokemonRepository.addListItem(monster); });
  })
  
}



displayPokemon();
