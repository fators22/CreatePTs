//Define state and inital variables and objects
let state = "start";
let score = 0;
let lives = 3;
let level = 1;
let maxLevel = 5;

//Ball object with postion, speed, and radius
let ball = { x: 400, y: 350, speedx: 7, speedy: -7, r: 10 };
//Paddle object with postion, size, and movement speed
let paddle = { x: 300, y: 460, w: 120, h: 14, speed: 10 };

//List that stores all of the block objects *filled in creatBlocks function
let blocks =[];

function setup() {
  createCanvas(800, 500);
  createBlocks();
  console.log(blocks);
}

function createBlocks() {
  blocks = [];

  let rows = 2 + level; // more rows per level
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

function BlocksAndScore(pointsPerBlock) {
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];

    if (b.visible) {
      fill(255, 150, 0);
      rect(b.x, b.y, b.w, b.h);

      //Calculate the ball's edges for cleaner detection
      let ballLeft = ball.x - ball.r;
      let ballRight = ball.x + ball.r;
      let ballTop = ball.y - ball.r;
      let ballBottom = ball.y + ball.r;

      //Check if the ball overlaps with the block's rectangle
      if (
        ballRight > b.x &&          
        ballLeft < b.x + b.w &&       
        ballBottom > b.y &&          
        ballTop < b.y + b.h    
      ) {
        b.visible = false;
        ball.speedy *= -1;            // Bounce the ball vertically
        score += pointsPerBlock;
        
        // Break out of the loop so it only hits one block per frame
        break; 
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
  // Calculate the ball's edges
  let ballLeft = ball.x - ball.r;
  let ballRight = ball.x + ball.r;
  let ballTop = ball.y - ball.r;
  let ballBottom = ball.y + ball.r;

  // Check if the ball overlaps with the paddle's rectangle
  if (
    ballRight > paddle.x &&            // Ball's right edge passes paddle's left edge
    ballLeft < paddle.x + paddle.w &&   // Ball's left edge is before paddle's right edge
    ballBottom > paddle.y &&           // Ball's bottom edge passes paddle's top edge
    ballTop < paddle.y + paddle.h      // Ball's top edge is before paddle's bottom edge
  ) {
    // Prevent the ball from getting stuck inside the paddle
    ball.y = paddle.y - ball.r;

    // Reverse vertical direction
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
  textStyle(NORMAL);
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
  background(20, 30, 45);
  
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

  
  //Score, Lives, and Level
  fill(255);
  textSize(30);
  text("Score:" + score, 70,30);
  text("Lives:"+lives, 700,30);
  text("Level:" + level, width / 2, 30);
  
  //Check if all blocks are cleared
  let remainingBlocks = blocks.filter(b => b.visible).length;
  if (remainingBlocks === 0) {
    if (level < maxLevel) {
      level++;
      nextLevel();
    } else {
      state = "end";
    }
  }

  if (ball.y > height) {
    lives--;

    // Reset ball
    ball.x = 400;
    ball.y = 350;
    ball.speedx = 7;
    ball.speedy = -7;

    if (lives <= 0) {
      state = "end";
    }
  }
  
}

//Sets up the next level: regenerates blocks and speeds up the ball
function nextLevel() {
  createBlocks();

  ball.x = 400;
  ball.y = 350;

  let direction;
  if (ball.speedx > 0) {
    direction = 1;
  } else {
    direction = -1;
  }
  ball.speedx = direction * (7 + level);

  ball.speedy = -(7 + level);
}

//End screen UI
function endScreen() {
  background(0);

  textAlign(CENTER);
  fill(255);
  textSize(50);

  if (lives <= 0) {
    text("GAME OVER", width / 2, 200);
  } else {
    text("YOU WIN!", width / 2, 200);
  }

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
  level = 1;

  ball.x = 400;
  ball.y = 350;
  ball.speedx = 7;
  ball.speedy = -7;

  createBlocks(); // reset blocks
}
