//pokemon.js 
//a pokemon object for a simple js pokedex app


//storage array for my pokedex
let pokemonList = [];

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

//I started at index 1 so that the pokedex IDs would match. its not nessisary but might make lookups for evolution simpler

//Bulbasaur Evolution
pokemonList[1] = (makePokemon(1,"Bulbasaur", 0.7, 6.9, ["GRASS","POISON"], "There is a plant seed on its back right from the day this POKéMON is born. The seed slowly grows larger.", true, 2, null, "Seed Pokémon"));

pokemonList.push(makePokemon(2,"Ivysaur", 1.0, 13.0, ["GRASS","POISON"], "There is a plant bulb on its back. When it absorbs nutrients, the bulb is said to blossom into a large flower.", true, 3, 1, "Seed Pokémon"));

pokemonList.push(makePokemon(3,"Venusaur", 2.0, 100.0, ["GRASS","POISON"], "A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.", false, null, 2, "Seed Pokémon"));

//Charmander Evolution
pokemonList.push(makePokemon(4,"Charmander", 0.6, 8.5, ["FIRE"], "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.", true, 5, null, "Lizard Pokémon"));

pokemonList.push(makePokemon(5,"Charmeleon", 1.1, 19.0, ["FIRE"], "It lashes about with its tail to knock down its foe. It then tears up the fallen opponent with sharp claws.", true, 6, 4, "Flame Pokémon"));

pokemonList.push(makePokemon(6,"Charizard", 1.7, 90.5, ["FIRE","FLYING"], "Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.", false, null, 5, "Flame Pokémon"));

//Squirtle Evolution
pokemonList.push(makePokemon(7,"Squirtle", 0.5, 9.0, ["WATER"], "When it retracts its long neck into its shell, it squirts out water with vigorous force.", true, 8, null, "Tiny Turtle Pokémon"));

pokemonList.push(makePokemon(8,"Wartortle", 1.0, 22.5, ["WATER"], "This POKéMON is very popular as a pet. Its fur-covered tail is a symbol of its longevity.", true, 9, 7, "Turtle Pokémon"));

pokemonList.push(makePokemon(9,"Blastoise", 1.6, 85.5, ["WATER"], "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.", false, null, 8, "Shellfish Pokémon"));




