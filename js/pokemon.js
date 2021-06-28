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
  
  //loadList
  //lads te list of pokemon with minimal infor from 
  function loadList(){
    return $.ajax(apiUrl, {dataType: 'json'}).then(
      function(responseJSON){
        responseJSON.results.forEach(function(item){
          let monster = {
          name: item.name,
          detailsUrl: item.url,
          id: parseInt(item.url.slice(item.url.indexOf("pokemon")+8,item.url.length-1))
        };
        add(monster);
          
        });
      }
    ).catch(function(e){console.log(e)});
  }
  
  //loadDetails
  //loads additional information form the pokeAPI for the specified pokemon
  function loadDetails(monster){
    let url = monster.detailsUrl;
    
    return $.ajax(url, {dataType: 'json'}).then(
      function(responseJSON){
        monster.imageUrl = responseJSON.sprites.front_default;
        monster.height = responseJSON.height;
        monster.weight = responseJSON.weight;
        monster.types = responseJSON.types;
      }
    ).catch(function(e){console.log(e);});
  }
  
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
    let list = $("#pokemon-list");
    let button = $(`<button type="button"></button>`);
      
    
    
    //populate button element
    
    button.addClass("list-group-item");
    button.addClass("list-group-item-action");
    button.addClass("text-center");
    
    //alternate between light and dark
    if(monster.id%2){ 
      button.addClass("list-group-item-light"); 
    }else{
       button.addClass("list-group-item-dark");
    }
    
    button.attr('id', `${monster.id}-${monster.name}`);
    button.attr('data-toggle', "modal");
    button.attr('data-target', "#Modal");
    button.click(function(){showDetails(monster); })
    
    let name = monster.name;
    name = name[0].toUpperCase() + name.slice(1);
    button.text(name);
  
      
    //add the button to the list of buttons
    list.append(button);
  }
  
  
  //
  //showModal
  //takes a pokemon from the list and creates a modal with that pokemons information
  //
  function showModal(monster){
    
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-title");
    let modalBody = $(".modal-body");
    
    //cleat the modal titel and body
    modalTitle.empty();
    modalBody.empty();   
    
    let name = monster.name;
    name = name[0].toUpperCase() + name.slice(1);
    //pokemons naem
    let nameElement = $(`<h2>${name}</h2>`);
    
    //image of the pokemon
    let imgElement = $(`<img class="modal-img" src="${monster.imageUrl}">`)
    
    //information element
    let heightElement = $(`<p>Height: ${monster.height}m</p>`);
    
    //add elemets to there proper locations in the modal
    modalTitle.append(nameElement);
    modalBody.append(imgElement);
    modalBody.append(heightElement);
    
  }
  
  return { getAll: getAll, add: add, getPokemonByName: getPokemonByName, getPokemonById: getPokemonById, getPokemonByType: getPokemonByType, addListItem: addListItem, loadList: loadList, loadDetails: loadDetails};
  
})();//END OF IIFE for pokemon repository


function displayPokemon(){  
  //add each pokemon to the list
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(monster){ pokemonRepository.addListItem(monster); });
  })
  
}



displayPokemon();
