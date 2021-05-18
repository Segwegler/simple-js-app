//States.js
//statres is a menu setup for a simple poedex web app
//inital state is 0 the main menu
//to get an inital display have a div with the id screen and run the function: draw();
//the draw cuntion is located at the end of this file with the helper functions

/*

  Example state
  
0:{
		nextState: null, //this might not be needed 
		prevState: 2, //this should be where the back button will lead
		homeState: 0, //where the home button will lead
		message: "Main", //debug message
        
        //functions for the buttons
		prevButton: function(){}, 
		nextButton: function(){},
		homeButton: function(){},
		backButton: function(){},
		okButton: function(clickSelection){},
        
        //function to draw to the screen
		display: function(){},
	},

*/



//variable to track current state
let state = 0;
//the list of states, each state has 

let states = {//main menu
	0:{
		nextState: null,
		prevState: 2,
		homeState: 0,
		message: "Main",
		prevButton: function(){
			let active = document.getElementsByClassName("menu__item__active")[0];
			let selection = parseInt(active.id.slice(active.id.lastIndexOf("_")+1));
			let menuItems = document.getElementsByClassName("menu__item");
			
			if(selection !== 0){
				selection--;
				active.classList.remove("menu__item__active");
				menuItems[selection].classList.add("menu__item__active");
			}
		},
		nextButton: function(){
			let active = document.getElementsByClassName("menu__item__active")[0];
			let selection = parseInt(active.id.slice(active.id.lastIndexOf("_")+1));
			let menuItems = document.getElementsByClassName("menu__item");
			
			if(selection < menuItems.length-1){
				selection++;
				active.classList.remove("menu__item__active");
				menuItems[selection].classList.add("menu__item__active");
			}
		},
		homeButton: function(){
			state = this.homeState;
			console.log(state);
		},
		backButton: function(){
			state = this.prevState;
			console.log(state);
		},
		okButton: function(clickSelection){
			let active = document.getElementsByClassName("menu__item__active")[0];
			let selection = clickSelection ? clickSelection : parseInt(active.id.slice(active.id.lastIndexOf("_")+1));
			
			if(selection === 0){
		      console.log("Num List");
              state = 1; //state of num list
              draw();
              
			}else if(selection == 1){
			 console.log("other " + selection)
			}
			
		},
		display: function(){
			document.getElementById("screen").innerHTML = `
			<div class="menu__title">POKeDEX	Table Of Contents</div>
            <div class="menu">
		      <div class="menu__header">POKeMON LIST</div>
		      <div class="menu__item menu__item__active" onClick="states[state].okButton(0)" id="menu_item_0"> NUMERICAL MODE </div>
		      <div class="menu__header">POKeMON HABITATS</div>
              <div class="menu__item" onClick="states[state].okButton(1)" id="menu_item_1"> Grassland POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(2)" id="menu_item_2"> Forest POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(3)" id="menu_item_3"> Water's-edge POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(4)" id="menu_item_4"> Sea POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(5)" id="menu_item_5"> Cave POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(6)" id="menu_item_6"> Mountain POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(7)" id="menu_item_7"> Rough-terrain POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(8)" id="menu_item_8"> Urban-terrain POKeMON </div>
              <div class="menu__item" onClick="states[state].okButton(9)" id="menu_item_9"> Rare-terrain POKeMON </div>
              <div class="menu__header">SEARCH</div>
              <div class="menu__item" onClick="states[state].okButton(10)" id="menu_item_10"> A TO Z MODE </div>
              <div class="menu__item" onClick="states[state].okButton(11)" id="menu_item_11"> TYPE MODE </div>
              <div class="menu__item" onClick="states[state].okButton(12)" id="menu_item_12"> LIGHTEST MODE </div>
              <div class="menu__item" onClick="states[state].okButton(13)" id="menu_item_13"> SMALLEST MODE </div>
            </div> `; // this should be simplified a little, loop for habs and for search formats
		},
	},
  
    //Numeric List of Pokemon
	1:{
		nextState: 2,
		prevState: 0,
		message: "sub 1",
		prevButton: function(){
		  let active = document.getElementsByClassName("pokemon__active")[0];
          let selection = parseInt(active.id.slice(0,active.id.indexOf("_")));
		  let monsters = document.getElementsByClassName("pokemon");
			
		  if(selection !== 1){
		    selection--;
			active.classList.remove("pokemon__active");
			monsters[selection-1].classList.add("pokemon__active");
            monsters[selection-1].scrollIntoView({ behavior: 'smooth'});
		  }else{
            console.log("tried to access before start of list")
          }
		},
		nextButton: function(){
		  let active = document.getElementsByClassName("pokemon__active")[0];
          let selection = parseInt(active.id.slice(0,active.id.indexOf("_")));
		  let monsters = document.getElementsByClassName("pokemon");
			
		  if(selection < monsters.length){
		    selection++;
			active.classList.remove("pokemon__active");
			monsters[selection-1].classList.add("pokemon__active");
            monsters[selection-1].scrollIntoView({ behavior: 'smooth'});
		  }else{
            console.log("tried to go past end")
          }
		},
		homeButton: function(){
			state = homeState;
			console.log(state);
		},
		backButton: function(){
			
		},
		okButton: function(){
			
		},
		display: function(){
		  let tallest = null; //id of tallet pokemon, used in loop
          document.getElementById("screen").innerHTML = '';
          for (let i = 1; i<pokemonList.length; ++i){
            document.getElementById("screen").innerHTML += getPokemonHtml(pokemonList[i]); // add html content to page
    
            if(tallest !== null){
              if(pokemonList[i].height > pokemonList[tallest].height){
                tallest = pokemonList[i].id; 
              }
            }else{
              tallest = pokemonList[i].id;
            }
          }
          tallest = pokemonList[tallest];
          var inner = document.getElementById(`${tallest.id}_${tallest.name}`).getElementsByClassName("pokemon-info")[0].innerHTML += `<div class="pokemon-info__item tallest">The Tallest</div>`;

          document.getElementsByClassName("pokemon")[0].classList.add("pokemon__active");
		}
	},
	2:{
		nextState: 0,
		prevState: 1,
		message: "sub 2",
		prevButton: function(){
			
		},
		nextButton: function(){
			
		},
		homeButton: function(){
			
		},
		backButton: function(){
			
		},
		okButton: function(){
			
		},
		display: function(){
			
		}
	}
	
}


//Helper functions

//draw
//clears screen and draws current state
function draw(){
  document.getElementById("screen").innerHTML = '';
  states[state].display();
}





