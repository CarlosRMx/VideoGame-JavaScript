//variables without events
let canvaSize;
let elemetSize;

const playerPosition={
    x:undefined,
    y:undefined,
};

const bambooPosition={
    x:undefined,
    y:undefined,
};


let enemyCollisions=[];
let level=0;
let lives=3;

let timeStart;
let timePlayer;
let timeInterval;

// control by typing a key
window.addEventListener('keydown',keyBoardControl);

//constrols by clicking a button
const goUp = document.querySelector('#up');
const goLeft = document.querySelector('#left');
const goRight = document.querySelector('#right');
const goDown = document.querySelector('#down');
const containerStatics = document.querySelector('.statics');
const displayLives = document.querySelector('#lives');
const displayTimer = document.querySelector('#timer');



const canvas = document.querySelector('#game');

// making a context to use canvas' methods
const displayLevels = canvas.getContext('2d');

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvaSize= window.innerWidth * 0.8;
    }else{
        canvaSize = window.innerHeight *0.8;
    }
    canvas.setAttribute('width',canvaSize);
    canvas.setAttribute('height',canvaSize);

    startGame();
}
    
function startGame(){

    //defining the size to the objects
    elemetSize = canvaSize / 10;
    displayLevels.font= elemetSize + 'px Verdana';
    displayLevels.textAlign = 'end';

    //obteniendo un array bidemensional para renderizar los mapas 
    const map = maps[level];
    if(!map){
        wonGame();
        return;
    }

    if(!timeStart){
        timeStart=Date.now();
        timeInterval=setInterval(timerControl,100);
    }
    const rowMap = map.trim().split('\n');
    const rowMapColumn = rowMap.map(row => row.trim().split(''));

    // console.log(rowMapColumn);
    //!limpiando todo mapa para rendeizar una nueva posicion del jugador
    enemyCollisions=[];
    displayLevels.clearRect(0,0,canvaSize,canvaSize);

    //*Recorriendo el array para renderizar el mapa
    rowMapColumn.forEach((row, rowIndex) => {
        row.forEach((column,columnIndex) =>{
            const figureMap = emojis[column];
            const posX = elemetSize * (columnIndex + 1);
            const posY = elemetSize * (rowIndex + 1);
            displayLevels.fillText(figureMap,posX,posY);

            //*renderizando la posicion inicial del jugador
            if(column === 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    //console.log(playerPosition);
                }
            }else if(column === 'I'){
                bambooPosition.x = posX;
                bambooPosition.y =  posY;

            }else if(column === 'X'){
                enemyCollisions.push({
                    x:posX,
                    y:posY,
                });
            }

            displayLevels.fillText(figureMap, playerPosition.x, playerPosition.y);
        });
    });
    
    displayPlayer();
    showLives();
}

function displayPlayer(){
    //*condicionales para detectar la colision con el bamboo
    const bambooCollisionX = Number(playerPosition.x).toFixed(3) == Number(bambooPosition.x).toFixed(3);
    const bambooCollisionY = Number(playerPosition.y).toFixed(3) == Number(bambooPosition.y).toFixed(3);
    const bambooCollision = bambooCollisionX && bambooCollisionY;

    if(bambooCollision){
        console.log('Gane');
        nextLevel();
    }
    const isCollision = enemyCollisions.find(enemy =>{
        const enemyPositionX = Number(playerPosition.x).toFixed(3) ==  Number(enemy.x).toFixed(3);
        const enemyPositionY = Number(playerPosition.y).toFixed(3) ==  Number(enemy.y).toFixed(3);;
        return enemyPositionX && enemyPositionY;
    });

    if(isCollision){
        // console.log('Chocaste :(');
        failedLevel();
    }

    displayLevels.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

function nextLevel(){
    level++;
    startGame();
}
function failedLevel(){
    //sistema de vidas
    showLives();

    lives--;
    // console.log(lives);

    //**Reiniciando el juego al nivel inicial al perder todas las vidas */
    if(lives <= 0){
        level=0;
        lives=3;
        timeStart=undefined;
    }
    
    //**Reiniciando el mismo nivel al colisionar una vez */
    playerPosition.x=undefined;
    playerPosition.y=undefined;
    startGame();
}

function wonGame(){
    console.log("Ganaste el juego");
    clearInterval(timeInterval);
}

function showLives(){
    displayLives.innerHTML=emojis['HEART'].repeat(lives);
}

function timerControl(){
    displayTimer.innerHTML = (Date.now() - timeStart)/1000;
}

function keyBoardControl(event){
    const key = event.code;
    
    switch (key) {
        case 'ArrowUp':
            moveUp();
            break;
        
        case 'ArrowLeft':
            moveLeft();
            break;
        
        case 'ArrowRight':
            moveRight();
            break;

        case 'ArrowDown':
            moveDown();
            break;
    
        default:
            break;
    }
}
// events by moving player
goUp.addEventListener('click',moveUp);
goLeft.addEventListener('click',moveLeft);
goRight.addEventListener('click',moveRight);
goDown.addEventListener('click',moveDown);

function moveUp(){
    if((playerPosition.y - elemetSize) < elemetSize){
        console.log('OUT');
    }else{
        playerPosition.y -=elemetSize;
        startGame();
    }
}
function moveLeft(){
    if((playerPosition.x - elemetSize) < elemetSize){
        console.log('OUT');
    }else{
        playerPosition.x -= elemetSize;
        startGame();
    }
}
function moveRight(){
    if((playerPosition.x + elemetSize) > canvaSize){
        console.log('OUT');
    }else{
        playerPosition.x += elemetSize;
        startGame();
    }
   
}
function moveDown(){
    if((playerPosition.y + elemetSize) > canvaSize){
        console.log('OUT');
    }else{
        playerPosition.y += elemetSize;
        startGame();
    }
}

