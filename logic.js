let inputDir = {x:0 , y:0};
let food = new Audio('./music/food.mp3');
let move = new Audio('./music/move.mp3');
let bgmusic = new Audio('./music/music.mp3');
let gameout = new Audio('./music/gameover.mp3');
let bpress = new Audio('./music/buttonpress.mp3');
let popupsound = new Audio('./music/popup.mp3');
bgmusic.volume = 0.2;
var speed = 11;
var lastPaintTime = 0;
scoreBox = document.getElementById("scoreBox");
hiBox = document.getElementById("hiscoreBox");
score = 0;
let snakeArr = [
    {x:13, y:15}
]


// difficult

function difficult(num)
{
    if (num===1) {
        speed = 3;
    }
    if(num===2){
        speed=11;
    }
    if(num === 3){
        speed=25
    }
    if (num === 4) {
        speed = 50;
    }

    
}



//------------- 

foodc = {x:15,y:13}
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime-lastPaintTime)/1000 < 1/speed) {
        return;    
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake)
{
    for (let i = 1; i < snakeArr.length; i++) {
        //self
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        }
    for (let z = 0; z < snakeArr.length; z++) {
        //wall
        if (snake[0].x >=21 || snake[0].x <=0 || snake[0].y >=19 || snake[0].y <=0){
            return true;
        }
    }


}


function gameEngine()
{
    if (isCollide (snakeArr)) {
        bgmusic.pause();
        gameout.play();
        inputDir = {x:0,y:0};
        openPopup();
        snakeArr=[{x:13, y:15}]
        // bgmusic.play();
        scoreBox.innerHTML = "0";
        score = 0;
    }

    if (snakeArr[0].y===foodc.y && snakeArr[0].x===foodc.x) {
        score += 1;
        if (score === hiscorevar) {
            fireworkdisplay();
            firsound.play();
        }        
        if (score>hiscorevar) {
            hiscorevar = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscorevar));
            hiBox.innerHTML= hiscorevar;
            document.getElementById("fhs").innerHTML = "High Score : "+hiscorevar;
        }
        scoreBox.innerHTML = score
        document.getElementById("fs").innerHTML = "Your Final Score: "+score;
        food.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        foodc = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;    
    snakeArr[0].y += inputDir.y;

    //snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index ===0) 
        {   
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //food
    foodElement = document.createElement('div');
    // foodElement.
    foodElement.style.gridRowStart = foodc.y;
    foodElement.style.gridColumnStart =foodc.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    

}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscorevar = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscorevar))
    document.getElementById("fhs").innerHTML = "High Score : 0";

}
else
{
    hiscorevar = JSON.parse(hiscore);
    hiscoreBox.innerHTML =hiscore;
    document.getElementById("fhs").innerHTML = "High Score : "+hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e=> {
    bgmusic.play();
    // inputDir = {x:0,y:1}
    switch(e.key){
        case "ArrowUp":
            // console.log("Arrow up");
            move.play();
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            // console.log("Arrow down");
            inputDir.x=0;
            move.play();
            inputDir.y=1;
            break;
        case "ArrowLeft":
            // console.log("Arrow left");
            move.play();
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            // console.log("Arrow right");
            move.play();
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
        }
})


//display popup

let popup = document.getElementById("popup");
let body = document.getElementById("body")
function openPopup()
{
    popup.classList.add("open-pop");
    body.classList.add("hide")
}


function closePopup()
{
    popup.classList.remove("open-pop");
    body.classList.remove("hide")
    bgmusic.play();


}

// info

let info = document.getElementById("info");


function openinfo()
{
    info.classList.add("open-info");
    body.classList.add("hide")
}
function closeinfo()
{
    info.classList.remove("open-info");
    body.classList.remove("hide")

}

function btnpress()
{
    bpress.play();
    fire.classList.add("fireworks");
    fire.classList.remove("displayfire");
    firsound.pause();
}

function popsound(){
    popupsound.play();
}



// firework
let firsound = new Audio('./music/fireworksound.mp3'); 
fire = document.getElementById("fireworks");
function fireworkdisplay()
{
    fire.classList.add("displayfire");
    fire.classList.remove("fireworks");
}


