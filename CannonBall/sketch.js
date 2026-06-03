// variables for background images and character images
let bg1;
let bg2;
let CannonIMG;
let ballIMG;

// game state variables
let shooting = false;
let misses = 0;
let score = 0;
let level = 1;

// ball position, size, and speed
let ball = {
  x: 282,
  y: 500,
  w: 50,
  h: 50,
  spd: 10,
};

// Cannon position, size, and speed
let Cannon = {
  x: 270,
  y: 460,
  w: 85,
  h: 130,
  spd: 5,
};

// invisible box that detects if the ball goes through the hoop
let hitbox = {
  x: 278,
  y: 0,
  w: 40,
  h: 600,
};

// list of all buttons used across screens
let buttons = [
  { name: "back", x: 20, y: 20, w: 100, h: 35 },
  { name: "how", x: 185, y: 250, w: 230, h: 80 },
  { name: "play", x: 185, y: 380, w: 230, h: 80 },
];

// tracks which screen the player is on
let screen = "beginning";

// loads all images before the game starts
function preload() {
  bg1 = loadImage("IMG_1094.jpeg");
  bg2 = loadImage("IMG_1097.jpeg");
  CannonIMG = loadImage("IMG_1095-removebg-preview.png");
  ballIMG = loadImage("download-removebg-preview.png");
}

// creates the canvas and centers all text
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
}

// runs every frame and shows the correct screen
function draw() {
  if (screen === "beginning") {
    StartScreen();
  } else if (screen === "instruct") {
    InstructScreen();
  } else if (screen === "game") {
    GameScreen();
    Sidetoside();
    ShootCannon();
    LevelUp(score);
  } else if (screen === "end") {
    EndScreen();
  }
}

// draws the how to play screen
function InstructScreen() {
  background(bg2);

  // draws the instruction box
  strokeWeight(2);
  fill(255, 200, 120);
  rect(100, 100, 400, 400, 10);

  // title text
  fill(0);
  textFont("Impact");
  textSize(22);
  text("HOW TO PLAY", 300, 125);

  // AI Generated - Colors of the text
  textFont("Impact");
  textSize(26);

  // each line explains a rule of the game
  fill(255, 140, 0);
  text("Tap/Click the Cannon to shoot", 300, 200);

  fill(255);
  text("Make 5 shots and level up", 300, 240);

  fill(255, 80, 80);
  text("Miss 3 shots and you start over", 300, 280);

  fill(255, 140, 0);
  text("Make all 25 shots and you win!!", 300, 320);

  // draws the back button
  fill(30);
  stroke(255, 140, 0);
  strokeWeight(2);
  rect(buttons[0].x, buttons[0].y, buttons[0].w, buttons[0].h, 8);
  noStroke();
  fill(255, 140, 0);
  textFont("Impact");
  textSize(18);
  text(
    "BACK",
    buttons[0].x + buttons[0].w / 2,
    buttons[0].y + buttons[0].h / 2
  );
}

// draws the start/home screen
function StartScreen() {
  background(bg2);

  // AI Generated - shadow layer for title
  fill(0);
  textFont("Impact");
  textSize(56);
  text("Cannon BBALL", width / 2 + 4, 154);
  fill(255, 140, 0);
  stroke(0);
  strokeWeight(3);
  text("Cannon BBALL", width / 2, 150);
  noStroke();

  // loops through and draws the how to play and begin game buttons
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    if (btn.name !== "back") {
      fill(20, 20, 20);
      stroke(255, 140, 0);
      strokeWeight(3);
      rect(btn.x, btn.y, btn.w, btn.h, 10);
      noStroke();

      fill(255);
      textFont("Impact");
      textSize(28);

      if (btn.name === "how") {
        text("HOW TO PLAY", btn.x + btn.w / 2, btn.y + btn.h / 2);
      }
      if (btn.name === "play") {
        fill(255, 140, 0);
        text("BEGIN GAME", btn.x + btn.w / 2, btn.y + btn.h / 2);
      }
    }
  }
}

// draws everything shown during gameplay
function GameScreen() {
  background(bg1);

  // keeps the ball attached to the Cannon when not shooting
  if (shooting == false) {
    ball.x = Cannon.x + 10;
  }

  // draws the ball and Cannon
  image(ballIMG, ball.x, ball.y, ball.w, ball.h);
  image(CannonIMG, Cannon.x, Cannon.y, Cannon.w, Cannon.h);

  // AI Generated - shadow then colored level text
  textFont("Impact");
  textSize(22);
  fill(0);
  text("LEVEL: " + level, 42, 582);
  fill(255, 140, 0);
  text("LEVEL: " + level, 40, 580);

  // AI Generated - shadow then colored miss text
  textFont("Impact");
  textSize(22);
  fill(0);
  text("MISSES: " + misses + "/3", 152, 582);
  fill(255, 80, 80);
  text("MISSES: " + misses + "/3", 150, 580);

  // draws the back button
  fill(20, 20, 20);
  stroke(255, 140, 0);
  strokeWeight(2);
  rect(buttons[0].x, buttons[0].y, buttons[0].w, buttons[0].h, 8);
  noStroke();
  fill(255, 140, 0);
  textFont("Impact");
  textSize(18);
  text(
    "BACK",
    buttons[0].x + buttons[0].w / 2,
    buttons[0].y + buttons[0].h / 2
  );

  // invisible hitbox rectangle for the hoop
  noFill();
  noStroke();
  rect(hitbox.x, hitbox.y, hitbox.w, hitbox.h);

  // AI Generated - shadow then colored score text
  textFont("Impact");
  textSize(22);
  fill(0);
  text("SCORE: " + score, 302, 582);
  fill(255);
  text("SCORE: " + score, 300, 580);
}

// moves the ball upward and checks if it scores or misses
function ShootCannon() {
  if (shooting == true) {
    ball.y -= ball.spd;

    // finds the center of the ball
    let ballCenterX = ball.x + ball.w / 2;
    let ballCenterY = ball.y + ball.h / 2;

    let hoopcenterY = 80;

    // checks if the ball passes through the hoop hitbox
    if (
      ballCenterX > hitbox.x &&
      ballCenterX < hitbox.x + hitbox.w &&
      ballCenterY <= hoopcenterY
    ) {
      ball.y = 500;
      score++;
      shooting = false;
    }

    // if ball goes off screen it counts as a miss
    if (
      ballCenterX > 600 ||
      ballCenterX < 0 ||
      ballCenterY > 600 ||
      ballCenterY < 0
    ) {
      ball.y = 500;
      shooting = false;
      misses++;
      // 3 misses sends player to end screen
      if (misses >= 3) {
        screen = "end";
      }
    }
  }
}

// moves the Cannon left and right and bounces it off the walls
function Sidetoside() {
  if (shooting === false) {
    Cannon.x += Cannon.spd;
    if (Cannon.x >= width - Cannon.w || Cannon.x <= 0) {
      Cannon.spd *= -1;
    }
  }
}

// handles all button clicks and taps
function touchStarted() {
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];

    // checks if the player tapped inside a button
    if (
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h
    ) {
      // start screen button logic
      if (screen === "beginning") {
        if (btn.name === "play") {
          screen = "game";
        }
        if (btn.name === "how") {
          screen = "instruct";
        }
      }

      // end screen play again logic
      if (screen === "end") {
        if (btn.name === "play") {
          screen = "game";
          score = 0;
          misses = 0;
          level = 1;
          Cannon.spd = 5;
          ball.y = 500;
          shooting = false;
        }
      }

      // back button resets everything and goes to start screen
      if (btn.name === "back") {
        screen = "beginning";
        score = 0;
        misses = 0;
        level = 1;
        Cannon.spd = 5;
      }
    }
  }

  // if player taps the Cannon during gameplay it shoots
  if (screen === "game") {
    if (
      mouseX > Cannon.x &&
      mouseX < Cannon.x + Cannon.w &&
      mouseY > Cannon.y &&
      mouseY < Cannon.y + Cannon.h
    ) {
      shooting = true;
    }
  }

  // stops the browser from doing its default touch actions
  return false;
}

// checks score and levels up, takes current score as a parameter
function LevelUp(currentScore) {
  if (currentScore == 5 && level == 1) {
    level = 2;
    Cannon.spd = 7;
  }
  if (currentScore == 10 && level == 2) {
    level = 3;
    Cannon.spd = 9;
  }
  if (currentScore == 15 && level == 3) {
    level = 4;
    Cannon.spd = 12;
  }
  if (currentScore == 20 && level == 4) {
    level = 5;
    Cannon.spd = 15;
  }
  if (currentScore == 25 && level == 5) {
    screen = "end";
  }
}

// draws the end screen shown when the player wins or gets 3 misses
function EndScreen() {
  background(bg2);

  // AI Generated - shadow then colored game over text
  textFont("Impact");
  textSize(56);
  fill(0);
  text("GAME OVER", width / 2 + 4, 154);
  fill(255, 140, 0);
  stroke(0);
  strokeWeight(3);
  text("GAME OVER", width / 2, 150);
  noStroke();

  // shows the players final score
  fill(255);
  textSize(28);
  text("FINAL SCORE: " + score, width / 2, 240);

  // shows win or loss message depending on score
  if (score >= 25) {
    fill(255, 140, 0);
    text("YOU WIN!", width / 2, 290);
  } else {
    fill(255, 80, 80);
    text("BETTER LUCK NEXT TIME", width / 2, 290);
  }

  // draws the play again button
  fill(20, 20, 20);
  stroke(255, 140, 0);
  strokeWeight(3);
  rect(buttons[2].x, buttons[2].y, buttons[2].w, buttons[2].h, 10);
  noStroke();
  fill(255, 140, 0);
  textFont("Impact");
  textSize(28);
  text(
    "PLAY AGAIN",
    buttons[2].x + buttons[2].w / 2,
    buttons[2].y + buttons[2].h / 2
  );
}
