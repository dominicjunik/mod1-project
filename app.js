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
    objectArray = [];
    console.log(objectArray)
})




// ROUND DESIGN
let gameBoard = document.querySelector('.game-window');
gameBoard.addEventListener('click', (event) => {
    console.log(event.target.id)
    let selector1 = event.target;
    let key1 = objectArray[event.target.id].key
    console.log(key1)
    console.dir(event.target)
    event.target.classList.add('selected')
    gameBoard.addEventListener('click', (event) => {
        console.log('we got here')
        let selector2 = event.target;
        let key2 = objectArray[event.target.id].key
        if (key1 === key2){
            console.log('proper guess')
            selector1.classList.add('solved')
            selector2.classList.add('solved')
        }
        else{
            console.log('wrong guess')
            selector1.classList.remove('selected')
            selector2.classList.remove('selected')

        }
    })
});


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
