


// Lists used to allow the game to handle multiple objects using loops  instead of seperate vairables
var W = 600
var H= 400
var state='start'
let runnerImage
let coneImage
var pSize=40
var pSpeed=3
let pX=50
let pY=H/2
var obstacles=[]
var runners=[]
let finishline=[]
var lives=3
var lvl=1
var totalD=42.195
var distanceKm=0
var lvlD=totalD/3
var startT
var finalT

function preload(){
  //images used are from free downloads online
  runnerImage= loadImage('runner.png')
  coneImage= loadImage('cone.png')
}
function setup() {
  createCanvas(W, H)
  textFont('Times New Roman')
}
function draw(){
  if (state=='start') startScreen()
  else if (state=='game') gameScreen()
  else if(state=='win') winScreen()
  else if (state=='lose') loseScreen()
}
function startScreen(){
background(150)
  textFont('Times New Roman')
  textSize(36)
  text('Marathon Race', W/2, 120)
  textSize(16)
  text('Use arrow keys to move', W/2, 200)
  text('Avoid cones and runners', W/2, 240)
  text('Finish the 3 race levels to win', W/2, 280)
  drawButton(W/2 -90, 300, 180,50, "Start", color(30,100,226))
}
function gameScreen(){
  drawStreet()
  movePlayer()
  moveObstacles()
  moveRunners()
  drawFinishLine()
  updateHUD()
}
//Input
//player movement is controlled using arrow keys
// these inputs are used to change the runners x and y position while moving
function movePlayer(){
  if(keyIsDown(UP_ARROW)) pY -= pSpeed;
  if(keyIsDown(DOWN_ARROW)) pY += pSpeed;
  if(keyIsDown(RIGHT_ARROW)){
    pX += pSpeed;
    distanceKm += lvlD / W;
    distanceKm = min(distanceKm,totalD);
}
  if(keyIsDown(LEFT_ARROW)) pX -= pSpeed;
 pX = constrain(pX, pSize/2, W - pSize/2);
pY = constrain(pY, 70 + pSize/2, H - 70 - pSize/2);
  imageMode(CENTER);
  image(runnerImage,pX,pY,pSize,pSize);
}
//procedure: moveObstacles
//purpose: Displays the obstacles and checks for collisions
//Uses iteration, selection, and sequence
function moveObstacles(){
  for (let i=0;i<obstacles.length;i++){
    let obs= obstacles[i];
    image(coneImage,obs.x,obs.y,obs.size,obs.size);
    if(checkCollision(pX,pY,pSize,obs)){
      hitObstacle();
    }
  }
}
function moveRunners(){
  for (let k=0;k<runners.length; k++){
    let run=runners[k];
    fill(240,140,0);
    ellipse(run.x,run.y,run.size);
    run.y += run.speed;
    if(run.y>H){
      run.y=-20
      run.x=random(200,550);
    }
    if (checkCollision(pX,pY,pSize,run)){
      hitObstacle();
    }
  }
}
function drawStreet(){
  background(80,180,80);

  // road
  fill(90);
  rect(0,50,W,H-100);

  // side lines
  stroke(255);
  strokeWeight(3);
  line(0,70,W,70);
  line(0,H-70,W,H-70);

  // center dashed line
  stroke(255,255,0);
  for(let x=0;x<W;x+=50){
    line(x,H/2,x+25,H/2);
  }

  noStroke();
}
function drawFinishLine(){
  // finish line across the road
  fill(255);
  rect(W-20, 70, 20, H-140);

  // checkerboard pattern
  fill(0);
  for(let y = 70; y < H-70; y += 20){
    rect(W-20, y, 10, 10);
    rect(W-10, y+10, 10, 10);
  }

  if(pX + pSize/2 >= W-20){
    lvl++;

    if(lvl > 3){
      endGame(true);
    }
    else{
      resetLvl();
    }
  }
}
//Output:
// the program displays visual output
// game text of lives, level, time, and distance
function updateHUD(){
  fill(0);
  textSize(15);
  let time=floor((millis()-startT)/1000);{
  text('lives:' +lives,60,20);
  text('Level'+lvl+"/3",150,20)
  text('Distance:'+distanceKm.toFixed(2)+'km',300,20);
  text('Time:'+time+'s',480,20)
}
}
//Procedure: checkCollision
//purpose: Detetcs if runner hits a object
//parameters: player X, player Y, player Size, object
//returns: true if collision occurs, if not false
function checkCollision(px,py,ps,obj){
  let d = dist(px,py,obj.x,obj.y);
  return d < ps/2 + obj.size/2;
}
function hitObstacle(){
lives--
  pX=50
  pY=H/2
  if(lives <= 0){
    endGame(false);

}
}
function resetLvl(){
  pX = 50;
  pY = H/2;
  finishline = {
    x: W-40,
    y: random(50,300)
  };
  obstacles = [];
 for(let i=0; i<lvl*3+2; i++){
  obstacles.push({
    x: random(200,550),
    y: random(50,350),
    size:35
  });
}
  runners = [];
  for(let i=0;i<lvl;i++){
    runners.push({
      x:random(200,550),
      y:random(-200,0),
      size:25,
      speed:random(2,4)
    });
  }
}

function reset(){
  lives = 3;
  lvl = 1;
  distanceKm = 0;
  startT = millis();
  resetLvl();
}

function winScreen(){
  background(200,255,200);
  textFont('Times New Roman');
  textAlign(CENTER);
  textSize(40);
  text("You Finished!",W/2,140);

  textSize(18);
  text('Final Time: ' + finalT + ' seconds',W/2,210);
  text("Distance: 42.195 km",W/2,240);

  drawButton(W/2-90,300,180,50,"Play Again",color(100,240,20));
}

function loseScreen(){
  background(255,200,200);
  textFont('Times New Roman')
  textAlign(CENTER);
  textSize(40);
  text('You Lost',W/2,160);
  textSize(18);
  text('Try Again!',W/2,220);
  drawButton(W/2-90,300,180,50,'Restart',color(200,134,45));
}

function mousePressed(){
  if(state=='start'){
    if(checkClick(W/2-90,300,180,50)){
      state='game';
      reset();
    }
  }
  else if(state=='win'){
    if(checkClick(W/2-90,300,180,50)){
      state='start';
    }
  }
  else if(state=='lose'){
    if(checkClick(W/2-90,300,180,50)){
      state='start';
    }
  }
}

function drawButton(bx,by,bw,bh,label,col){
  fill(col);
  textFont('Times New Roman')
  rect(bx,by,bw,bh,10);
  fill(255);
  textSize(20);
  textAlign(CENTER,CENTER);
  text(label,bx+bw/2,by+bh/2);
}

function checkClick(bx,by,bw,bh){
  return mouseX>bx && mouseX<bx+bw &&
         mouseY>by && mouseY<by+bh;
}

function endGame(won){
  finalT = floor((millis() - startT) / 1000);

  if(won){
    state = 'win';
  }
  else{
    state = 'lose';
  }
}
