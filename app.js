// MEMORY GAME
// grid of tile PAIRS that are randomized and hidden
// click on a tile to reveal it, click on a second one to reveal
// if the tiles are the same. they are removed
// You win when all the tiles are matched and removed
// you lose if you dont guess in enough rounds

// a single round consists of the player clicking on two tiles
// ===> if they are the same. remove them.
// ===> if they are different turn them back over
// add to the round counter
// absolute position?
// when the pairs are matched. add transparent + no pointer interaction

// event listeners for on click
//randomized array of tiles that are then fixed in position

// stretch goals - animations and images


///////////////////////
//   start of code   //
///////////////////////

// an array to keep track of all the pairs
// make them objects, each with a key and an image
let keyArray = [0, 1, 2, 3, 4, 5, 6, 7];

class memoryObject {
    constructor(key){
        // a key value to check against its paired sibling
        this.key = key;
        // boolean for solved puzzle (not sure this is needed)
        this.solved = false;
    }
}

// creating the array of memory object-pairs
let objectArray = [];

//generating the memory Objects
function generateBoard(){ 
    for (let i = 0; i < keyArray.length; i++){
        //pushing 2 objects with the same key value into the objectArray
        objectArray.push(new memoryObject(keyArray[i]));
        objectArray.push(new memoryObject(keyArray[i]));
    }
};


//// COPY AND PASTED Fisher-Yates SHUFFLING FUNCTION
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function createTiles() {
    for(let i = 0; i < objectArray.length; i++){
        let parentBox = document.querySelector('.game-window');
        let newTile = document.createElement('div');
        newTile.setAttribute('class', 'memory-tile');          
        newTile.setAttribute('id', i);

        // diagnostic line to show the key-pair directly on the tiles  
        newTile.innerText = objectArray[i].key;

        parentBox.appendChild(newTile);
       
        // newTile.addEventListener( () => roundStart() )
    }
}

// SPAWN THE MEMORY TILES ON THE GAME WINDOW


//////////////////////////
//     start the game   //
//////////////////////////
let inProgress = false;
let startButton = document.getElementById('start');
startButton.addEventListener("click", (event) => {
    if(!inProgress){         
        // creates the array of paired tiles
        generateBoard();
        // randomizes the indexes of the paired tiles
        shuffle(objectArray);
        console.log(objectArray);
        // creates the HTML elements that represent the tiles visually 
        createTiles();
        keepScore();
    }
    inProgress = true;    
})
//////////////////////////
//    reset the game    //
//////////////////////////
let resetButton = document.getElementById('reset');
resetButton.addEventListener("click", () => {
    // FUNCTION TO CLEAR ALL THE CHILD DIVS FROM THE GAME BOARD
    // parentBox is the Div holding all the elements
    let parentBox = document.querySelector('.game-window');
    let child = parentBox.lastElementChild;
    while(child){
        parentBox.removeChild(child)
        child = parentBox.lastElementChild;
    }
    inProgress = false;
    hasClicked = false;
    objectArray = [];
    console.log(objectArray);
    victoryCount = 0;
    remainingTries = 5;
    keepScore();
    scoreboard.textContent = '';
})




// ROUND DESIGN

// these constants are to keey track of the selected events while using one event listener
let selector1 = {};
let selector2 = {};
let key1 = 0;
let key2 = 0;
// these booleans keep track of which click is currently active to prevent double clicking the same tile being a success case
let hasClicked = false;
let clickedTwice = false;

//these variables keep track of the game and the win/loss conditions 
let victoryCount = 0;
let remainingTries = 5;
//this builds the scoreboard, it will be updated in the game loop and win/loss conditions
let scoreboard = document.getElementById('score');
function keepScore(){
    scoreboard.textContent = `Remaining Tries: ${remainingTries}`;
}




///////////////////////////
//     MAIN GAME LOOP    //
///////////////////////////
let gameBoard = document.querySelector('.game-window');
gameBoard.addEventListener('click', (event) => {
    // first click happens
    if(!hasClicked && !clickedTwice){
    // enter this as the first loop
        selector1 = event.target;
        key1 = objectArray[event.target.id].key;
        event.target.classList.add('selected')
        hasClicked = true;
    }
    //second click goes here
    else if(hasClicked){        
    // we set hasClicked to true at the end of the first click so the second click will go here
        selector2 = event.target;
        key2 = objectArray[event.target.id].key;        
        //adding the .selected to the clicked box
        event.target.classList.add('selected')
        //////////////////
        // pair success //
        //////////////////               
        if (key1 === key2){            
            selector1.classList.add('solved');
            selector2.classList.add('solved');
            selector1.classList.remove('selected');
            selector2.classList.remove('selected');
            //victory condition logic and display
            victoryCount++;
            if(victoryCount === keyArray.length) {
                let winner = document.querySelectorAll('.solved')
                console.log(winner)
                winner.forEach((element) => {
                    element.classList.add('winner')
                })
                scoreboard.textContent = `YOU WIN :)`;
            }   
        }            
        //////////////////
        // pair failure //
        ////////////////// 
        else {
            selector2.style.pointerEvents = 'all';
            clickedTwice = true;
            remainingTries--;
            keepScore();            
            event.target.addEventListener('mouseleave', () => {
                selector1.classList.remove('selected');
                selector2.classList.remove('selected');
                selector2.removeAttribute('style')
                clickedTwice = false;                               
            }, {once: true});            
            if(remainingTries === 0) {
                let loser = document.querySelectorAll('.memory-tile')
                console.log(loser)
                loser.forEach((element) => {
                    element.classList.add('loser')
                })
                scoreboard.textContent = `YOU LOSE`;
            }
        }
        // reset hasClicked back to false so the first click can start again.
        hasClicked = false;
    }      
});

// thoughts on solution to current problem -- first event saves its target, then runs a function
// this function removes the first event listener then adds a new one
// ALTERNATE solution, set boolean, if not active use event listener,  


// what if i set the background image to the symbols from the array

// Click on a tile
// Event listener => get tile ID and display the key from the same index in the object array
// either as innerHTML or as a seperate class of tile in CSS
// objectArray[tileID].key

// Click a second tile
// Event listener => Same process to display the key

// IF BOTH KEYS ARE THE SAME
// Add solved class to the tiles
// ELSE IF KEYS ARE DIFFERENT
// update the chances left count (loss condition)
// transition the tiles back to a preselected state
///////////
// WHEN WE LOSE
///////////
// forEach add skull image background to the memory-tile class and set to no pointer