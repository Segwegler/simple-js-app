//States.js
//statres is a menu setup for a simple poedex web app
//inital state is 0 the main menu
//to get an inital display have a div with the id screen and run the function: draw();
//the draw cuntion is located at the end of this file with the helper functions

/*

  Example state
  
0:{
        //these first 4 variables seem like they wont be needed
		nextState: null, //where ok will lead
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

let states = {
	0:{//main menu
		nextState: null,
		prevState: 2,
		homeState: 0,
		message: "Main",
		prevButton: function(){
			let active = document.getElementsByClassName("menu__item__active")[0];//get the div that has this class
			let selection = parseInt(active.id.slice(active.id.lastIndexOf("_")+1));//taking the index out of the id of the div
			let menuItems = document.getElementsByClassName("menu__item");//get a list of menu items
			
			if(selection !== 0){//check if we can move up the list
		      selection--;//shift the selection index back one
		      active.classList.remove("menu__item__active"); //removes the active class from the past active menu item
		      menuItems[selection].classList.add("menu__item__active"); //add the active class to the current active item
              
			}
		},
		nextButton: function(){//similar to prevButton function
			let active = document.getElementsByClassName("menu__item__active")[0];
			let selection = parseInt(active.id.slice(active.id.lastIndexOf("_")+1));
			let menuItems = document.getElementsByClassName("menu__item");
			
			if(selection < menuItems.length-1){//makes sure that the slection is not past the end of the list
		      selection++;
		      active.classList.remove("menu__item__active");
		      menuItems[selection].classList.add("menu__item__active");
              
			}
		},
		homeButton: function(){
          
		},
		backButton: function(){
			
		},
		okButton: function(clickSelection){ //activate the menu item (most will porbeply cause state change)
		  //we parse the selector out of the id of the active menu item
          let active = document.getElementsByClassName("menu__item__active")[0];
		  let selection = clickSelection ? clickSelection : parseInt(active.id.slice(active.id.lastIndexOf("_")+1));
			
          //if to move to another state
		  if(selection === 0){
		    console.log("Num List");
            state = 1; //state of num list
            draw();
              
		  }else if(selection == 1){
		    console.log("other " + selection)
          }
			
		},
        //display function 
        //writes the html for the menu
        // this should be simplified a little, loop for habs and for search formats
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
            </div> `; 
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
		  state = 0;
          draw();
		},
		backButton: function(){
		  state = 0;
          draw();
		},
		okButton: function(){
			
		},
		display: function(){
		  let tallest = null; //id of tallet pokemon, used in loop
          for (let i = 1; i<pokemonList.length; ++i){ //loop to add all html for pokemon to screen
            document.getElementById("screen").innerHTML += getPokemonHtml(pokemonList[i]); // add html content to page
            
            //if to track the tallest pokemon
            if(tallest !== null){ 
              if(pokemonList[i].height > pokemonList[tallest].height){
                tallest = pokemonList[i].id; 
              }
            }else{
              tallest = pokemonList[i].id;
            }
          }//end of for loop 
          
          tallest = pokemonList[tallest];//gets the actual pokemon from the index
          var inner = document.getElementById(`${tallest.id}_${tallest.name}`).getElementsByClassName("pokemon-info")[0].innerHTML += `<div class="pokemon-info__item tallest">The Tallest</div>`;//adds a identifing line to the tallest pekemon

          document.getElementsByClassName("pokemon")[0].classList.add("pokemon__active");// make the first pokemon active
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





