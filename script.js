const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const restartBtn = document.querySelector("#restartGame");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const ballColor = "red";
const platformColor = "green";
const border = "black"
const brickColor = "orange";
const brickColor2 = "purple";
const brickColor3 = "yellow";
const gameInterval = setInterval(nextTick, 13);

let moveRight = 3;
let moveBallDistanceL = 3;
let moveBallDistanceR = 3;
let score = 0;

let running = false;
let gameOver = false;

let ball = {
    width: 10,
    height: 19,
    x: 50, y: 100
}

let platform = {
    width: 100,
    height: 20,
    x: 40, y: 425
}


let bricks = [
    {x:0, y: 0, width:100, height:30, id: 1},
    {x:100, y:0, width:100, height:30, id: 2},
    {x:200, y:0, width:100, height:30, id: 3},
    {x:300, y:0, width:100, height:30, id: 4},
    {x:400, y:0, width:100, height:30, id: 5},
];
let bricks2 = [
    {x:0, y: 30, width:100, height:30, id: 6},
    {x:100, y:30, width:100, height:30, id: 7},
    {x:200, y:30, width:100, height:30, id: 8},
    {x:300, y:30, width:100, height:30, id: 9},
    {x:400, y:30, width:100, height:30, id: 10},
];
let bricks3 = [
    {x:0, y: 60, width:100, height:30, id: 11},
    {x:100, y:60, width:100, height:30, id: 12},
    {x:200, y:60, width:100, height:30, id: 13},
    {x:300, y:60, width:100, height:30, id: 14},
    {x:400, y:60, width:100, height:30, id: 15},
];



window.addEventListener("keydown", changeDirection);


window.addEventListener("keyup", event => {
    const keyPressed = event.keyCode;
    if(keyPressed == 32){
        resetGame();
    }
})


startingScreen();
// gameStart();

function gameStart(){
    gameOver = false;
    running = true;
    drawPlatform();
    drawBall();
    drawBrick();
    nextTick();
}

function nextTick(){
    if(running){
            clearBoard();
            movePlatform();
            drawPlatform();
            moveBall();
            drawBall();
            drawBrick();
    }
    else if(!running && gameOver == true){
        displayGameOver();
    }
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;

    switch(true){
        case(keyPressed == LEFT):
            moveRight = -3;
            break;
        case(keyPressed == RIGHT):
            moveRight = 3;
            break;

    }
}

function resetGame(){
    gameOver = false;
    score = 0;
    bricks = [
        {x:0, y: 0, width:100, height:30, id: 1},
        {x:100, y:0, width:100, height:30, id: 2},
        {x:200, y:0, width:100, height:30, id: 3},
        {x:300, y:0, width:100, height:30, id: 4},
        {x:400, y:0, width:100, height:30, id: 5},
    ];
    bricks2 = [
        {x:0, y: 30, width:100, height:30, id: 6},
        {x:100, y:30, width:100, height:30, id: 7},
        {x:200, y:30, width:100, height:30, id: 8},
        {x:300, y:30, width:100, height:30, id: 9},
        {x:400, y:30, width:100, height:30, id: 10},
    ];
    bricks3 = [
        {x:0, y: 60, width:100, height:30, id: 11},
        {x:100, y:60, width:100, height:30, id: 12},
        {x:200, y:60, width:100, height:30, id: 13},
        {x:300, y:60, width:100, height:30, id: 14},
        {x:400, y:60, width:100, height:30, id: 15},
    ];
    moveRight = 3;
    moveBallDistanceL = 3;
    moveBallDistanceR = 3;
    
    ball = {
    width: 10,
    height: 19,
    x: 50, y: 100
}

    platform = {
    width: 100,
    height: 20,
    x: 40, y: 425
}
    gameStart();
    setInterval(gameInterval);
}

function drawBall(){

    ctx.beginPath();
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = border;
    ctx.arc(ball.x, ball.y, ball.width, ball.height, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function moveBall(){
    ball.y += moveBallDistanceL;
    ball.x += moveBallDistanceR;

    if(ball.y == platform.y - 10 && ball.x > platform.x && ball.x < platform.x + platform.width / 2) {
        moveBallDistanceL = -3;
        moveBallDistanceR = -1.5;
    }else if(ball.y == platform.y - 10 && ball.x > platform.x && ball.x < platform.x + platform.width) {
        moveBallDistanceL = -3;
        moveBallDistanceR = 1.5;
    }
    else if(ball.x >= gameWidth - ball.width){
        moveBallDistanceR = -3;
    }
    else if(ball.x <= 0 + ball.width){
        moveBallDistanceR = 3;
    }
    else if(ball.y <= 0 + ball.width){
        moveBallDistanceL = 3;
    }
    
    else if(ball.y > gameHeight - ball.height + 7){
        running = false;
        displayGameOver();
    }
bricks.forEach(function (brick) {
    let brickID = brick.id;
        if(ball.y == brick.height + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == 3)
            bricks.forEach((brick, index) => {
                if(brick.id == brickID){
                    bricks.splice(index, 1);
                    moveBallDistanceL = -3;
                    score++;
                }})
    });
  bricks.forEach(function (brick) {
    let brickID = brick.id;
    if(ball.y == brick.height + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == -3)
        
        bricks.forEach((brick, index) => {

            if(brick.id == brickID){
                bricks.splice(index, 1);
                moveBallDistanceL = 3;
                score++;
            }
        });
    
    
        
  });
  bricks2.forEach(function (brick) {
    let brickID2 = brick.id;
    if(ball.y == brick.height * 2 + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == 3)
        
        bricks2.forEach((brick, index) => {

            if(brick.id == brickID2){
                bricks2.splice(index, 1);
                moveBallDistanceL = -3;
                score++;
            }
        });
  });
  bricks2.forEach(function (brick) {
    let brickID2 = brick.id;
    if(ball.y == brick.height * 2 + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == -3)
        
        bricks2.forEach((brick, index) => {

            if(brick.id == brickID2){
                bricks2.splice(index, 1);
                moveBallDistanceL = 3;
                score++;
            }
        });
  });
  bricks3.forEach(function (brick) {
    let brickID3 = brick.id;
    if(ball.y == brick.height * 3 + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == 3)
        
        bricks3.forEach((brick, index) => {

            if(brick.id == brickID3){
                bricks3.splice(index, 1);
                moveBallDistanceL = -3;
                score++;
            }
        });
  });
  bricks3.forEach(function (brick) {
    let brickID3 = brick.id;
    if(ball.y == brick.height * 3 + 10 && ball.x > brick.x && ball.x < brick.x + brick.width && moveBallDistanceL == -3)
        
        bricks3.forEach((brick, index) => {

            if(brick.id == brickID3){
                bricks3.splice(index, 1);
                moveBallDistanceL = 3;
                score++;
            }
        });
  });
console.log(score);
  if(score == 15){
    setTimeout(() =>{
        youWin();
        
    }, 1000);
  }
}


function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawBrick(){
    ctx.fillStyle = brickColor;
    ctx.strokeStyle = border;
    bricks.forEach(brick =>{
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    });
    ctx.fillStyle = brickColor2;
    ctx.strokeStyle = border;
    bricks2.forEach(brick =>{
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    });
    ctx.fillStyle = brickColor3;
    ctx.strokeStyle = border;
    bricks3.forEach(brick =>{
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
    });
   
}

function drawPlatform(){
    ctx.fillStyle = platformColor;
    ctx.strokeStyle = border;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
}

function movePlatform(){

    platform.x += moveRight;
    if(platform.x >= gameWidth - platform.width){
        moveRight = -3;
    }
    else if(platform.x <= 0){
        moveRight = 3;
    }
}


function displayGameOver(){
    // clearInterval(gameInterval);
    running = false;
    gameOver = true;
    ctx.font = "50px MV Boli"
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2 - 30);
    ctx.fillText("Press SPACE", gameWidth / 2, gameHeight / 2 + 90);
    ctx.fillText("to play again!", gameWidth / 2, gameHeight / 2 + 140);
}

function youWin(){
    // clearInterval(gameInterval);
    running = false;
    ctx.font = "50px MV Boli"
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("CONGRATS!", gameWidth / 2, gameHeight / 2 - 30);
    ctx.fillText("Press SPACE", gameWidth / 2, gameHeight / 2 + 90);
    ctx.fillText("to play again!", gameWidth / 2, gameHeight / 2 + 140);
}

function startingScreen(){
    ctx.font = "40px MV Boli"
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("BRICK BREAKER", gameWidth / 2, gameHeight / 2 - 170);
    ctx.fillText("Move left: Left Arrow", gameWidth / 2 , gameHeight / 2 - 40);
    ctx.fillText("Move right: Right Arrow", gameWidth / 2 , gameHeight / 2 + 20);
    ctx.fillText("Press SPACE to start", gameWidth / 2 , gameHeight / 2 + 170);
}