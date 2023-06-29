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
// let keyArray = [0, 1, 2, 3, 4, 5, 6, 7];
let keyArray = [
                    {key: 0, img: 'assets/eye.png'},
                    {key: 1, img: 'assets/pink-star.png'},
                    {key: 2, img: 'assets/crown.png'},
                    {key: 3, img: 'assets/black-cat.png'},
                    {key: 4, img: 'assets/flower.png'},
                    {key: 5, img: 'assets/hourglass.png'},
                    {key: 6, img: 'assets/cloud.png'},
                    {key: 7, img: 'assets/watermelon.png'},                    
                ]
// console.log(keyArray2)

class memoryObject {
    constructor(key, img){
        // a key value to check against its paired sibling
        this.key = key;
        // an img url to use
        this.img = img; 
    }
}

// creating the array of memory object-pairs
let objectArray = [];

//generating the memory Objects
function generateLogicBoard(){ 
    for (let i = 0; i < keyArray.length; i++){
        //pushing 2 objects with the same key value into the objectArray        
        // objectArray.push(new memoryObject(keyArray[i]));
        // objectArray.push(new memoryObject(keyArray[i]));
        objectArray.push(new memoryObject(keyArray[i].key, keyArray[i].img));
        objectArray.push(new memoryObject(keyArray[i].key, keyArray[i].img));
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

// SPAWN THE MEMORY TILES ON THE GAME WINDOW
function createTiles() {
    for(let i = 0; i < objectArray.length; i++){
        let parentBox = document.querySelector('.game-window');
        let newTile = document.createElement('div');
        newTile.setAttribute('class', 'memory-tile');
        // adds a unique ID to each visual tile to link with the objectArray        
        newTile.setAttribute('id', i);

        // diagnostic line to show the key-pair directly on the tiles  
        // newTile.innerText = objectArray[i].key;

        parentBox.appendChild(newTile);    
    }
}

// this function is to add the seleced CSS class and attach an background image to the tile
function addSelectedClass(selector) {
    selector.classList.add('selected');
    // add the background image - we need to get it from the keyArray Object
    selector.style.backgroundImage = `url('${objectArray[selector.id].img}')`   
}
// this funtion is to remove the .selected CSS class and to remove the inline style background img
function removeSelectedClass(selectorOne, selectorTwo) {
    selectorOne.classList.remove('selected');
    selectorOne.removeAttribute('style');
    selectorTwo.classList.remove('selected');
    selectorTwo.removeAttribute('style');
}




//////////////////////////
//     start the game   //
//////////////////////////
let inProgress = false;
let startButton = document.getElementById('start');
startButton.addEventListener("click", (event) => {
    if(!inProgress){         
        // creates the array of paired tiles
        generateLogicBoard();
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
    remainingTries = 10;
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
let clickLock = false;

//these variables keep track of the game and the win/loss conditions 
let victoryCount = 0;
let remainingTries = 10;
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
    if(!hasClicked && !clickedTwice && !clickLock){
    // enter this as the first loop
        selector1 = event.target;
        key1 = objectArray[event.target.id].key;
        // adding the .selected to the clicked box
        addSelectedClass(selector1);
        hasClicked = true;
    }
    //second click goes here
    else if(hasClicked && !clickLock){        
    // we set hasClicked to true at the end of the first click so the second click will go here
        selector2 = event.target;
        key2 = objectArray[event.target.id].key;        
        // adding the .selected to the clicked box         
        addSelectedClass(selector2);        
        //////////////////
        // pair success //
        //////////////////               
        if (key1 === key2){
            clickLock = true;
            // this timeout function lets you see the solved answer for a second before it swaps to green
            setTimeout(function(){
                selector1.classList.add('solved');
                selector2.classList.add('solved');
                //this function removes the .selected CSS and inline-style
                removeSelectedClass(selector1, selector2);
                //victory condition logic and display
                victoryCount++;
                if(victoryCount === keyArray.length) {
                    let winner = document.querySelectorAll('.solved')                    
                    winner.forEach((element) => {
                        element.classList.add('winner')
                    })
                    scoreboard.textContent = `YOU WIN :)`;
                }
                clickLock = false;  
            }, 200);
            
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
                //this function removes the .selected CSS and inline-style
                removeSelectedClass(selector1, selector2);
                clickedTwice = false;                               
            }, {once: true});            
            if(remainingTries === 0) {
                selector2.removeAttribute('style')
                let loser = document.querySelectorAll('.memory-tile')
                loser.forEach((element) => {
                    element.classList.add('loser')
                })
                scoreboard.textContent = `YOU LOSE`;
            }
        }
        // reset hasClicked back to false so the first click can start again.
        hasClicked = false;        
    };      
});

