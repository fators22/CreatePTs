let play;
let restart;
let bubbleImg;
let number = 10;
let bubble = {X:[], Y:[], W:[], H:[], Speed:[]}
let puffer = {X:[], Y:[], W:[], H:[], Speed:[]}
let backgroundImg;
let dolphinImg;
let dolphin = {x:220, y:350, w:80, h:80, spd:7}
let score = 0
let bubbleNumber = 10
let pufferNumber1 = 6
let pufferNumber2 = 6
let state = "start";
let speedUp = false;
let level = 1;
let showed10 = false;
let showed20 = false;
let showed35 = false;

// preload images
function preload() {
  play = loadImage("playbutton.png");
  restart = loadImage("restart.png");
  bubbleImg = loadImage("bubble.png");
  pufferImg = loadImage("pufferfish.png");
  backgroundImg = loadImage("background.jpg");
  dolphinImg = loadImage("dolphin.png");
}

// set up canvas + make the bubbles and pufferfish
function setup() {
  createCanvas(500, 550);
  makeBubbles(bubbleNumber);
  makePufferfish(pufferNumber1);
}


// make the states of game swap between, start, play, win, and lose
function draw() {
  if (state =="start") {
    startGame();
  }
    
    else if (state=="play") {
  playGame()
}

if (score == 50) {
  state = "win";
  winGame();
}

if (score < 0) {
  state = "lose";
  loseGame();
}
}

// make states change based on user input so that the restart + play buttons are functional
function mousePressed() {
  let d = dist(mouseX, mouseY, 240, 360);
  let p = dist(mouseX, mouseY, 250, 350);
  if (d < 50 && (state == "win" || state == "lose")) {
    score = 0;
    level = 1;
    bubble = {X:[], Y:[], W:[], H:[], Speed:[]};
    puffer = {X:[], Y:[], W:[], H:[], Speed:[]};
    makeBubbles(bubbleNumber);
    makePufferfish(pufferNumber1);
    dolphin.x = 220;
    dolphin.y = 350;
    state = "start";
  }

  else if (p < 50 && state == "start") {
    state = "play";
  }
  showed10 = false;
showed20 = false;
showed35 = false;
speedUp = false;
}

// design for the initial game start page
  function startGame() {
  noTint();
  textAlign(CENTER)
  background(220, 239, 250);
  textSize(70);
  textStyle(BOLD);
  fill(0,0,75,150);
  text("Dolphin Pop", width/2, 175);
      textSize(15);
      textStyle(NORMAL);
    textAlign(CENTER)
      text("Reach 50 Points by Popping Bubbles and Avoiding Pufferfish!", width/2, 230);
    text("****Use Arrow Keys to Move Up, Down, Left, and Right****", width/2, 490)
    text("Bubble: +1 | Pufferfish: -3", width/2, 520)

  fill(0,0, 75,150);
  strokeWeight(5);
  fill(200, 220, 230);
  ellipse(250, 350, 100, 100);
  noStroke();
  fill(0,0,75,150);
triangle(235, 330, 235, 370, 275, 350);  
  speedUp = false;
  }

// call all the functions being used while the game is in play so that the bubbles, pufferfish, and dolphin are made and move
function playGame() {
  background(backgroundImg);
  moveBubble();
  movePufferfish();
  makeDolphin();
  collisionDetection();
  collisionDetectionPufferfish();
 // reset the arrays and remake the pufferfish and bubbles at a faster speed once the score is greater than 10
  if (score >= 10 && level==1){
    level = 2;
    bubble = {X:[], Y:[], W:[], H:[], Speed:[]}
    puffer = {X:[], Y:[], W:[], H:[], Speed:[]}  
    makeBubbles(bubbleNumber);
    makePufferfish(pufferNumber1)
    speedUp = true;
  }
  
  // make there be text that functions as a visual indicator for the speed increase after the score initially passes 10
    if(score>= 10 && score<=12 && speedUp == true && showed10==false){
      textAlign(CENTER)
      textSize(80)
      text("Faster!", width/2, height/2)
    }

  if(score>12){
    showed10=true;
  }
  
    if (score >= 20 && level == 2){
    level = 3;
    bubble = {X:[], Y:[], W:[], H:[], Speed:[]}
    puffer = {X:[], Y:[], W:[], H:[], Speed:[]}  
    makeBubbles(bubbleNumber);
    makePufferfish(pufferNumber1)
    speedUp = false;
  }

    if(score>= 20 && score<=22 && speedUp == false && showed20==false){
      textAlign(CENTER)
      textSize(80)
      text("Faster!", width/2, height/2)
    }
  
  if(score > 22){
  showed20 = true;
}
  
      if (score >= 35 && level == 3){
    level = 4;
    bubble = {X:[], Y:[], W:[], H:[], Speed:[]}
    puffer = {X:[], Y:[], W:[], H:[], Speed:[]}  
    makeBubbles(bubbleNumber);
    makePufferfish(pufferNumber2)
    speedUp = false;
  }
  
      if(score>= 35 && score<=37 && speedUp == false && showed35==false){
      textAlign(CENTER)
      textSize(80)
      text("Faster!", width/2, height/2)
    }
  
  if(score>37){
    showed35=true
  }
 
//display the score 
  fill(255);
  textSize(25);
  textAlign(LEFT)
  text("Score: ", 30, 40);
  text(score, 110, 40);
}

// design for the game win page
function winGame() {
  background(209, 240, 211);
  textSize(70);
  textStyle(BOLD);
  fill(0,0,0,150);
  noStroke();
  textAlign(LEFT);
  text("You Win!", 90,height/2-90);
  textSize(30);
  text("Score:", 160,height/2-30);
  text(score, 265,height/2-30);
  stroke(0,0,0,135);
  strokeWeight(4);
  noFill();
  ellipse(240,360,100,100);
  tint(0,0,0,150);
  image(restart,190,310,100,100);
}

// design for the game lose page
function loseGame() {
  background(230, 188, 188);
  textSize(70);
  textStyle(BOLD);
  fill(0,0,0,150);
  noStroke();
  textAlign(LEFT)
  text("You Lose", 90,height/2-90);
  textSize(30);
  text("Try Again?", 165,height/2-30);
  stroke(0,0,0,135);
  strokeWeight(4);
  noFill();
  ellipse(240,360,100,100);
  tint(0,0,0,150);
  image(restart,190,310,100,100);
 }

// create the bubbles
function makeBubbles(count) {
  for (let i = 0; i < count; i++) {
    
    // create the initial bubbles with varying widths and heights at random x and y values + speed b/w 1 and 3
    if (score < 10){
      bubble.X.push(random(0,width-70));
      bubble.Y.push(random(-400, 0));
      bubble.Speed.push(random(1, 3));
      bubble.W.push(random(90, 150));
      bubble.H.push(random(50, 85));
    }
    
    // create the faster bubbles with varying widths and heights at random x and y values + speed b/w 3 and 5
    else if (score < 20){
      bubble.X.push(random(0,width-70));
      bubble.Y.push(random(-400, 0));
      bubble.Speed.push(random(3, 5));
      bubble.W.push(random(90, 150));
      bubble.H.push(random(50, 85));
    }

        else if (score < 35){
      bubble.X.push(random(0,width-70));
      bubble.Y.push(random(-400, 0));
      bubble.Speed.push(random(4, 6));
      bubble.W.push(random(90, 150));
      bubble.H.push(random(50, 85));
    }
    
        else if (score < 50){
      bubble.X.push(random(0,width-70));
      bubble.Y.push(random(-400, 0));
      bubble.Speed.push(random(6, 7));
      bubble.W.push(random(90, 150));
      bubble.H.push(random(50, 85));
    }
  }
}

// create the pufferfish 
function makePufferfish(countPufferfish) {
  for (let i = 0; i < countPufferfish; i++) {
    
    // create the initial bubbles with varying widths and heights at random x and y values + speed b/w 1 and 3
    if (score < 10){
    puffer.X.push(random(0,width-70));
    puffer.Y.push(random(-400, 0));
    puffer.Speed.push(random(2, 4));
    puffer.W.push(random(30, 50));
    puffer.H.push(random(30, 45));
    }
    
  // create the faster bubbles with varying widths and heights at random x and y values + speed b/w 3 and 5
  else if (score < 20){    
    puffer.X.push(random(0,width-70));
    puffer.Y.push(random(-400, 0));  
    puffer.Speed.push(random(5,7));
    puffer.W.push(random(30, 50));
    puffer.H.push(random(30, 45));
    }    
  else if (score < 35){    
    puffer.X.push(random(0,width-70));
    puffer.Y.push(random(-400, 0));  
    puffer.Speed.push(random(7, 9));
    puffer.W.push(random(30, 50));
    puffer.H.push(random(30, 45));
    }    
  else if (score < 50){    
    puffer.X.push(random(0,width-70));
    puffer.Y.push(random(-400, 0));  
    puffer.Speed.push(random(9, 11));
    puffer.W.push(random(30, 50));
    puffer.H.push(random(30, 45));
    }    
  }
}

// make the bubbles fall down the screen
function moveBubble() {
  // loops through all the bubbles made through the makeBubble function and moves them down the screen by adding speed to their Y value
  for (let j = 0; j < bubble.Y.length; j++) {
    bubble.Y[j] += bubble.Speed[j];
    // reset bubble to the top when it reaches the bottom
    if (bubble.Y[j] > height) {
      bubble.Y[j] = -85;
      bubble.X[j]=random(0,width-70);
    }
    // make the bubble associated with the index
    image(bubbleImg, bubble.X[j], bubble.Y[j], bubble.W[j], bubble.H[j]);
  }
}

// make the pufferfish fall down the screen
function movePufferfish() {
  for (let j = 0; j < puffer.Y.length; j++) {
    puffer.Y[j] += puffer.Speed[j];
  // loops through all the pufferfish made through the makePufferfish function and moves them down the screen by adding speed to their Y value
    if (puffer.Y[j] > height) {
      puffer.Y[j] = -85;
      puffer.X[j]=random(0,width-70);
    }
    // make the pufferfish associated with the index
    image(pufferImg, puffer.X[j], puffer.Y[j], puffer.W[j], puffer.H[j]);
  }
}

function collisionDetection() {
  for (let i = 0; i < bubble.X.length; i++) {
  // make the area for collision around the dolphin more specific
    let dolX = dolphin.x + 30;
    let dolY = dolphin.y + 40;
    let dolW = dolphin.w - 60;
    let dolH = dolphin.h - 80;

    // make the bubble reset to the top of the canvas at a random x value if the dolphin comes into contact with it + make the score increase by one
    if (dolX < bubble.X[i] + bubble.W[i] && dolX + dolW > bubble.X[i] && dolY < bubble.Y[i] + bubble.H[i] && dolY + dolH > bubble.Y[i]) {
      bubble.Y[i] = -85;
      bubble.X[i] = random(0,width-70);
      score++;
    }
  }
}

function collisionDetectionPufferfish() {
  for (let i = 0; i < puffer.X.length; i++) {
  // make the area for collision around the dolphin more specific
    let dolX = dolphin.x + 30;
    let dolY = dolphin.y + 40;
    let dolW = dolphin.w - 60;
    let dolH = dolphin.h - 80;

    // make the pufferfish reset to the top of the canvas at a random x value if the dolphin comes into contact with it + make the score decrease by one
    if (dolX < puffer.X[i] + puffer.W[i] && dolX + dolW > puffer.X[i] && dolY < puffer.Y[i] + puffer.H[i] &&
      dolY + dolH > puffer.Y[i]) {
      puffer.Y[i] = -85;
      puffer.X[i] = random(0,width-70);
      score=score-3;
    }
  }
}

// create the dolphin image and make it move based on user input
function makeDolphin(){ 
  image(dolphinImg,dolphin.x,dolphin.y,dolphin.w,dolphin.h);
  
  if (keyIsDown(RIGHT_ARROW) && dolphin.x < width-80){
    dolphin.x += dolphin.spd;
  } 
  if (keyIsDown(LEFT_ARROW) && dolphin.x > 0) {
    dolphin.x -= dolphin.spd;
  }
  if (keyIsDown(DOWN_ARROW) && dolphin.y < height-80){
    dolphin.y += dolphin.spd;
  }
  if (keyIsDown(UP_ARROW) && dolphin.y > 0) {
    dolphin.y -= dolphin.spd;
  }
}
