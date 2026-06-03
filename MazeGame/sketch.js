// -------------------- setup --------------------
// initialize characters/objects as global variables so they can be used in all functions
let screenState;

let player;

let alien;
let bat;
let dog;
let zombie;
let enemies = [];

let heart;
let hourglass;
let sword;
let powerUps = [];

let timer;

// preload images and data
function preload() {
  maze = loadImage("maze.png");
  arrows = loadImage("arrows.png");
  
  avatar_down = loadImage("avatar/down.png");
  avatar_left = loadImage("avatar/left.png");
  avatar_right = loadImage("avatar/right.png");
  avatar_standing = loadImage("avatar/standing.png");
  avatar_up = loadImage("avatar/up.png");
  
  alien_image = loadImage("enemies/alien.png");
  bat_image = loadImage("enemies/bat.png");
  dog_image = loadImage("enemies/dog.png");
  zombie_image = loadImage("enemies/zombie.png");
  
  heart_image = loadImage("power_ups/heart.png");
  hourglass_image = loadImage("power_ups/hourglass.png");
  sword_image = loadImage("power_ups/sword.png");
}

// runs once when program starts, creates canvas and sets values of all variables/characters/objects
function setup() {
  createCanvas(1000, 1000);
  
  // define the initial screen state
  screenState = "home";
  timer = 90;
  
  // define attributes of characters/objects
  player = {
    avatar: avatar_standing,
    x: 90,
    y: 92,
    w: 36/2,
    h: 56/2,
    speed: 5,
    lives: 3,
    hasSword: false
  };
  
  alien = {
    avatar: alien_image,
    x: null,
    y: null,
    w: 44/2,
    h: 52/2,
    speed: 3,
    direction: null
  };
  
  bat = {
    avatar: bat_image,
    x: null,
    y: null,
    w: 56/2,
    h: 52/2,
    speed: 3,
    direction: null
  };
  
  dog = {
    avatar: dog_image,
    x: null,
    y: null,
    w: 60/2,
    h: 52/2,
    speed: 3,
    direction: null
  };
  
  zombie = {
    avatar: zombie_image,
    x: null,
    y: null,
    w: 52/2,
    h: 56/2,
    speed: 3,
    direction: null
  };
  
  enemies = [alien, bat, dog, zombie]; // put all enemies into list for easy access
  
  randomPosition(alien); // sets random position at start of program
  randomPosition(bat);
  randomPosition(dog);
  randomPosition(zombie);
  
  heart = {
    avatar: heart_image,
    x: null,
    y: null,
    w: 32,
    h: 29
  };
  
  hourglass = {
    avatar: hourglass_image,
    x: null,
    y: null,
    w: 46/2,
    h: 63/2
  };
  
  sword = {
    avatar: sword_image,
    x: null,
    y: null,
    w: 30,
    h: 30
  };
  
  powerUps = [heart, hourglass, sword];
  
  randomPosition(heart);
  randomPosition(hourglass);
  randomPosition(sword);
}

// -------------------- screens --------------------
// home screen has title and two buttons
function home() {
  background("gray");
  
  fill(255);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("Maze Run", 500, 400);
  
  drawButton(1, 300, 600, 200, 100, 30);
  drawButton(2, 700, 600, 200, 100, 30);
}

// instructions screen tells player objective and rules of the game, also has home button
function instructions() {
  background("gray");
  
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  fill(255);
  textSize(30);
  
  text("Use arrows to move your player around the maze and get to the end.", 500, 100);
  image(arrows, 300, 210, 550/2, 360/2);
  image(player.avatar, 700, 210, player.w*4, player.h*4);

  text("Evade the enemies trying to attack! You have three lives until you die.", 500, 340);
  image(alien.avatar, 200, 430, alien.w*3, alien.h*3);
  image(bat.avatar, 400, 430, bat.w*3, bat.h*3);
  image(dog.avatar, 600, 430, dog.w*3, dog.h*3);
  image(zombie.avatar, 800, 430, zombie.w*3, zombie.h*3);
  
  text("Make sure to collect power-ups to boost your performance!", 500, 530);
  image(heart.avatar, 200, 620, heart.w*3, heart.h*3);
  textSize(20);
  text("Gives you an extra life.", 200, 710);
  image(hourglass.avatar, 500, 620, hourglass.w*3, hourglass.h*3);
  text("Gives you more time.", 500, 710);
  image(sword.avatar, 800, 620, sword.w*3, sword.h*3);
  text("Lets you eliminate one enemy.", 800, 710);
  
  textSize(30);
  text("You have 90 seconds to complete the maze. Good luck!", 500, 780);
  
  drawButton(0, 500, 880, 200, 100, 30);
}

// play screen has maze, pause button, displays number of lives and time left
function play() {
  rectMode(CENTER);
  fill(127);
  rect(500, 500, 1000, 1000);
  
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  image(maze, 500, 500, 900, 900);
  drawButton(0, 100, 20,  100, 50, 20);
  text("Lives: " + player.lives, 400, 20);
  text("Time: " + timer, 500, 20);
  
  // function to display power ups
  displayPowerUps(powerUps);
  
  // functions for all characters/objects to work properly
  movePlayer();
  moveEnemies(enemies);
  
  loseLife(enemies);
  obtainPowerUp();
  
  timerCountdown();
  endGame();
}

// this loops constantly
// depending on the screen state, run the corresponding function that draws everything on the screen
function draw() {
  if (screenState == "home") {
    home();
  }
  if (screenState == "instructions") {
    instructions();
  }
  if (screenState == "play") {
    play();
  }
}

// -------------------- buttons --------------------
// make list of buttons - each has label it displays and screen that it goes to
let buttons = [{label: "Home", screenState: "home"}, {label: "Instructions", screenState: "instructions"}, {label: "Play", screenState: "play"}];

// selects a button in the list and draws it on the screen
function drawButton(i, x, y, w, h, fontSize) {
    let button = buttons[i];

    fill(255);
    rectMode(CENTER);
    rect(x, y, w, h);
    
    fill(0);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    text(button.label, x, y);
}

// made with help from class project
// checks if the mouse's x and y is in range of the chosen button's width and height
function buttonIsClicked(i, x, y, w, h) {
  let button = buttons[i];
  let xOverlap = mouseX > (x - w/2) && mouseX < (x + w/2);
  let yOverlap = mouseY > (y - h/2) && mouseY < (y + h/2);
  
  return xOverlap && yOverlap;
}

// if the mouse is clicked and it is in range of the button, it retrieves the data from that button
function mousePressed() {
  if (screenState == "home") { // does this for each screen - buttons have different positions on different screens
    if (buttonIsClicked(1, 300, 600, 200, 100)) {
      screenState = buttons[1].screenState;
    }
    
    if (buttonIsClicked(2, 700, 600, 200, 100)) {
      screenState = buttons[2].screenState;
    }
  }
  
  if (screenState == "instructions") {
    if (buttonIsClicked(0, 500, 880, 200, 100)) {
      screenState = buttons[0].screenState;
    }
  }
  
  if (screenState == "play") {
    if (buttonIsClicked(0, 100, 10, 100, 50)) {
      screenState = buttons[0].screenState;
    }
  }
}

// -------------------- time --------------------
// timer is subtracted by 1 every 60 frames, which is 1 second
function timerCountdown() {
  if (frameCount % 60 == 0 && timer > 0) { // total framecount divided by 60 - the remainder is 0 every 60 frames
      timer--;
  }
}

// -------------------- collisions --------------------
// check if character touches the blue walls of maze
// made with help from ai
function wallCollision(element) {
  let mazeX = map(element.x, 50, 950, 0, maze.width); // element's coordinates are in reference to screen, not the maze - at the start during setup,
  let mazeY = map(element.y, 50, 950, 0, maze.height); // there's no maze on the screen to reference so the coordinates are adjusted in
  let mazeW = map(element.w, 0, 900, 0, maze.width); // reference to the maze image
  let mazeH = map(element.h, 0, 900, 0, maze.height);
    
  let current_color = {
    r: maze.get(mazeX + mazeW/2, mazeY), // gets color of a pixel on each side of the character
    l: maze.get(mazeX - mazeW/2, mazeY),
    u: maze.get(mazeX, mazeY - mazeH/2),
    d: maze.get(mazeX, mazeY + mazeH/2),
  };
  
  // boolean saying whether or not the pixel is part of the blue wall by using the wall's rgba value
  let is_blue = {
    r: current_color.r[0] == 1 && // each side of the character is accounted for again
    current_color.r[1] == 33 &&
    current_color.r[2] == 105 &&
    current_color.r[3] == 255,
    l: current_color.l[0] == 1 &&
    current_color.l[1] == 33 &&
    current_color.l[2] == 105 &&
    current_color.l[3] == 255,
    u: current_color.u[0] == 1 &&
    current_color.u[1] == 33 &&
    current_color.u[2] == 105 &&
    current_color.u[3] == 255,
    d: current_color.d[0] == 1 &&
    current_color.d[1] == 33 &&
    current_color.d[2] == 105 &&
    current_color.d[3] == 255,
  };
  
  return is_blue;
}

// made with help from class project
// checks if player has collided with enemy or power up
function elementCollision(element) {
  let xOverlap = player.x > (element.x - element.w/2) &&  player.x < (element.x + element.w/2);
  let yOverlap = player.y > (element.y - element.h/2) && player.y < (element.y + element.h/2);
  
  return xOverlap && yOverlap;
}

// -------------------- position --------------------
// runs once in setup to determine random coordinates for element
// made with help from ai
function randomPosition(element) {
  let validPosition = false; // at start, a valid position hasn't been found yet
  
  while (!validPosition) { // as long as a valid position hasn't been found, keep getting random coordinates for element
    element.x = random(250, 650);
    element.y = random(50, 900);
    
    let wallCollisionResult = wallCollision(element); // run the wall collision function for the element
    
    if (!wallCollisionResult.u && !wallCollisionResult.d && !wallCollisionResult.r && !wallCollisionResult.l) {
    validPosition = true; // if the element collides with the wall at these coordinates, a valid position has been found - escape from the loop
    }
  }
}

// -------------------- player --------------------
// moves player using arrow keys
function movePlayer() {
  let wallCollisionResult = wallCollision(player); // run the wall collision function for player
  
  if (keyIsDown(UP_ARROW)) {
    player.avatar = avatar_up;
    if (!wallCollisionResult.u) { // if there is no wall collision on that side of the player
      player.y -= player.speed;    // the player is allowed to move in that direction - done by changing their coordinate
    }
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    player.avatar = avatar_down;
   if (!wallCollisionResult.d) {
      player.y += player.speed;
    }
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    player.avatar = avatar_right;
    if (!wallCollisionResult.r) {
      player.x += player.speed;
    }
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    player.avatar = avatar_left;
    if (!(wallCollisionResult.l || (player.y > 90 && player.y < 95))) { // another condition: if the player isn't at start of the maze - prevents
      player.x -= player.speed;                                         // player from going outside
    }
  }
  
    image(player.avatar, player.x, player.y, player.w, player.h); // display the player after every iteration of the move function so that it
                                                                  // updates once the player's coordinates change
}

// end game when player gets to end of the maze or runs out of lives/time, displays different game over texts depending on result
function endGame() {
  if (player.x == 900 && (player.y > 905 && player.y < 910)) {
    // characters stop moving
    player.speed = 0;
    alien.speed = 0;
    bat.speed = 0;
    dog.speed = 0;
    zombie.speed = 0;
    
    fill(255);
    rect(500, 500, 350, 150);
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Great Job!!!", 500, 500);
  }
  
  if (player.lives == 0 || timer == 0) {
    player.speed = 0;
    alien.speed = 0;
    bat.speed = 0;
    dog.speed = 0;
    zombie.speed = 0;
    
    fill(255);
    rect(500, 500, 350, 150);
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Game Over :(", 500, 500);
  }
}

// -------------------- enemies --------------------
// moves enemy and changes direction randomly if they hit a wall
// made with help from ai
function moveEnemies(enemy_list) {
  for (let i = 0; i < enemy_list.length; i++) {
    let chosen_enemy = enemy_list[i];
    
    if (chosen_enemy.x && chosen_enemy.y) { // if the enemy's position exists (if they aren't eliminated), allow them to move
      let directions = ["up", "down", "right", "left"]; // list of directions to make them easy to choose randomly from

      if (!chosen_enemy.direction) { // there's no direction yet at the start, assign a random one
        chosen_enemy.direction = random(directions);
      }

      if (chosen_enemy.direction == "up") {
        if (!wallCollision(chosen_enemy).u) {
          chosen_enemy.y -= chosen_enemy.speed;
        }
        else {
          chosen_enemy.direction = random(directions);
        }
      }

      if (chosen_enemy.direction == "down") {
        if (!wallCollision(chosen_enemy).d) {
          chosen_enemy.y += chosen_enemy.speed;
        }
        else {
          chosen_enemy.direction = random(directions);
        }
      }

      if (chosen_enemy.direction == "right") {
        if (!(wallCollision(chosen_enemy).r) || (chosen_enemy.x == 900 && (chosen_enemy.y > 905 && chosen_enemy.y < 910))) {
          chosen_enemy.x += chosen_enemy.speed;
        }
        else {
          chosen_enemy.direction = random(directions);
        }
      }

      if (chosen_enemy.direction == "left") {
        if (!(wallCollision(chosen_enemy).l || (chosen_enemy.x == 90 && (chosen_enemy.y > 90 && chosen_enemy.y < 95)))) {
          chosen_enemy.x -= chosen_enemy.speed;
        }
        else {
          chosen_enemy.direction = random(directions);
        }
      }

      // if player gets within a certain distance, enemy follows in their direction
      if (dist(player.x, player.y, chosen_enemy.x, chosen_enemy.y) < 200) {
        if (player.x > chosen_enemy.x) {
          chosen_enemy.direction = directions[2];
          }
        else if (player.x < chosen_enemy.x ) {
          chosen_enemy.direction = directions[3];
        }

        if (player.y < chosen_enemy.y) {
          chosen_enemy.direction = directions[0];
        }
        else if (player.y > chosen_enemy.y) {
          chosen_enemy.direction = directions[1];
        }
      }

      image(chosen_enemy.avatar, chosen_enemy.x, chosen_enemy.y, chosen_enemy.w, chosen_enemy.h);
    }
  }
}

// made with help from ai
function loseLife(enemy_list) {
  for (let i = 0; i < enemy_list.length; i++) {
    let chosen_enemy = enemy_list[i];
    if (elementCollision(chosen_enemy)) {
      if (!player.hasSword) {
        player.lives--;
        randomPosition(chosen_enemy);
      }
      else {
        chosen_enemy.x = null;
        chosen_enemy.y = null;
        
        player.hasSword = false;
      }
      
      if (player.lives > 0) {
        player.speed = 5;
      }
    }
  }
}

// -------------------- power ups --------------------
// show the power up only if its coordinates are in the maze (when it has not been touched by player)
function displayPowerUps(powerup_list) {
  for (let i = 0; i < powerup_list.length; i++) {
    let chosen_powerUp = powerup_list[i];
    
    if (chosen_powerUp.x && chosen_powerUp.y) {
      image(chosen_powerUp.avatar, chosen_powerUp.x, chosen_powerUp.y, chosen_powerUp.w, chosen_powerUp.h);
    }
  }
}

// what to do when the player collides with each power up
function obtainPowerUp() {
  if (elementCollision(heart)) {
    player.lives++; // heart adds one life
    heart.x = null; // not on the maze anymore, dissapears
    heart.y = null;
  }

  if (elementCollision(hourglass)) {
    timer += 10; // hourglass adds 10 seconds to timer
    hourglass.x = null;
    hourglass.y = null;
  }
  
  if (elementCollision(sword)) {
    player.hasSword = true; // boolean for if player has sword becomes true
    sword.x = null;
    sword.y = null;
  }
}