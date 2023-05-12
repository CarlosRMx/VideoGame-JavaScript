//variables without events
let canvaSize;
let elemetSize;

const playerPositon={
    x:undefined,
    y:undefined,
}
// control by typing a key
window.addEventListener('keydown',keyBoardControl);

//constrols by clicking a button
const goUp = document.querySelector('#up');
const goLeft = document.querySelector('#left');
const goRight = document.querySelector('#right');
const goDown = document.querySelector('#down');



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
    const map = maps[0];
    const rowMap = map.trim().split('\n');
    const rowMapColumn = rowMap.map(row => row.trim().split(''));

    console.log(rowMapColumn);
    //!limpiando todo mapa para rendeizar una nueva posicion del jugador
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
                if(!playerPositon.x && !playerPositon.y){
                    playerPositon.x = posX;
                    playerPositon.y = posY;
                    //console.log(playerPositon);
                    displayLevels.fillText(figureMap,playerPositon.x,playerPositon.y);
                }
            }
            displayPlayer();
        });
    });
            
   
    
    // displayLevels.fillRect(10,50,200,50);
    // displayLevels.clearRect(10,50,100,50);
    
    // displayLevels.font = '25px Verdana';
    // displayLevels.fillStyle='purple'
    // displayLevels.fillText('Carlos',25,25);
}

function displayPlayer(){
    displayLevels.fillText(emojis['PLAYER'],playerPositon.x,playerPositon.y);
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
    console.log('Arriba');
    if(playerPositon.y > elemetSize){
        playerPositon.y -=elemetSize;
    }
    console.log(playerPositon);
    startGame();
}
function moveLeft(){
    console.log('Izquierda');
    if(playerPositon.x > (elemetSize+10)){
        playerPositon.x -=elemetSize;
    }
    console.log(playerPositon);
    startGame();
}
function moveRight(){
    console.log('Derecha');
    if(playerPositon.x < (elemetSize *10)){
        playerPositon.x += elemetSize;
    }
    console.log(playerPositon);
    startGame();
}
function moveDown(){
    console.log('Abajo');
    if(playerPositon.y < (elemetSize *10)){
        playerPositon.y += elemetSize;
    }
    console.log(playerPositon);
    startGame();
}

