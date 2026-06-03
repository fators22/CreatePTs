// I used online resources (Google) to learn JavaScript concepts such as arrays, loops, and functions. All code in this program was written by me.

// screen currently being shown 
let currentScreen = "menu";

// Buttons
let instructionsButton, startGameButton, backButton, rollButton;
let rollsLeft = 3
let dice = [0,0,0,0,0];
let held = [false,false,false,false,false];
let scores = {Ones:"Ones", Twos:"Twos", Threes:"Threes", Fours:"Fours", Fives:"Fives", Sixes:"Sixes"}
let scoreRects={};
let diceImage;
let menuDice=[];
let instructionsDice=[];

for (let key in scores){
    console.log(key, scores[key])
}

function setup() {
  createCanvas(600, 500);
  textAlign(CENTER,CENTER);
  
  // Menu buttons
  instructionsButton = createButton('Instructions');
  instructionsButton.position(250, 200);
  instructionsButton.mousePressed(() => currentScreen = "instructions");
  
  startGameButton = createButton('Start Game');
  startGameButton.position(250, 250);
  startGameButton.mousePressed(() => currentScreen = "game");
  resetTurn();
  resetScores();
  
  // Back button
  backButton = createButton('Back');
  backButton.position(10, 10);
  backButton.mousePressed(() => currentScreen = "menu");
  backButton.hide(); // hide until needed
  
  // roll button
  rollButton = createButton('Roll Dice');
  rollButton.position(250,420);
  rollButton.mousePressed(rollDice);
  rollButton.hide();
  
  // falling dice for menu animaiton 
for (let i=0; i<10; i++){ menuDice.push({x:random(width),y:random(-500,0),speed:random(2,5),value:floor(random(1,7))});
}

  // falling dice for instructions screen 
  for(let i =0; i<10; i++){ instructionsDice.push({x:random(width),y:random(-500,0),speed:random(2,5),value:floor(random(1,7))});
  }
}
//load dice image before program starts 
function preload(){
  diceImage= loadImage("dice.png");
}

function draw() {
  background(240,0,0);
  
  //screen switching 
  if (currentScreen === "menu") {
    drawMenu();
    instructionsButton.show();
    startGameButton.show();
    backButton.hide();
    rollButton.hide();
    
  } else if (currentScreen === "instructions") {
    drawInstructions();
    instructionsButton.hide();
    startGameButton.hide();
    backButton.show();
    rollButton.hide();
    
  } else if (currentScreen === "game") {
    drawGame();
    instructionsButton.hide();
    startGameButton.hide();
    backButton.show();
    rollButton.show();
  }
}

//draw a falling die image 
function drawFallingDie(x,y,value){
  image(diceImage,x,y,50,50)
}

// menu screen and animaitng falling dice 
function drawMenu() {
  for(let d of menuDice){
    d.y+=d.speed;
    if(d.y>height){
      d.y = random(-100,0);
      d.x = random(width);
    }
    drawFallingDie(d.x,d.y);
  }
  // title 
  textSize(32);
  fill(0);
  textAlign(CENTER);
  text("YAHTZEE", width/2, 100);
}

//instructions screen 
function drawInstructions() {
  for(let d of instructionsDice){
    d.y += d.speed;
    if(d.y>height){
      d.y = random(-100,0);
      d.x = random(width);
    }
    drawFallingDie(d.x,d.y);
  }
  textSize(18);
  fill(0);
  textAlign(LEFT);
  text("Instructions:\n\n1. Roll the dice up to 3 times per turn.\n2. Choose a category to score your dice.\n3. The game ends after all categories are filled.\n\nGood luck!", 50, 50);
}

// game screen 
function drawGame() {
  textSize(20);
  fill(0);
  textAlign(CENTER);
  //show remaining rolls 
  text("Rolls left:"+rollsLeft, width/2, height/2);
  //draw dice 
  for (let i=0; i<5;i++){  drawDie(100+i*90,150,dice[i],held[i]);
  }
 drawScorecard();
}

// draw a single die 
function drawDie(x,y,value,isHeld){
  fill(isHeld?'lightgreen':255);
  rect(x,y,60,60,10);
  fill(0);
  textSize(24);
  text(value,x+30,y+30);
}

// rolling the dice 
function rollDice(){
  if(rollsLeft<=0){
    rollsLeft=0;
    return;
  }
  if (dice.every(d=>d===0)){
    for (let i=0;i<5;i++){
      held[i]=false;
    }
  }
for(let i=0;i<5;i++){
  if(!held[i]){
    dice[i]=floor(random(1,7))
  }
}
  rollsLeft--;
  if(rollsLeft<0){
    rollsLeft = 0;
  }
}

//mouse interaction with dice / scorecard 
function mousePressed(){
  if(currentScreen === "game"){

    for (let i = 0; i < 5; i++){
      let dx = 100 + i * 90;
      let dy = 150;

      if (
        mouseX > dx && mouseX < dx + 60 &&
        mouseY > dy && mouseY < dy + 60
      ){
        held[i] = !held[i];
      }
    }
// check if score category was clicked 
    checkScoreClick(scoreRects);
  }
}

//scorecard 
function drawScorecard(){
  textAlign(LEFT);
  textSize(16);
  let y =300;
  let i = 0;
  //reset clickable areas 
  scoreRects={};
  
  for(let category in scores){
    let rectX=50;
    let rectY= y+i*35-15;
    let rectW=150;
    let rectH=30;
    //store clickable 
    scoreRects[category]={x:rectX,y:rectY,w:rectW,h:rectH};
    //gray if held light if empty 
    fill(scores[category]===null? 200:'gray');
    rect(rectX,rectY,rectW,rectH,5);
    
    fill(0);
    text(category+":"+(scores[category]===null?"-":scores[category]),rectX+5,rectY+rectH/2);
    i++;
  }
}

function checkScoreClick(scoreRectsList) {
  if (!scoreRectsList) return;

  const categories = Object.keys(scoreRectsList);

  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    let r = scoreRectsList[category];
    if (scores[category] !== null) continue;
    if (
      mouseX > r.x &&
      mouseX < r.x + r.w &&
      mouseY > r.y &&
      mouseY < r.y + r.h
    ) {
      scoreCategory(category);
      resetTurn();
      return;
    }
  }
}


function scoreCategory(category){
  let total = 0;
  let target = 0;
  if(dice.every(d=>d===0)){
    return;
  }
  if (category === 'Ones') target = 1;
  if (category === 'Twos') target = 2;
  if (category === 'Threes') target = 3;
  if (category === 'Fours') target = 4;
  if (category === 'Fives') target = 5;
   if (category === 'Sixes') target = 6;

  for(let d of dice){
    if(d===target)total+=target;
  }
scores[category]=total;
}

//reset dice for a new turn 
function resetTurn(){
  for (let i = 0; i<5; i++){
    dice[i]=0;
    held[i]=false;
  }
  rollsLeft = 3;
}

//reset all scores 
function resetScores(){
  for (let category in scores){
    scores[category]=null;
  }
}