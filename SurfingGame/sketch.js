//Canvas Width in pixels
var W = 400;
var H = 400;

//global variables
//tracks player score, missed animals, and remaining lives
let score = 0;
var miss = 0;
let startbg;
let gamebg;
let scroll = 0;
var lives = 3;
let heartImg;

//image obstained from [freepik.com]
var characters = ["surfer.1.png", "Surfer.2.png", "surfer.3.png", "surfer.4.png"];

// surfer is an object storing the player character's current state:
var surfer = {
  W:50,
  H:75, 
  Sp:5,
  X:250,
  Y:250,
}

//list of active animal objects on screen
var animals = [];

//image obstained from [freepik.com]
//This a list that stores animal image file names to manage complexity
//This list is used in preload() to load all animal images in one loop
var images = ["seal.png", "shark.png", "hammerhead.png", "dolphin.png"];
var animalimages=[];
var state = "start";


//iteration: loops through images list to load each animal image
function preload(){
     
// Image obtained from [freepik.com]
    startbg = loadImage("8-bit-graphics-pixels-scene-with-beach.jpg");
       for (let i = 0; i < characters.length; i++) {
    characters[i] = loadImage(characters[i]);
       }
     
// Image obtained from [freepik.com]
    gamebg = loadImage("pixel-bitmap-pattern-white-blue-gradient-shade.png");
     
// Heart image: "heart-pixelated-with-message.png" - obtained from [freepik.com]
     heartImg = loadImage("heart-pixelated-with-message.png");
     for (let i = 0; i< images.length; i++){
       animalimages[i] = loadImage(images[i]);
     }
  }
function setup() {
  createCanvas(500, 500);
  makeAnimals(6);
}


function draw() {
  //code from class project
   if      (state === "start") start();
  else if (state === "game")  game();
  else if (state === "lose")  lose();
}

function start(){
   image(startbg, 0, 0, width, height);
  image(characters[0], width/2 + 75, height/2+25, 200, 200);
  image(characters[1], width/2 - 270, height/2+25, 200, 200);
      image(characters[3], width/2-100, height/2+30, 200, 200);
  //inclass project 
    textAlign(CENTER);
  fill(50,200,255);
  textSize(60);
  textStyle(BOLD);
  text("Surf", W/2, 120);
  fill(50, 10, 200);
  text("Rider", W/2, 190);
  textStyle(NORMAL);
  
  fill(10, 130, 230);
  rect(width/2 - 150,height/2-50,300,100)
  fill(255);
  textSize(100)
  textStyle(ITALIC);
  text("Start", width/2, height/2+35);
}

//moves the water background upward to simulate foward movement
//Updates the surfer and animals
function game(){
     image(gamebg, 0, 0, width, height);
  scroll -= 10;
  
  //rest scroll once the image has fully past the screen 
  if(scroll <= -gamebg.height){
    scroll = 0;
  }

  image(gamebg,0,scroll);
  image(gamebg,0, scroll + gamebg.height); 
//output: draws surfer at its current position on the screen
  moveSurfer();
  moveAnimals();
  updateScreen();
}

function lose(){
  image(startbg, 0, 0, width, height)
    fill("red");
  rect(width/2 - 150,height/2-50,300,100)
  fill("white");
  textSize(100);
  textStyle(ITALIC);
  text("LOSE", width/2, height/2+35);
  
  fill(10, 130, 230);
  rect(width/2-125, height/2+60,250,80);
  fill("white");
  textSize(35);
  textStyle(BOLD)
  text("CONTINUE", width/2, height/2+110);
  
  
}
//returns true if the mouse is inside a rectange with parameters (bx, by, bw, bh)
  function checkClick(bx, by, bw, bh) {
  return mouseX > bx && mouseX < bx + bw &&
         mouseY > by && mouseY < by + bh;
}
//Starts game when user presses start button and resets everything when user presets reset in the lose window
//Input: user clicks start to continue button triggering a game state change
function mousePressed() {
  if (state === "start") {
    if (checkClick(width/2 - 150, height/2 - 50, 300, 100)) {
      state = "game";
    }
  }
  if (state==="lose"){
    if(checkClick(width/2-125, height/2+60,250,80)){
      resetGame()
       state = "start";
       }
}
}
//INPUT: User presses arrow keys to move the surfer
//Influenced by in class project
function moveSurfer(){
  if(keyIsDown(LEFT_ARROW)){
    surfer.X-=surfer.Sp;
  }
    if(keyIsDown(RIGHT_ARROW)){
    surfer.X+=surfer.Sp;
  }
    if(keyIsDown(UP_ARROW)){
    surfer.Y-=surfer.Sp;
  }
    if(keyIsDown(DOWN_ARROW)){
    surfer.Y+=surfer.Sp;
  }

image(characters[3], surfer.X, surfer.Y, surfer.W, surfer.H);
}
//creats animal objects with random positions below the canvas
//Procedure: student developed 
//Parameter (count) determines how many animals are created
function makeAnimals(count){
  animals = []
  for(let i=0; i<count; i++){
    let animal={
      x:random(0,W),
      y:random(H,H*2),
      sp:random(1,3),
      sz:random(80,120),
      img:animalimages[i%images.length]
}
    animals.push(animal);
    if(i%animals.length==1){
      animal.sp = random(3,5);
      }
   }
}

//An algorithm that contains sequencing, selection, and iteration
function moveAnimals(){
  //Iteration: loops through every animal
  for(let j=0; j<animals.length; j++){
    let a=animals[j];
    //sequencing: move animal upward each frame
    a.y=a.y-a.sp;
    //selection: checks if animal collides with surfer
    if (checkCollision(a)) {
      lives--   
    a.y = random(H, H * 2);
      a.x = random(0, W);
      miss++;
      if(lives<=0){
          endGame(true); 
      }
      break;
    }
    //animal successfully passes and respawns awarding the player a point
    if(a.y<-a.sz){
         a.y = random(H, H * 2);
      a.x = random(0, W);
      score++
    }
    image(a.img, a.x,a.y, a.sz, a.sz);
  }
}

//returns true if surfer's box overlaps with an aimals box
function checkCollision(a){
    let xOverlap=surfer.X<a.x+a.sz && a.x< surfer.X+surfer.W;
  let yOverlap=surfer.Y<a.y+a.sz && a.y<surfer.Y+surfer.H;
  return xOverlap && yOverlap;
}
  function endGame (lose){
    state="lose";
  }


//every 10 seconds awards 100 points and increases all animals speeds
//OUTPUT: draws score and heart images on screen visually
function updateScreen() {

  textStyle(BOLD);
  textSize(16);


  fill(255);
  text("SCORE: " + score, 100, 21);
if(frameCount % 600 === 0){
  score+= 100;
  for (let i = 0; i < animals.length; i++) {
    animals[i].sp += 1;
  }
}

  textStyle(NORMAL);
  //For the hearts dissapearing 
   for (let i = 0; i < lives; i++) {
    image(heartImg, 360 + i * 40, 10, 30, 30);
   }
}
//restore all variables to their starting values and regenerates the animal list
function resetGame() {
  score = 0;
  miss = 0;
  lives = 3;
  animals = [];
  surfer.X = 250;
  surfer.Y = 250;
  //call to procedure: calls makeAnimals with 6 animals
  makeAnimals(6);
}