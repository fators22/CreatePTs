// declare gamestate, we need the opening screen
let gameState="startGameScreen";

//Mewtwo gifs
let mewtwoX,mewtwoY;
let mewtwo={X:235 , Y:490 , W:1, H: 1, S: 10, img: null};

//berries and attacks
let auraSphere, bubble, oranBerry, rock, shadowBall, sitrusBerry, superPotion;
//lists for berries, potions, attacks, and super attack
let heals=[];
let healImages=[];
let attacks=[];
let attackImages=[];



let value;
let score=0;

//background
let inGameBackground;

//declaring the endgame
let gameOver;

//button list
let buttons={w:100, h:50};

//level and hp
let hp=200;
let level;

function preload(){
  // load the images
inGameBackground=loadImage("images/backgroundpokemon.png");
mewtwoX=loadImage("images/mewtwoX.gif");
mewtwo.img=loadImage("images/mewtwo.gif");
mewtwoY=loadImage("images/MewtwoY.gif");
gameOver=loadImage("images/gameOver.png");
auraSphere=loadImage("images/aurasphere.png");
bubble=loadImage("images/bubbles-png-4.png");
oranBerry=loadImage("images/oranberry.webp");
rock=loadImage("images/rock.webp");
shadowBall=loadImage("images/shadowball.png");
sitrusBerry=loadImage("images/sitrusberry.png");
superPotion=loadImage("images/superpotion.png");
healImages=[oranBerry, sitrusBerry, superPotion];
attackImages=[auraSphere, bubble, rock, shadowBall];

}

function setup() {
  //make the size
  createCanvas(600, 600);
  
  //mewtwo size
 mewtwo.W=mewtwo.img.width*0.5; 
mewtwo.H=mewtwo.img.height*0.5;

  makeHeals();
  makeAttacks();
}

function draw() {
  background(220);
  //if statements with what screen
   if(gameState=="startGameScreen"){
     startGameScreen();
   }
  if(gameState=="inGameScreen"){
    inGameScreen();
  }
  if(gameState=="endGameScreen"){
    endGameScreen();
  }
}

function startGameScreen(){
  background(135,57,157);
  
  //title
  textSize(40);
  fill(0,255,0);
  text("Mewtwo Survival", 150, 50);
  
  // text with Rules
  fill(255);
  rect(150,75,300,410);
  fill(0);
  textSize(15);
  text("Collect Berries to maintain Mewtwo's HP.", 153,90);
  text("Avoid the attacks flying down.", 153, 110);
  text("Each berry or potion you collect, you heal.", 153, 130);
  text("Move using arrow keys. Only go left to right.", 153, 150)
  text("Gain points and survive as long as possible!", 153, 170);
 
  
 //text Attack effects numbers
  textSize(20);
  text("Below are the attack effects:", 153, 210);
  textSize(15);
  image(oranBerry, 153, 210, oranBerry.width*0.1, oranBerry.height*0.1);
  text("Oran Berry: +10 HP, and +1 pt", 225, 235);
  image(sitrusBerry, 153, 245, sitrusBerry.width*0.2, sitrusBerry.height*0.2);
  text("Sitrus Berry: +25 HP, and +2 pt", 225, 275);
  image(superPotion, 153, 290, superPotion.width*0.25, superPotion.height*0.25);
  text("Super Potion: +50 HP, and +3 pt", 225, 315);
  image(auraSphere, 153, 325, auraSphere.width*0.05, auraSphere.height*0.05);
  text("Aura Sphere: -10 HP", 225, 355);
  image(bubble, 157, 365, bubble.width*0.1, bubble.height*0.1);
  text("Bubble Beam: -15 HP", 225, 390);
  image(rock, 153, 390, rock.width*0.1, rock.height*0.1);
  text("Rock Slide: -25 HP", 225, 425);
  image(shadowBall, 153, 435, shadowBall.width*0.05, shadowBall.height*0.05);
  text("Shadow Ball: -50 HP", 225, 465);
  
  //start game button
  fill(255);
  rect(250,530,100,50);
  fill(0);
  textSize(19);
  text("Start Game", 251,562);
  
  //button detection
  if(overlap(250,530)){
    gameState="inGameScreen";
  hp=200;
  level=1;
  score=0;
  heals=[];
  attacks=[];
  makeHeals();
  makeAttacks();
    
  }
  console.log(gameState)
  image(mewtwoX,5,200, mewtwoX.width*0.4,mewtwoX.height*0.4);
  image(mewtwoY,450,200, mewtwoY.width*0.4,mewtwoY.height*0.4);
}

function inGameScreen(){
  background(inGameBackground);
  moveMewtwo();
  fill(255);
  textSize(30);
  text("HP: "+hp, 10, 40)
  text("Level: "+level, 10, 80);
  text("Score: "+score, 10, 120);
  moveHeals();
  moveAttacks();
  updateLevel();
}


function endGameScreen(){
  background(255,0,0);
  image(gameOver,35,-100);
  fill(255);
  textSize(50);
  text("Score: "+score, 100, 400);
  text("Level: "+level, 100, 475);
  rect(100,520,100,50);
  textSize(15);
  fill(0);
  text("Play Again?", 110,550);
  if(overlap(100,520)){
  gameState = "inGameScreen";
  hp=200;
  level=1;
  score=0;
  heals=[];
  attacks=[];
  makeHeals();
  makeAttacks();
}
  fill(255);
  rect(400,520,100,50);
  fill(0);
  text("Home Screen", 405,550);
  if(overlap(400,520)){
    gameState="startGameScreen";
  }
}

function overlap(x, y){
  let xOverlap= mouseX>x && mouseX < x+buttons.w;
  let yOverlap= mouseY>y && mouseY < y+buttons.h;
  
    if(mouseIsPressed){
      return xOverlap && yOverlap;
    }
}

function moveMewtwo(){
  image(mewtwo.img, mewtwo.X,mewtwo.Y, mewtwo.W, mewtwo.H);
  if(keyIsDown(LEFT_ARROW)){
    mewtwo.X-=mewtwo.S
  }
 if(keyIsDown(RIGHT_ARROW)){
    mewtwo.X+=mewtwo.S
 }
  if(mewtwo.X<-10){
    mewtwo.X=-10;
  }
  if(mewtwo.X>500){
    mewtwo.X=500;
  }
}
function makeHeals(){
  for (let i=0; i<2+level; i++){
    let h=healImages[floor(random(healImages.length-1))];
    let value=0;
    let points=0;
    
    if(level>=5){
      h=healImages[floor(random(healImages.length))];
    }
    if(h===oranBerry){
      value+=10;
      points+=1
    }
    else if(h===sitrusBerry){
     value+=25;
      points+=2
    }
    else if(h===superPotion){
      value+=50;
      points+=3
    }
    let heal={x:random(width),y:random(-height),speed:random(1,3+level),size:40, img:h, value:value, points: points};
  heals.push(heal);
  }
  
}

//AI helped me with my move heals and move attacks
function moveHeals(){
  
  for(let i=0;i<heals.length; i++){
      let heal=heals[i];
  heal.y+=heal.speed
   
  if (heal.y>width+heal.size){
    heal.y=-heal.size;
    heal.x=random(width);
  }
   
   image(heal.img, heal.x, heal.y, heal.size, heal.size);
if(detectHealCollision(heal)){
  hp += heal.value;  
  heal.y = -heal.size;
  heal.x=random(width);
score+=heal.points
}
    if(hp>200){
      hp=200;
    }
  }

}
function makeAttacks(){
  for (let i=0; i<2*level; i++){
    let k=attackImages[floor(random(attackImages.length-1))];
  
    
    if(level>=5){
      k=attackImages[floor(random(attackImages.length))];
    }
    if(k===auraSphere){
      value=10;
    }
    else if(k===bubble){
     value=15;
    }
    else if(k===rock){
      value=20;
    }
    else if(k===shadowBall){
      value=50
    }
    let attack={x:random(width),y:random(-height),speed:random(1,3+level),size:40, img:k, value: value};
  attacks.push(attack);
  }
  
}

function moveAttacks(){
  
  for(let i=0;i<attacks.length; i++){
      let attack=attacks[i];
  attack.y+=attack.speed
   
  if (attack.y>width+attack.size){
    attack.y=-attack.size;
    attack.x=random(width);
  }
  image(attack.img, attack.x, attack.y, attack.size, attack.size);

    if(detectAttackCollision(attack)){
  hp = hp-attack.value;  
  attack.y = -attack.size;
  attack.x=random(width);
  
}
    if(hp<=0){
      gameState="endGameScreen";
    }
  }

}

//AI gave me inspiration for helping my detect collision
function detectHealCollision(heal){
  let xOverlap=mewtwo.X+25 < heal.x + heal.size && heal.x < mewtwo.X+25 + mewtwo.W-50;
  let yOverlap=mewtwo.Y+40 < heal.y + heal.size && heal.y < mewtwo.Y+50 + mewtwo.H-50;
  
  return xOverlap && yOverlap
}
function detectAttackCollision(attack){
  let xOverlap=mewtwo.X+25 < attack.x + attack.size && attack.x < mewtwo.X+25 + mewtwo.W-50;
  let yOverlap=mewtwo.Y+40 < attack.y + attack.size && attack.y < mewtwo.Y+50 + mewtwo.H-50;
  
  return xOverlap && yOverlap
}
function updateLevel(){
if(score>=25*level){
  level++;
  heals = [];
  attacks = [];
  makeHeals();
  makeAttacks();
}
}
//Images credit
//Mewtwo Y - https://www.smogon.com/forums/threads/lgpe-metagame-megathread.3754242/
//aurasphere - https://www.deviantart.com/venjix5/art/Aura-Sphere-2-763841366
//pokemon background - https://www.deviantart.com/phoenixoflight92/art/Pokemon-X-and-Y-battle-background-10-490608175
//bubble - https://www.freeiconspng.com/img/11410
//gameover - https://pngimg.com/image/83374
//mewtwo - https://cl.pinterest.com/pin/969540626006524128/
// mewtwoX - https://www.smogon.com/forums/threads/lgpe-metagame-megathread.3754242/
//oran berry - https://pokemon.fandom.com/wiki/Oran_Berry
//rock - https://www.vexels.com/png-svg/preview/145684/gravel-rock
//shadow ball - https://www.deviantart.com/venjix5/art/Shadow-Ball-5-763454576
//sitrus berry - https://pokemon.fandom.com/wiki/Sitrus_Berry
//super potion - https://www.serebii.net/itemdex/superpotion.shtml