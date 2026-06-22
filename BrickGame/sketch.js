// INPUT: mouse click changes the screen from start to instructions to game
// OUTPUT: the program shows different screens based on the current value
let screen = "start";

// TRACKS CURRENT LEVEL
let currentLevel = 1;

// stores the names of the screens used in the game
let screenNames = ["start", "instructions", "game", "gameover"];

// stores the image files for each screen
let screenFiles = ["background-1.png", "background-1.png", null, "gameover2.png"];

// OUTPUT: stores loaded background images so they can be displayed
let screenImages = [];

// stores the image files for the spaceship, asteroid, and orb
let spaceshipImg;
let asteroidImg;
let orbImg;

// OUTPUT: score and lives are displayed to the player during the game
let score = 0;
let lives = 3;

// INPUT: left and right arrow keys change the ship's x-position
let shipX = 350;
let shipY = 530;
let shipW = 120; // Will change based on level
let shipH = 50;
let shipSpeed = 9;

// stores the orb's position, size, and movement speed
let orbX;
let orbY;
let orbSize = 35;
let orbDX = 4;
let orbDY = -4;
let baseOrbSpeed = 4; // Added to easily scale speed by level

// LIST: stores all asteroid objects used in the game
let asteroids = [];

// loads image files before the game starts
function preload() {
  for (let i = 0; i < screenFiles.length; i++) {
    //skips loading an image for null 
    if (screenFiles[i] !== null) {
      screenImages[i] = loadImage(screenFiles[i]);
    }
  }

  spaceshipImg = loadImage("spaceship.png");
  asteroidImg = loadImage("asteroid.png");
  orbImg = loadImage("energyball.png");
}

// sets up the canvas, asteroid list, and starting orb position
function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  initLevel(1); // Set up level 1 initially
}

// OUTPUT: displays the correct screen based on the current game state
function draw() {
  if (screen === "start") {
    drawStartScreen();
  } else if (screen === "instructions") {
    drawInstructionsScreen();
  } else if (screen === "game") {
    drawGameScreen();
  } else if (screen === "gameover") {
    drawGameOverScreen();
  }
}

// OUTPUT: displays the start screen and start message
function drawStartScreen() {
  image(screenImages[0], 0, 0, width, height);
  fill(120);
  textSize(40);
  text("SPACE BRICK BREAKER", width / 2, height / 2 - 40);
  textSize(20);
  text("CLICK TO CONTINUE", width / 2, height / 2 + 20);
}

// OUTPUT: displays the game instructions
function drawInstructionsScreen() {
  image(screenImages[1], 0, 0, width, height);
  fill(255);
  textSize(30);
  text("INSTRUCTIONS", width / 2, 120);

  textSize(20);
  text("- LEFT/RIGHT arrows to move", width / 2, 200);
  text("- Break asteroids with orb", width / 2, 250);
  text("- Don't drop the orb", width / 2, 300);

  textSize(25);
  text("CLICK TO START", width / 2, 380);
}

// OUTPUT: displays gameplay, score, lives, ship, orb, and asteroids
function drawGameScreen() {
  background(0);

  moveSpaceship();
  moveOrb();
  checkWallBounce();
  checkShipBounce();

  checkAsteroidCollisions(1.05);

  drawShip();
  drawOrb();
  drawAsteroids();
  drawScoreboard();

  // Check if current level is cleared
  if (allAsteroidsGone()) {
    if (currentLevel === 1) {
      initLevel(2); // Progress to level 2
    } else {
      screen = "gameover"; // Completed all levels!
    }
  }

  if (lives <= 0) {
    screen = "gameover";
  }
}

// OUTPUT: displays final score and restart message
function drawGameOverScreen() {
  image(screenImages[3], 0, 0, width, height);

  fill(255);
  textSize(34);
  text("GAME OVER", width / 2, height / 2 - 40);

  textSize(22);
  text("Final Score: " + score, width / 2, height / 2 + 10);

  textSize(18);
  text("Click to restart", width / 2, height / 2 + 60);
}

// INPUT: arrow keys move the spaceship left or right
function moveSpaceship() {
  if (keyIsDown(LEFT_ARROW)) shipX -= shipSpeed;
  if (keyIsDown(RIGHT_ARROW)) shipX += shipSpeed;

  if (shipX < 0) shipX = 0;
  if (shipX + shipW > width) shipX = width - shipW;
}

// OUTPUT: draws the spaceship on the canvas
function drawShip() {
  image(spaceshipImg, shipX, shipY, shipW, shipH);
}

// updates the orb position each frame
function moveOrb() {
  orbX += orbDX;
  orbY += orbDY;
}

// OUTPUT: draws the orb on the canvas
function drawOrb() {
  image(orbImg, orbX, orbY, orbSize, orbSize);
}

// resets the orb after the game starts, level changes, or a life is lost
function resetOrb() {
  orbX = shipX + shipW / 2;
  orbY = shipY - 20;
  
  // Speed scales up depending on the base speed configuration
  orbDX = baseOrbSpeed;
  orbDY = -baseOrbSpeed;
}

// NEW FUNCTION: Sets up specific layouts/difficulties depending on level
function initLevel(lvl) {
  currentLevel = lvl;
  asteroids = [];
  
  if (currentLevel === 1) {
    shipW = 120;        // Normal ship size
    baseOrbSpeed = 4;   // Normal speed
    
    // Level 1 Layout: Standard Grid
    for (let i = 0; i < 6; i++) {
      asteroids.push({ x: 80 + i * 110, y: 70, w: 60, h: 55, existing: true });
      asteroids.push({ x: 80 + i * 110, y: 140, w: 60, h: 55, existing: true });
      asteroids.push({ x: 80 + i * 110, y: 210, w: 60, h: 55, existing: true });
    }
  } else if (currentLevel === 2) {
    shipW = 80;         // Smaller paddle size makes catching orb tougher!
    baseOrbSpeed = 6;   // Orb moves faster automatically
    
    // Level 2 Layout: Staggered, dense asteroid pyramid wall
    for (let i = 0; i < 7; i++) {
      asteroids.push({ x: 45 + i * 105, y: 60, w: 60, h: 45, existing: true });
    }
    for (let i = 0; i < 6; i++) {
      asteroids.push({ x: 95 + i * 105, y: 120, w: 60, h: 45, existing: true });
    }
    for (let i = 0; i < 7; i++) {
      asteroids.push({ x: 45 + i * 105, y: 180, w: 60, h: 45, existing: true });
    }
    for (let i = 0; i < 6; i++) {
      asteroids.push({ x: 95 + i * 105, y: 240, w: 60, h: 45, existing: true });
    }
  }
  
  resetOrb();
}

// checks if the orb hits a wall or falls below the screen
function checkWallBounce() {
  if (orbX <= 0 || orbX + orbSize >= width) {
    orbDX *= -1;
  }

  if (orbY <= 0) {
    orbDY *= -1;
  }

  if (orbY > height) {
    lives--;
    resetOrb();
  }
}

// checks if the orb hits the spaceship
function checkShipBounce() {
  if (
    orbX + orbSize > shipX &&
    orbX < shipX + shipW &&
    orbY + orbSize > shipY &&
    orbY < shipY + shipH
  ) {
    orbDY *= -1;
    orbY = shipY - orbSize;
  }
}

// OUTPUT: draws every asteroid that still exists
function drawAsteroids() {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].existing) {
      image(
        asteroidImg,
        asteroids[i].x,
        asteroids[i].y,
        asteroids[i].w,
        asteroids[i].h
      );
    }
  }
}

// PROCEDURE: checks if the orb hits an asteroid
function checkAsteroidCollisions(speedConst) {
  if (speedConst > 0) {
    for (let i = 0; i < asteroids.length; i++) {
      let a = asteroids[i];

      if (a.existing === true) {
        let hit =
          orbX + orbSize > a.x &&
          orbX < a.x + a.w &&
          orbY + orbSize > a.y &&
          orbY < a.y + a.h;

        if (hit === true) {
          a.existing = false;
          orbDY = -orbDY * speedConst;
          score++;
        }
      }
    }
  }
}

// checks the asteroid list to see if the player cleared all asteroids
function allAsteroidsGone() {
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].existing === true) {
      return false;
    }
  }
  return true;
}

// OUTPUT: displays the player's lives, score, and current level
function drawScoreboard() {
  fill(255);
  textSize(20);
  
  // Left aligned elements
  textAlign(LEFT, TOP);
  text("LIVES: " + lives, 20, 20);
  
  // Center aligned level banner
  textAlign(CENTER, TOP);
  text("LEVEL: " + currentLevel, width / 2, 20);
  
  // Right aligned elements
  textAlign(RIGHT, TOP);
  text("SCORE: " + score, width - 20, 20);
  
  textAlign(CENTER, CENTER); // Restore default
}

// INPUT: mouse clicks move between screens or restart the game
function mousePressed() {
  if (screen === "start") {
    screen = "instructions";
  } else if (screen === "instructions") {
    screen = "game";
    initLevel(1); // Explicitly start at Level 1 layout
  } else if (screen === "gameover") {
    score = 0;
    lives = 3;
    shipX = 350;
    initLevel(1);
    screen = "start";
  }
}

