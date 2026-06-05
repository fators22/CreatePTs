// AP CSP Create PT 
// Student 1: Partner 1
// Student 2: Partner 2

// The purpose of this program is a 2 player car racing game. Each player has different key controls and they race to collect coins to win.

// Partner 2 Requierments:
// - Developed collision detection procedure (hit function)
// - Created coin collection system and scoring logics
// - Implemented algorithm for coin movement and collection

// Partner 1 Requierments:
// - Developed resetCoins procedure with parameter
// - Created start, directions, and win screens
// - Implemented user input for mouse clicks and screen transitions

// AI used to help organize work so it is not messy

// Images used
let images = {car1: "BlueCar.png", car2: "Redcar.png", coin: "coin.jpg", bgGame: "backgroundsky.jpg", bgStart: "startbg1.jpg", road1: "street.png", road2: "street.png"};

// Image Variables
let car1Img, car2Img, coinImg, bgGame, bgStart, road1, road2;

// Game Screen Variables
let startScreen = true;
let directionsScreen = false;
let game = false;
let winScreen = false;
let bg = []; 

// Road boundaries
let road1Left = 300;
let road1Right = 750;
let road2Left = -50;
let road2Right = 400;

// Cars
let car1 = { x: road1Left + 225, y: 400, speed: 2 }; // BLUE Right
let car2 = { x: road2Left + 225, y: 400, speed: 2 }; // RED Left

// Score
let score1 = 0;
let score2 = 0;


let coins = [];

// Level
let level = 1;
let goal = 10;

// Winner
let winner = "";


function preload() {
  car1Img = loadImage("BlueCar.png");
  car2Img = loadImage("Redcar.png");
  coinImg = loadImage("coin.jpg");
  bgStart = loadImage("startbg1.jpg");
  road1 = loadImage("street.png");
  road2 = loadImage("street.png");
}


function setup() {
  createCanvas(600, 600);
  textFont("Comic Sans MS");
  resetCoins();
}



function resetCoins() {
  coins = [];
  for (let i = 0; i < 5; i++) {
    let roadChoice = random([1, 2]);

    let xPos;
    if (roadChoice === 1) {
      xPos = random(road1Left + 10, road1Right - 250);
    } else {
      xPos = random(road2Left + 120, road2Right - 170);
    }

    coins.push({
      x: xPos,
      y: random(0, 300)
    });
  }
}


function draw(){


  if (startScreen) return drawStart();
  if (directionsScreen) return drawDirections();
  if (game) return runGame();
  if (winScreen) return drawWin();
}


// Start Screen
function drawStart() {
  image(bgStart, 0, 0, width, height);
  textAlign(CENTER);
  textSize(40);
  fill("Red");
  text("Multiplayer Car Race Game", 300, 150);
  fill(0, 150, 255);
  rect(220, 250, 160, 60);
  fill(255);
  textSize(35);
  text("START", 300, 292);
  fill("White");
  textSize(30);
  text("Press H for Directions", 300, 400);
}


// Output: Partner 1
// Displays directions to the players
// Directions
function drawDirections() {
  background(180);
  textAlign(CENTER);
  textSize(25);
  fill("Blue");
  text("P1: Arrow Keys (BLUE)", 300, 200);
  textSize(25);
  fill("Red");
  text("P2: W A S D Keys (RED)", 300, 235);
  textSize(25);
  fill("White");
  text("First to collect coin goal wins", 300, 280);
  text("Red Car stays on left road", 300, 320);
  text("Blue Car stays on right road", 300, 360);
  text("CLICK TO GO BACK", 300, 400);
}

// Game Function
function runGame() {
  background(200);
  image(road1, road1Left-350, 0, 1000, height);
  image(road2, road2Left-250, 0, 1000, height);
  moveCars();

  // keep cars inside roads
  car1.x = constrain(car1.x, road1Left + 10, road1Right - 250);
  car2.x = constrain(car2.x, road2Left + 120, road2Right - 170);
  drawCars();
  collectCoins();
  checkWinner();
  showScore();
}

// My User Input: Partner 2
// Arrow keys control blue car movement
// WASD keys control red car movement
// Movement only on roads
function moveCars() {

  // Blue Car Movement
  if (keyIsDown(UP_ARROW)) car1.y -= car1.speed;
  if (keyIsDown(DOWN_ARROW)) car1.y += car1.speed;
  if (keyIsDown(LEFT_ARROW) && car1.x - car1.speed > road1Left + 30) {car1.x -= car1.speed;}
  if (keyIsDown(RIGHT_ARROW) && car1.x + car1.speed < road1Right - 30) {car1.x += car1.speed;}


  // Red Car Movement
  if (keyIsDown(87)) car2.y -= car2.speed; // W
  if (keyIsDown(83)) car2.y += car2.speed; // S
  if (keyIsDown(65) && car2.x - car2.speed > road2Left + 30) {car2.x -= car2.speed;}
  if (keyIsDown(68) && car2.x + car2.speed < road2Right - 30) {car2.x += car2.speed;}
}


// Output: Partner 2
// Displays cars on the screen
// Draw cars
function drawCars() {
  image(car1Img, car1.x, car1.y, 80, 80);
  image(car2Img, car2.x, car2.y, 80, 80);
}

function collectCoins() {

  for (let c of coins) {
    image(coinImg, c.x, c.y, 30, 30);
    c.y += 2 + level;
    if (c.y > height) {
      respawnCoin(c);
    }


    if (hit(car1, c)) {
      score1++;
      respawnCoin(c);
    }


    if (hit(car2, c)) {
      score2++;
      respawnCoin(c);
    }
  }
}


function respawnCoin(c) {
  let roadChoice = random([1, 2]);

  if (roadChoice === 1) {
    c.x = random(road1Left + 10, road1Right - 250);
  } else {
    c.x = random(road2Left + 120, road2Right - 170);
  }

  c.y = 0;
}


// My Procedure: Partner 2
// Name of procedure: hit
// Parameters used: car, coin
// Returns: true/false
// Purpose of procedure: Checks if the cars collides with a coin.
// Algorithm:
// - Sequencing: compares x and y positions
// - Selection: returns true if collision conditions are met
// Collision
function hit(car, coin) {
  return (
    car.y < coin.y + 30 &&
    car.y + 80 > coin.y &&
    car.x < coin.x + 30 &&
    car.x + 60 > coin.x
  );
}

// Win check
function checkWinner() {
  if (score1 >= goal) endGame("Blue Wins!");
  if (score2 >= goal) endGame("Red Wins!");
}


function endGame(text) {
  winner = text;
  winScreen = true;
  game = false;
}


// Output: Partner 2
// Displays score and goal for both players
// Score
function showScore() {
  fill(0);
  textSize(18);
  text("Blue: " + score1, 40, 40);
  text("Red: " + score2, 40, 70);
  text("Goal: " + goal, 40, 100);
}

// Win screen
function drawWin() {
  background(200);
  textAlign(CENTER);
  textSize(30);
  text(winner, 300, 200);
  textSize(30);
  text("Click circle to restart", 300, 320);
  fill(255, 0, 0);
  ellipse(560, 40, 40, 40);
  fill(255);
  textSize(12);
  text("R", 560, 44);
}

// Partner User Input: Partner 1
// Mouse click starts and restarts the game
// Mouse
function mousePressed() {
  let xOverlap = mouseX >= 220 && mouseX<=380;
  let yOverlap = mouseX >= 250 && mouseY <=310;
  
  if (startScreen && xOverlap && yOverlap) {
    startScreen = false;
    game = true;
  }

  if (winScreen && dist(mouseX, mouseY, 560, 40) < 20) {
    resetGame();
  }

  if (directionsScreen) {
    directionsScreen = false;
    startScreen = true;
  }
}


function resetGame() {
  score1 = 0;
  score2 = 0;
  level = 1;
  goal = 5;
  car1.x = road1Left + 225;
  car2.x = road2Left + 225;
  car1.y = 400;
  car2.y = 400;
  resetCoins();
  winScreen = false;
  game = true;
}


function keyPressed() {
  if (key === "h" || key === "H") {
    startScreen = false;
    directionsScreen = true;
  }
}