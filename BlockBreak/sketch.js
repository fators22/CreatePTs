//Define state and inital variables and objects
let state = "start";
let score = 0;
let lives = 3;
//Ball object with postion, speed, and radius
let ball = { x: 400, y: 350, speedx: 4, speedy: -4, r: 10 };
//Paddle object with postion, size, and movement speed
let paddle = { x: 300, y: 460, w: 120, h: 14, speed: 5 };

//List that stores all of the block objects *filled in creatBlocks function
let blocks =[];

function setup() {
  createCanvas(800, 500);
  createBlocks();
  console.log(blocks);
}

function createBlocks() {
  blocks = [];

  let rows = 3;
  let cols = 8;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      blocks.push({
        x: 60 + c * 90,
        y: 60 + r * 40,
        w: 80,
        h: 20,
        visible: true
      });
    }
  }
}

//Required Procedure
//Loops through blocks, check collisions, removes blocks, and updates score

function BlocksAndScore(pointsPerBlock){
   for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];

    if (b.visible) {
      fill(255, 150, 0);
      rect(b.x, b.y, b.w, b.h);

      // Collision with ball
      if (
        ball.x + ball.r> b.x &&
        ball.x + ball.r< b.x + b.w &&
        ball.y + ball.r> b.y &&
        ball.y + ball.r < b.y + b.h
      ) {
        b.visible = false;
        ball.speedy *= -1;
        score += pointsPerBlock;
      }
    }
  }
}
//checks if the ball hits the wall and changes direction
function checkWallBounce() {
  // Left & right walls
  if (ball.x < 0 || ball.x > width) {
    ball.speedx *= -1;
  }

  // Top wall
  if (ball.y < 0) {
    ball.speedy *= -1;
  }
}

//Checks if ball hits the paddle
function checkPaddleBounce() {
  if (
    ball.y + ball.r >= paddle.y &&   // bottom of ball hits top of paddle
    ball.y < paddle.y &&             // ball is above paddle
    ball.x > paddle.x &&             
    ball.x < paddle.x + paddle.w
  ) {
    //This code was generated using ChatGPT to move ball above paddle (prevents sticking)
    ball.y = paddle.y - ball.r;

    ball.speedy *= -1;
  }
}

//controls what screen is displayed 
function draw() {
  if (state === "start") startScreen();
  else if (state === "game") gameScreen();
  else if (state === "end") endScreen();
}

//moves paddle based on user input(arrow keys)
function movePaddle() {
  if (keyIsDown(LEFT_ARROW)) {
    paddle.x -= paddle.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle.x += paddle.speed;
  }
  
  //keeps paddle inside screen
  paddle.x = constrain(paddle.x, 0, width - paddle.w);
}

//startScreen is from a Class Project
function startScreen() {
  background(0);

  textAlign(CENTER);
  fill(255);
  textSize(60);
  textStyle(BOLD);
  text("BLOCK", width / 2, 120);
  fill(255, 180, 0);
  text("BREAK", width / 2, 190);
  textStyle(NORMAL);

  drawButton(300, 250, 200, 100, "Start", "grey");
  text("Use Arrows to Move Paddle", width / 2, 420);
}

//Main Game Logic
function gameScreen() {
  background(61, 117, 145);
  
  //move the paddle
  movePaddle();
  
  //Make the paddle
  fill(255);
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
  
  //Make the ball
  circle(ball.x,ball.y,ball.r*2);
  
  //move balls
  ball.x+=ball.speedx
  ball.y+=ball.speedy
  
  //Check collisons
  checkWallBounce();
  checkPaddleBounce();
  
  // Blocks
  BlocksAndScore(1);

  
  //Score and Lives
  fill(255);
  textSize(20);
  text("Score:" + score, 70,30);
  text("Lives:"+lives, 700,30);
  
  //This code was generated using Gemini to end the game when all the blocks are broken
  let remainingBlocks = blocks.filter(b => b.visible).length;
if (remainingBlocks === 0) {
  state = "end";
}

  if (ball.y > height) {
    lives--;

    // Reset ball
    ball.x = 400;
    ball.y = 350;
    ball.speedx = 4;
    ball.speedy = -4;

    if (lives <= 0) {
      state = "end";
    }
  }
  
}

//End screen UI
function endScreen() {
  background(0);

  textAlign(CENTER);
  fill(255);
  textSize(50);
  text("GAME OVER", width / 2, 200);

  textSize(25);
  text("Score: " + score, width / 2, 260);

  drawButton(300, 350, 200, 80, "Restart", "grey");
}

// From class project. Draws clickable button
function drawButton(bx, by, bw, bh, label, col) {
  fill(col);
  stroke(255);
  strokeWeight(1.5);
  rect(bx, by, bw, bh, 12);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text(label, bx + bw / 2, by + bh / 2);
}

function checkClick(bx, by, bw, bh) {
  //check collision if mouseX is inside the rectangle
  return mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh;
}

//Changes state if button is clicked
function mousePressed() {
  if (state == "start") {
    if (checkClick(300, 250, 200, 100)) {
      state = "game";
      //reset();
    }
  } 
  else if (state == "end") {
    if (checkClick(300, 350, 200, 80)) {state = "start";
    resetGame();
  }
}
}

//Resets game variables
function resetGame() {
  score = 0;
  lives = 3;

  ball.x = 400;
  ball.y = 350;
  ball.speedx = 4;
  ball.speedy = -4;

  createBlocks(); // reset blocks
}
