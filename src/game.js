// variable without events
let canvaSize;
let elemetSize;


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
    const elemetSize = canvaSize / 10;
    displayLevels.font= elemetSize + 'px Verdana';
    displayLevels.textAlign = 'end';

    //obteniendo un array bidemensional para renderizar los mapas 
    const map = maps[0];
    const rowMap = map.trim().split('\n');
    const rowMapColumn = rowMap.map(row => row.trim().split(''));

    console.log(rowMapColumn);

    rowMapColumn.forEach((row, rowIndex) => {
        row.forEach((column,columnIndex) =>{
            const figureMap = emojis[column];
            const posX = elemetSize * (columnIndex + 1);
            const posY = elemetSize * (rowIndex + 1);
            displayLevels.fillText(figureMap,posX,posY);
        });
    });
            
   
    
    // displayLevels.fillRect(10,50,200,50);
    // displayLevels.clearRect(10,50,100,50);
    
    // displayLevels.font = '25px Verdana';
    // displayLevels.fillStyle='purple'
    // displayLevels.fillText('Carlos',25,25);
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
}
function moveLeft(){
    console.log('Izquierda');
}
function moveRight(){
    console.log('Derecha');
}
function moveDown(){
    console.log('Abajo');
}