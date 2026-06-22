// VARIABLES____________________________________________________

let W = 500;
let H = 600;


let gameState = "start"
let battery = 5
let collisionCounter = 0
let level = 1
let change= 5
let blocksCreated = false
let rectWidth = 0


let GOOD = "good"
let BAD = "bad"

// STANDARD FUNCTIONS___________________________________________

function preload(){
  phone.img  = loadImage("phone.png") // LINK https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpSCawwApiuDw1oUZ30Zfi7JjBfZPyGVsHsQ&s
  goodImg = loadImage("lightning.png") // LINK https://emojiisland.com/cdn/shop/products/voltage_emoji_icon_png_large.png?v=1571606089
  badImg = loadImage('virus.png') // LINK https://ih1.redbubble.net/image.1442467605.5215/flat,750x1000,075,t.jpg
  worstImg = loadImage('poweroutage.png')
}

function setup() {
  createCanvas(W,H);
  startScreen();
}

function draw() {
  
 movePhone(); 
  textFont('Trebuchet MS')
       if (gameState == "start"){
startScreen();}
  else if (gameState == "play") {
playScreen();}
  else if (gameState == "win") {
winScreen();}
  else if (gameState == "lose"){ 
loseScreen();}
    
}


// SCREEN FUNCTIONS_____________________________________________

function startScreen(){
  background(100,100,100);
  strokeWeight(4)
  textSize(40)
  fill(255)
  text("Charging Chaos", 120, 80)
  fill(0)
  rect(168,480,150,50)
  fill(255)
  textSize(30)
  text("Play", 212, 513)
  fill(255)
  rect(25,110,450,350)
  rules();
}

function playScreen(){
background(150,150,150)  
  
  if(blocksCreated==false){
    fillList(level*2);
    blocksCreated = true;
  }
  makeBlocks();
  moveBlocks();
  collisionCheck();
  image(phone.img,phone.x,phone.y,phone.w,phone.h)
  textSize(25)
  text("Level:" + level, 350, 50)
  
  strokeWeight(2)
  fill(50)
  rect(10,10,110,60)
   if(change<20){
    fill(255,0,0)
  }
  else if(change<40){
    fill(255,140,0)
  }
  else if(change<60){
    fill(255,200,0)
  }
  else if(change<80){
    fill(144,238,144)
  }
  else if(change>=80){
    fill(0,200,0)
  }
  rect(15,15,0+change,50)
  fill(255)
  text(change +"%", 53,47.5)
  
  if(collisionCounter >= level*8){
    level++
    collisionCounter = 0;
    
    resetList();
    
    blocksCreated = false;
  }
  
  if (change > 99){
    change = 99}
  
  if (change <= 0){
    change = -5
  }
  
  if (change>=99){
    gameState = "win"
  }
  
  if(change<=-5){
    gameState = "lose"
    }
}


function winScreen(){
  background(173,216,230)
  strokeWeight(4)
  textSize(60)
  fill(255,215,0);
  text("You Won! :D", 70, 150 )
  fill(255,182,193)
  rect(168,480,150,50)
  textSize(24)
  fill(255,239,250)
  text("Home Screen", 173.5, 512)
}


function loseScreen(){
  background(255,0,0)
  strokeWeight(4)
  textSize(60)
  fill(0);
  text("You Lost :(", 85, 150 )
  textSize(30)
  text("You made it to level " + level, 80, 270)
  fill(0)
  rect(168,480,150,50)
  textSize(24)
  fill(255)
  text("Home Screen", 172, 513)
}

function rules(){
  fill(0)
  textSize(25)
  text("Objective", 185, 140)
  text("Controls", 190, 370)
  textSize(18)
  text("-Catch the lightning bolts to charge battery",75, 175)
  
  text("-Avoid virus and power outage or lose battery",75, 210)
  text("-Missing bolts will also drop battery", 75,245 )
  text("-Hit 0% and lose, or Hit 100% and win",75, 280)
  text("-Level up overtime for difficulty",75,315)
  
  text("-Left/Right Arrow Keys to move",105, 400)
  text("-Or use W and A Keys to Move", 105, 435)
}

// LISTS, FUNCTION W/ PARAMETER, MAIN GAMEPLAY, ETC...__________

let phone = {x:200, y:500, w:75, h:75, img:null}
let blocks = {x:[], y:[], w:[], h:[], sp:[], type:[], img:[]}
let powOut = {x:[], y:[], w:[], h:[], sp:[], img:[]}


function fillList(blockLimit){
  for(let i=0; i < blockLimit; i++){
    blocks.x.push(random(20,450))
    blocks.y.push(random(-H,0))
    blocks.sp.push(random(6+level,7+level))
    
    if(blockLimit>7){
      blocks.w.push(random(35,65))
      blocks.h.push(random(35,65))
    }
    else{
      blocks.w.push(random(65,95))
      blocks.h.push(random(65,95))
    }
    if (random(10) > 5) {
  blocks.type.push(BAD)

  // pick virus type
  let badVariant = random(2)

  if (badVariant < 1) {
    blocks.img.push(badImg)
  } else {
    blocks.img.push(worstImg)
  }

} else {
  blocks.type.push(GOOD)
  blocks.img.push(goodImg)
}
}
  }


function makeBlocks(){
  for(let i = 0; i < blocks.x.length; i++){
    image(
      blocks.img[i],
      blocks.x[i],
      blocks.y[i],
      blocks.w[i],
      blocks.h[i]
    );
  }
}


function moveBlocks(){
  for (let i=0; i < blocks.x.length; i++){
    blocks.y[i] += blocks.sp[i]
    
  if(blocks.type[i] == GOOD && blocks.y[i]>height){
    change-=1
    }  
    
  if(blocks.y[i]>height){
    blocks.y[i] = random(-H,-50)
    blocks.x[i] = random(20,450)
    blocks.sp[i] = random(6+level,8+level)

    
if (random(10) < 5) {
  blocks.type[i] = GOOD
  blocks.img[i] = goodImg
} else {
  blocks.type[i] = BAD

  let badVariant = random(2)
  blocks.img[i] = badVariant < 1 ? badImg : worstImg
}
}
}
}


function collisionCheck(){
for (let i=0; i<blocks.x.length; i++){

let xCollision = phone.x < blocks.x[i] + blocks.w[i] && phone.x + phone.w > blocks.x[i]
let yCollision = phone.y < blocks.y[i] + blocks.h[i] && phone.y + phone.h > blocks.y[i]

if (xCollision && yCollision){
  collisionCounter++

  if(blocks.type[i] == GOOD){
    change += floor(random(2,4))
  }
  else if (blocks.img[i] == badImg){
    change -= 4
  }
  else if (blocks.img[i] == worstImg){
    change -= 8
  }

  // reset after collision
  blocks.y[i] = random(-H,-50)
  blocks.x[i] = random(20,450)
  blocks.sp[i] = random(6+level,8+level)

  if (random(10) < 5) {
    blocks.type[i] = GOOD
    blocks.img[i] = goodImg
  } else {
    blocks.type[i] = BAD
    let badVariant = random(2)
    blocks.img[i] = badVariant < 1 ? badImg : worstImg
  }
}

}
}

function movePhone(){
  
if (keyIsDown(LEFT_ARROW) || keyIsDown(65))
  if(phone.x>-25){
    phone.x-=10.75
  }   
if (keyIsDown(RIGHT_ARROW) || keyIsDown(68))
  if(phone.x<425){
   phone.x+=10.75
  }
}


function mouseClicked(){
  let X1 = 168
  let X2 = 318
  let Y1 = 480
  let Y2 = 530
  
  if(mouseX > X1 && mouseX < X2 && mouseY > Y1 && mouseY < Y2){
    if(gameState == "start"){
      change = 5;
      level = 1;
      blocksCreated = false;
      resetList();
      gameState = "play"
    }
    else if(gameState == "win"){
      gameState = "start"
    }
    else if(gameState == "lose"){
      gameState = "start"
    }
}
}

function resetList(){
      blocks.x = []
      blocks.y = []
      blocks.w = []
      blocks.h = []
      blocks.sp = []
      blocks.type = []
      blocks.img = []
}

//______________________________________________________________
