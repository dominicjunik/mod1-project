// for(let i = 0; i < 8; i++){
//     for(let j = 0; j < 8; j++){
//         let gridPoint = document.createElement('div');

//     }
// }
const outerBox = document.getElementById('outer')
for(let i = 0; i < 100; i++){
    const newTile = document.createElement('div');
    newTile.classList.add('cobblestone');
    if(i < 10){
        newTile.setAttribute('id', `0${i}`)
    }
    else{
        newTile.setAttribute('id', i)
    }
    outerBox.appendChild(newTile)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }


class Hero {
    constructor(name){
        this.name = name;
        this.hp = 30;        
        this.xPosition = getRandomInt(0, 10);       
        this.yPosition = getRandomInt(0, 10);        
        this.positon = `${this.yPosition}${this.xPosition}`;
        
    }
    setPosition(x, y){
        this.xPosition = x;
        this.yPosition = y;
        this.positon = `${x}${y}`;
    }
    moveLeft(){
        if ((this.xPosition - 1) >= 0){
            this.setPosition((this.xPosition - 1), this.yPosition);
            console.log(this.xPosition)
        }
        else{
            this.setPosition(0, this.yPosition);
            console.log(this)
        }
        // here we would call an update visual position function?>??>>??>                          
    }
    helloWorld(){
        console.log('HELP ME AHHHHH')
    }  
}

///////////////////////////
// Created the character //
///////////////////////////
let user = new Hero('Gnadalf');

//// call function to display character
// append child?

// this needs to be a function that we can call and look for over and over
let wizardTile = document.getElementById(user.positon);
console.log(wizardTile);
let wizardImage = document.createElement('div');
wizardImage.classList.add('wizard');
wizardTile.appendChild(wizardImage);

let moveLeftButton = document.querySelector('.moveLeft');
console.log(user)
moveLeftButton.addEventListener('click', () => user.moveLeft())

console.log(user)
user.setPosition(5, 9)
console.log(user)
user.moveLeft();
console.log(user)

