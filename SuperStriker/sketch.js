let screen = "home"; // which screen is initally displayed

let bg;
let bghome;
let ball= {}
let equipMsg = ""
let buttonStart = { X: 200, Y: 255, W: 200, H:60};
let buttonBall = { X: 520, Y: 400, D:75};
let buttonBack = { X: 30, Y: 30, W: 75, H: 40};
let buttonInst = {X:212.5, Y:335, W:175, H:55};
let ballGame = {X:375, Y:409.1, D:44.12};
let ballChoice = {X: 600, Y: 450, D:90};
let ballColor = [0]; let ballColor1 = [200,0,100]; let ballColor2 = [20,0,100]; let ballColor3 = [200,100,0]; let ballColor4 = [210,0,0]; let ballColor5 = [220,150,0]; 
let bannerColor = [0,0,115];
let shooting = false; // tracks if the ball has been shot or not
let goaliepsn = {X:322.5, Y:180, W:110, H:150 }
let ballpsn = {X:0, Y:25, W:45, H:45,  }
let gameballpsn = {X:375, Y:409.1, W:44.12}; // game ball starting position
let ballspeed = 2;
let shotspeed = 0;
let lives = 3; // the player starts with 3 lives
let goaliespeed = 2;
let level = 1; // game starts at level 1
let shot = []; // stores the result of each shot as a goal or a miss
function preload() {
  bg = loadImage('grass1.png')
  bghome = loadImage('homebg.png');
  ball = loadImage('ball.png')
  goalie = loadImage('goalie.png')
  lose = loadImage('losescreen.png')
}

function setup() {
  createCanvas(600, 450);
}

function draw() {
  if (screen == "game") {
    resizeCanvas(750,450)
  } else {
    resizeCanvas(600,450)
  }

  if (screen == "home") {
    moveBanner();
    drawHomeScreen(); 
    drawBanner();
    
    
   
  } else if (screen == "game") {
    drawGameScreen();
    moveGoalie(goaliespeed *level); //goalie speed increases with level
    moveBall();
    updateScore(shot); // updates score using shot results list
    if (shooting){
    gameballpsn.Y -= shotspeed; // moves ball upward when shot
    }
    resetgameball();
    
  }  else if (screen == "lose"){
    drawloseScreen();
  } else if (screen== "ball"){
    drawballScreen();
  }  else if(screen == "Inst"){
    drawInstScreen();
    
    }
}

function drawHomeScreen() {
  background(bghome)
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(255);
  textFont("Times New Roman")
  text("Super Striker Penalty Shootout", width/2, 120);

  
  fill(50,150,100);
  rect(buttonStart.X, buttonStart.Y, buttonStart.W, buttonStart.H, 15);
  rect(buttonInst.X, buttonInst.Y, buttonInst.W, buttonInst.H, 15);
circle(buttonBall.X, buttonBall.Y, buttonBall.D);
  fill(0);
  textSize(20);
  text("Start Game", buttonStart.X + buttonStart.W/2, buttonStart.Y + buttonStart.H/2);
  text("How to play", buttonInst.X + buttonInst.W/2, buttonInst.Y + buttonInst.H/2);
 
  textSize(15)
 strokeWeight(2)
  fill(0)
  textAlign(CENTER, CENTER);
  text("ball skins", buttonBall.X-37,buttonBall.Y, buttonBall.D); 

}
function drawInstScreen() {
  background(135,206,250)
  textAlign(CENTER);
  textSize(40);
  fill(0);
  text("Instructions", width/2, 105);
  strokeWeight(4)
  line(190, 130, 405, 130, )
  fill(50,50,50);
  strokeWeight(1)
  textSize(20)
  fill(0)
  text("1.)", 62, 180)
  text("2.)", 62, 240)
  text("3.)", 62, 290)
  text("4.)", 62, 340)
  text("5.)", 62, 395)
  
  fill(102,61,20)
  text("       The objective of the game is to try and score the ball", width/2, 180);
  text("       into the goal without missing or letting the goalie block you.", width/2, 205);
  text(" Move the ball with the left and right arrow keys,", width/2, 240);
   text("hit the space bar to shoot. ", width/4+35, 260);
  text("          Levels Increment by 5 and as you level up the speed of", width/2, 290)
  text("                                           the goalie increases making it harder and harder to score. ", width/4+57, 315)
  text("         As you level up the goalie will make it harder to score ", width/2, 340);
  text("and if he blocks or you msis 3 times the game ends.", width/2, 365);
  text("Have fun! Try to improve your score and play as ", width/2, 395)
  text("   long as you would like :)", width/4+30, 420)
  
   textAlign(CENTER, CENTER);
  fill(220,0,0)
  rect(buttonBack.X,buttonBack.Y,buttonBack.W,buttonBack.H)
  fill(0)
  textSize(20)
  text("Back", buttonBack.X+buttonBack.W/2, buttonBack.Y+buttonBack.H/2)
}
function drawGameScreen() {
  background(bg);
  textAlign(CENTER, CENTER);
  fill(220,0,0)
  rect(buttonBack.X,buttonBack.Y,buttonBack.W,buttonBack.H)
  fill(0)
  textSize(20)
  text("Back", buttonBack.X+buttonBack.W/2, buttonBack.Y+buttonBack.H/2)
  fill(ballColor)
  circle(gameballpsn.X, gameballpsn.Y, gameballpsn.W) //draws the ball
  image(goalie, goaliepsn.X, goaliepsn.Y, goaliepsn.W, goaliepsn.H) // draws the goalie
  fill(255);
  textSize(40)
  
  // shows miss or goal message based on last shot result
  if (shot.length>0){
  if (shot[shot.length - 1] == "miss") {
  fill(255, 0, 0);
  text("Miss!", width/2, 130);
  } else {
      fill(0,250,0);
    text("Nice shot!", width/2, 130)
}
  }
  
}
function drawballScreen(){
background(135,206,250)
textAlign(CENTER, CENTER);
  textSize(45);
  fill(0);
  text("Choose Ball", width/2, height/4)
  fill(220,0,0)
  rect(buttonBack.X,buttonBack.Y,buttonBack.W,buttonBack.H)
  fill(ballColor2)
  circle(width/2, height/2, ballChoice.D)
  fill(ballColor3)
  circle(width*3/4, height/2, ballChoice.D)
  fill(ballColor1)
  circle(width/4, height/2, ballChoice.D)
  fill(ballColor4)
  circle(width*1.5/4, height*3/4, ballChoice.D)
  fill(ballColor5)
  circle(width*2.5/4, height*3/4, ballChoice.D)
  fill(0)
  textSize(20)
  text("Back", buttonBack.X+buttonBack.W/2, buttonBack.Y+buttonBack.H/2)
  fill(0);
  textSize(20);
  text(equipMsg, width/2, height-25); // shows which ball is equipped
 
}
function drawloseScreen(){
  
  background(lose)
  fill(255)
  textSize(40)
  text("You Lost, Quit!", width/2, height/3)
  textSize(25)
  text("(Or if you're brave enough try again) :)", width/2, height/2)
  fill(255,0,0)
  textSize(35)
  text("Highest level reached: " + level, width/2, height/1.5) // shows final level
  
  fill(220,0,0)
  rect(buttonBack.X,buttonBack.Y,buttonBack.W,buttonBack.H)
  fill(0)
  textSize(20)
  text("Back", buttonBack.X+buttonBack.W/2, buttonBack.Y+buttonBack.H/2)
}
// loops through the shot list to find and display score and level
function updateScore(shotlist){
 let score = 0;
  for (let i = 0; i < shotlist.length; i++){
    if (shotlist[i] == "goal" ){
      score++; // adds a point for each goal made
    }
  }
  level =1 + Math.floor(score / 5); //new level every 5 goals
  
  fill(255);
  textSize(25);
  text("Score: " + score, width/1.7, 50);
  text("Level: " + level, width/2.4, 50);
  text("Lives: " + lives, width-60, 50 )
}
function drawBanner(){
  fill (bannerColor)
  rect(0,25, 600, 45)
  
  image(ball, ballpsn.X, ballpsn.Y, ballpsn.W, ballpsn.H)
image(ball, ballpsn.X+200, ballpsn.Y, ballpsn.W, ballpsn.H)
image(ball, ballpsn.X+400, ballpsn.Y, ballpsn.W, ballpsn.H)
image(ball, ballpsn.X+600, ballpsn.Y, ballpsn.W, ballpsn.H)
  // these 2 following lines were generatavie AI suggestion
image(ball, ballpsn.X+800, ballpsn.Y, ballpsn.W, ballpsn.H)
image(ball, ballpsn.X+1000, ballpsn.Y, ballpsn.W, ballpsn.H)
}

// moves the banner balls across the screen on the home screen
function moveBanner(){
  if(screen =="home"){
    ballpsn.X+=2
    
    if (ballpsn.X + 800 > width){
      ballpsn.X= -600; // resets banner position when off screen
    }
  }
}

// moves the goalie left and right, speed parameter controls how fast
function moveGoalie(speed){
goaliepsn.X +=speed
  
  if (goaliepsn.X >=440 || goaliepsn.X <= 210){
   goaliespeed*=-1 // reverses direction when it hits the boundaries
  }
       
}
// moves the ball left or right based on arrow key pressed
function moveBall(){
   if (keyIsDown(LEFT_ARROW)) {
    gameballpsn.X -= 2*ballspeed;
    gameballpsn.X = max(0, gameballpsn.X);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    gameballpsn.X += 2*ballspeed;
    gameballpsn.X = min(750 - gameballpsn.W, gameballpsn.X);
  }
}
// spacebar shoots the ball
  function keyPressed(){
  if (keyCode==32 && !shooting){
    shotspeed= 6;
    shooting = true;
  }
  }
 function resetgameball(){
   if (screen == "game"){
     if (
       gameballpsn.Y<=220 ){
      
       // the following goalie check collision detection idea came from Ai but was written by myself similar to how I wrote the check mousePressed functions
       let hitGoalie = gameballpsn.X > goaliepsn.X && gameballpsn.X < goaliepsn.X + goaliepsn.W && gameballpsn.Y > goaliepsn.Y && gameballpsn.Y < goaliepsn.Y + goaliepsn.H;
      
       //following (hitGoalie) code was helped by me using AI
       
       if (hitGoalie) {
        shot.push("miss");  // goalie blocked it
         lives--;
      } else if (gameballpsn.X > 250 && gameballpsn.X < 500) {
        shot.push("goal");  // shot went in
      } else {
        shot.push("miss");// missed the goal entirely
        lives--;
      }
       //game over when the lives run out 
       if (lives == 0){
         screen = "lose"; 
         
       }
       //resets ball to starting position
       gameballpsn.X=375;
       gameballpsn.Y= 409.1;
       shotspeed=0;
       shooting = false;
       
     }
 }
}
function mousePressed() {
  if (screen == "home") {
    if (
      mouseX > buttonStart.X && mouseX < buttonStart.X + buttonStart.W &&  mouseY > buttonStart.Y && mouseY < buttonStart.Y + buttonStart.H
    ) {
      screen = "game";
      lives = 3;// resets lives on new game
      shot = []; // resets shot list on new game
    }
    }
    if (screen == "home") {
    if (
      mouseX > buttonBall.X-buttonBall.D/2 && mouseX < buttonBall.X+buttonBall.D/2 &&  mouseY > buttonBall.Y-buttonBall.D/2 && mouseY < buttonBall.Y+buttonBall.D/2
    ) {
      screen = "ball";
      
    }
    }
      if (screen == "home" ) {
    if (
      mouseX > buttonInst.X && mouseX < buttonInst.X + buttonInst.W &&  mouseY > buttonInst.Y && mouseY < buttonInst.Y + buttonInst.H
    ) {
      screen = "Inst";
    }
      }
  if (screen == "ball" || screen == "game" || screen == "Inst" || screen == "lose") {
    if (
      mouseX > buttonBack.X && mouseX < buttonBack.X + buttonBack.W &&  mouseY > buttonBack.Y && mouseY < buttonBack.Y + buttonBack.H
    ) {
      screen = "home";
}
  }
    if (screen == "ball") {
    if (
      mouseX > width/4-ballChoice.D/2 && mouseX < width/4+ballChoice.D/2 &&  mouseY > height/2-ballChoice.D/2 && mouseY < height/2+ballChoice.D/2
    ) {
      ballColor = ballColor1
      bannerColor = ballColor1
      equipMsg = "Pink Ball Equipped!"
    }
    }
    if (screen == "ball") {
    if (
      mouseX > width/2-ballChoice.D/2 && mouseX < width/2+ballChoice.D/2 &&  mouseY > height/2-ballChoice.D/2 && mouseY < height/2+ballChoice.D/2
    ) {
      ballColor = ballColor2
      bannerColor = ballColor2
      equipMsg = "Blue Ball Equipped!"
    }
    }
    if (screen == "ball") {
    if (
      mouseX > width*3/4-ballChoice.D/2 && mouseX < width*3/4+ballChoice.D/2 &&  mouseY > height/2-ballChoice.D/2 && mouseY < height/2+ballChoice.D/2
    ) {
      ballColor = ballColor3
      bannerColor = ballColor3
      equipMsg = "Orange Ball Equipped!"
    }
    }
    if (screen == "ball") {
    if (
      mouseX > width*1.5/4-ballChoice.D/2 && mouseX < width*1.5/4+ballChoice.D/2 &&  mouseY > height*3/4-ballChoice.D/2 && mouseY < height*3/4+ballChoice.D/2
    ) {
      ballColor = ballColor4
      bannerColor = ballColor4
      equipMsg = "Red Ball Equipped!"
    }
    }
    if (screen == "ball") {
    if (
      mouseX > width*2.5/4-ballChoice.D/2 && mouseX < width*2.5/4+ballChoice.D/2 &&  mouseY > height*3/4-ballChoice.D/2 && mouseY < height*3/4+ballChoice.D/2
    ) {
      ballColor = ballColor5
      bannerColor = ballColor5
      equipMsg = " Yellow Ball Equipped!"

    }
    }
 }
