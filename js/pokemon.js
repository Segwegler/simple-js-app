//pokemon.js 
//a pokemon object for a simple js pokedex app


//IIFE container for pokemon list with simple public accessor and setter
let pokemonRepository = (function(){
  let pokemonList = [];
  function getAll(){
    return pokemonList;
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
  }
  
  //add a pokemon to the list this uses checkTypes to verify that it is a good object
  //will return true if object was added 
  //will return error object if object was not added
  function add(monster){
    let check = checkTypes(monster);
    if(check.good){
      pokemonList.push(monster);
      return true;
    }else{
      console.warn("tried to add either a non pokemon or a poorly constructed one to the repository", (typeof(check.var) === "undefined") ? "Missing key: " + check.key : check.error);
      return check;
    }
  }
  
  //getPokemonByName takes a string for a name and retuns the pokemon of that name
  //the name is not case sensitive
  function getPokemonByName(name){
    name = name.toLowerCase();
    return pokemonList.filter(monster => monster.name.toLowerCase() === name);
    
  }
  
  
  function getPokemonByType(type){
    type = type.toUpperCase();
    return pokemonList.filter(monster => monster.types.includes(type));
  }
  
  return { getAll: getAll, add: add, getPokemonByName: getPokemonByName, getPokemonByType: getPokemonByType};
  
})();

//Function Pokemon creates and returns an object conraining information pertaining to a pokemon
//keys included in a pokemon object are 
// int - id - the pokedex ID
// string - name
// float - height
// float - weight
// array of strings - types
// string - description 
// bool - canEvolve
// int - nextEvolution - The id of the next evolution
// int - prevEvolution - The id of the prev evolution
function makePokemon(id, name, height, weight, types, desc, canEvolve, nextEvolution, prevEvolution, species){
  let monster = {
    id: id,
    name: name,
    height: height,
    weight: weight,
    types: types,
    description: desc,
    canEvole: canEvolve,
    nextEvolution: nextEvolution,
    prevEvolution: prevEvolution,
    species: species,
  };
  
  
  return monster;
}


//returns formatted HTML info for the given pokemon
function getPokemonHtml(monster){
  return `<div class="pokemon" id="${monster.id}_${monster.name}">
        <div class="pokemon-info">
          <div class="pokemon-info__item">No ${monster.id.toString().padStart(3,'0')} ${monster.name}</div>
          <div class="pokemon-info__item">${monster.species}</div>
          <div class="pokemon-info__item">HT: ${monster.height} m</div>
          <div class="pokemon-info__item">WT: ${monster.weight} kg</div>
        </div>
        <a href="http://pokemondb.net/pokedex/${monster.name.toLowerCase()}" target="_blank"><img src="https://img.pokemondb.net/sprites/firered-leafgreen/normal/${monster.name.toLowerCase()}.png" alt="image of ${monster.name}" class="pokemon-image"></a>
      </div>`
}

//used to add html into an elemnt specified by an id
function addToElement(id, string){
  document.getElementById(id).innerHTML += string;
}

function displayPokemon(pList){
  
  let tallest = {height:null, id:null}; //id of tallet pokemon, used in loop
  
  pList.forEach(function(monster){
                        addToElement("screen", getPokemonHtml(monster));
                        if(tallest.height < monster.height){
                          tallest.height = monster.height;
                          tallest.id = monster.id;
                        }
                      });
  
  tallest = pList[tallest.id];//gets the actual pokemon from the index
  var inner = document.getElementById(`${tallest.id}_${tallest.name}`).getElementsByClassName("pokemon-info")[0].innerHTML += `<div class="pokemon-info__item tallest">The Tallest</div>`;//adds a identifing line to the tallest pekemon
}




//
//
//  TEMPORARY ADDITION OF POKEMON FOR TESTING
//
//


//Bulbasaur Evolution
pokemonRepository.add(makePokemon(1,"Bulbasaur", 0.7, 6.9, ["GRASS","POISON"], "There is a plant seed on its back right from the day this POKéMON is born. The seed slowly grows larger.", true, 2, null, "Seed Pokémon"));

pokemonRepository.add(makePokemon(2,"Ivysaur", 1.0, 13.0, ["GRASS","POISON"], "There is a plant bulb on its back. When it absorbs nutrients, the bulb is said to blossom into a large flower.", true, 3, 1, "Seed Pokémon"));

pokemonRepository.add(makePokemon(3,"Venusaur", 2.0, 100.0, ["GRASS","POISON"], "A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.", false, null, 2, "Seed Pokémon"));

//Charmander Evolution
pokemonRepository.add(makePokemon(4,"Charmander", 0.6, 8.5, ["FIRE"], "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.", true, 5, null, "Lizard Pokémon"));

pokemonRepository.add(makePokemon(5,"Charmeleon", 1.1, 19.0, ["FIRE"], "It lashes about with its tail to knock down its foe. It then tears up the fallen opponent with sharp claws.", true, 6, 4, "Flame Pokémon"));

pokemonRepository.add(makePokemon(6,"Charizard", 1.7, 90.5, ["FIRE","FLYING"], "Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.", false, null, 5, "Flame Pokémon"));

//Squirtle Evolution
pokemonRepository.add(makePokemon(7,"Squirtle", 0.5, 9.0, ["WATER"], "When it retracts its long neck into its shell, it squirts out water with vigorous force.", true, 8, null, "Tiny Turtle Pokémon"));

pokemonRepository.add(makePokemon(8,"Wartortle", 1.0, 22.5, ["WATER"], "This POKéMON is very popular as a pet. Its fur-covered tail is a symbol of its longevity.", true, 9, 7, "Turtle Pokémon"));

pokemonRepository.add(makePokemon(9,"Blastoise", 1.6, 85.5, ["WATER"], "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.", false, null, 8, "Shellfish Pokémon"));




