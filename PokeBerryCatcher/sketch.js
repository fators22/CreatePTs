//Declare the necessary variables(ex. berries, dash properties, and player properties)
let button = {w:200,h:50}
let gameState="start" 
let clickState = false
let stage=1;
let score=0;
let berries={x:[],y:[],sp:[],size:[],type:[],img:[]};
let lives=7
let amount=5;
let type=["lum","mago","oran","sitrus"]
let player={x:300,y:450,sp:10,size:150,img: null}
let directionFacing="none"
let dash={distance:200,h:400,cooldown:0,ToE:0,amount:2,active:"none",x:null}
let spacePressed=false

//Declare the image variables to be assigned as images in preload
let gbg;
let bg;
let lum;
let mago;
let oran;
let sitrus;

//Load in all of the images
function preload(){
  gbg=loadImage("IMG_1162.jpeg")
  bg=loadImage("BG.jpg")
  lum=loadImage("lumberry.png")
  mago=loadImage("magoberry.png")
  oran=loadImage("oranberry.png")
  sitrus=loadImage("sitrusberry.png")
  minun=loadImage('IMG_1188.png')
  plusle=loadImage('IMG_1189.png')
  lightning=loadImage('fahh.png')
}

//Make the berries before the game begins
function setup() {
  createCanvas(600, 600);
  makeBerries()
}

//Function draw only needs the gamestate and the click states
function draw(){
  textFont('Trebuchet MS')
   if (gameState == "start") {
     startScreen()
   }
  else if (gameState == "game"){
    gameScreen()
  }
  else if (gameState == "win"){
     winScreen()
  }
    else if (gameState == "lose"){
     loseScreen()
  }
    else if (gameState == "guide"){
     guideScreen()
  }
    else if (gameState == "choose"){
      chooseScreen()
    }

  clickState=false //Ensure the clickstates stay false so that holding click does not cause multiple inputs
  spacePressed=false
}

function startScreen(){
  textSize(36)
  noStroke()
  background(bg) 
  fill(255)
  rect(width/2-90,height/2+135,button.w,button.h)
  fill(0)
  text("Play", width/2-25, height/2+175)
  fill(255)
  rect(width/2-90,height/2+195,button.w,button.h)
  fill(0)
  text("How to Play", width/2-85, height/2+235)
  textSize(72)
  fill("yellow")
  text("PokeBerry Catcher", width/2-300,150) //Guide the user to different screens using button collision
  if(isClicked(width/2-90,height/2+135)){
    gameState = "choose"
  }
    if(isClicked(width/2-90,height/2+195)){
    gameState = "guide"
  }
}

function gameScreen(){
  background(gbg)
  textSize(18)
  fill(255)
  //Display all of the variables that need to be seen by the user
  text("Score: "+score,25,25)
  text("Stage: "+stage,25,50)
  text("Lives: "+lives,25,75)
  text("Berries left: "+amount,25,100) 
  text("Dash Cooldown: "+ (dash.cooldown/1000).toFixed(1),25,125)
  text("Dashes Left: "+ dash.amount,25,150)
  //Call each function inside of the game screen function so it looks cleaner and easier to access
  stageUp()
  drawBerries()
  drawPlayer()
  dashing()
  //Make conditions to transition to each game screen
  if(lives<=0){
    gameState="lose"
  }
  if(score>=1000){
    gameState="win"
  }
}

function winScreen(){
  background(bg)
  noStroke()
  fill(255)
  rect(width/2-100,height/2,button.w,button.h)
  textSize(24)
  fill(0)
  text("Play Again?", width/2-65,height/2+30) //Pressing this would go back to gamescreen
  fill(255)
  rect(width/2-100,height/2+60,button.w,button.h)
  fill(0)
  text("Quit", width/2-25,height/2+95) // Go back to start screen
  textSize(72)
  text("You Win!", width/2-140, 125)
    if (isClicked(width/2-100,height/2)){
      gameState="choose"
    }
    if (isClicked(width/2-100,height/2+60)){
      gameState="start"
    }
}

function loseScreen(){
    background(bg)
  noStroke()
  fill(255)
  rect(width/2-100,height/2+150,button.w,button.h)
  textSize(24)
  fill(0)
  text("Play Again?", width/2-65,height/2+180) //Pressing this would go back to gamescreen
  fill(255)
  rect(width/2-100,height/2+210,button.w,button.h)
  fill(0)
  text("Quit", width/2-25,height/2+245) // Go back to start screen
  textSize(72)
  text("Game Over!", width/2-190, 125)
  textSize(48)
  text('Your score:'+score,width/2-140,170)
    if (isClicked(width/2-100,height/2+150)){
      gameState="choose"
    }
    if (isClicked(width/2-100,height/2+210)){
      gameState="start"
    }
}

//Create a universal button cliicking function with parameters so they can be used in the different screens
function isClicked(x,y){ 
  if (!clickState){
    return false
  }
    let xOverlap = mouseX > x && mouseX < x + button.w;
    let yOverlap = mouseY > y && mouseY < y + button.h;
    return xOverlap && yOverlap 
}
//This function ensures that a click only happens for one frame rather than being true when being held down
function mousePressed(){
  clickState = true
}
function guideScreen(){
  background(bg)
  noStroke()
  fill(255)
  rect(width/2-120,height/2-290,250,350)
  textSize(15)
  fill(0)
  text("Collect berries and don't let berries", width/2-115,30)
  text("drop to the floor!", width/2-115,50)
  text("Different berries give different", width/2-115,70)
  text("scores.", width/2-115,90)
  text("Stages increase through increments",width/2-115,110)
  text("of 25.", width/2-115,130)
  image(oran,width/2-115,150,lum.width*0.2,lum.height*0.2)
  image(mago,width/2-115,190,lum.width*0.2,lum.height*0.2)
  image(lum,width/2-115,230,lum.width*0.2,lum.height*0.2)
  image(sitrus,width/2-115,270,lum.width*0.2,lum.height*0.2)
  text("Oran berries give 1 point",width/2-70,170)
  text("Mago berries give 2 points",width/2-70,210)
  text("Lum berries give 4 points",width/2-70,250)
  text("Sitrus berries give 5 points",width/2-70,290)
  text("Use the arrow keys to move.",width/2-115,320)
  text("Press spacebar for a dash!",width/2-115,340)
  fill(255)
  rect(width/2-100,height/2+150,button.w,button.h)
  textSize(36)
  fill(0)
  text("Back", width/2-40,height/2+185) //Bring back to start screen
    if(isClicked(width/2-100,height/2+150)){
    gameState = "start"
  }
}

function stageUp(){
  if(amount==0){ //Use a condition to make sure when all the berries are gone, the stage goes up
     stage++
    amount=stage*5
    makeBerries()
     }
}

function makeBerries(){
  for(let i=0;i<amount;i++){ 
    berries.x.push(random(0,560))  
    berries.y.push(random(-600,0))
    berries.sp.push(3,5)
    berries.size.push(random(50,60))
    let rando=Math.floor(random(0,4))  
    berries.type.push(type[rando])  
    let currentType=berries.type[i]  
    if(currentType=="oran"){  
      berries.img.push(oran)
    }
    if(currentType=="lum"){
      berries.img.push(lum)
    }
    if(currentType=="mago"){
      berries.img.push(mago)
    }
    if(currentType=="sitrus"){
      berries.img.push(sitrus)
    }
}
}

function chooseScreen(){
  background(bg)
  textSize(36)
  fill(255)
  text("Choose Your Player",150,50)
  image(plusle,50,100,300,300)
  image(minun,325,100,300,300)
  rect(50,450,button.w,button.h)
  rect(325,450,button.w,button.h)
  fill(0)

  text("Plusle",95,485)
  text("Minun",375,485)
  if(isClicked(50,450)){
    resetGame() //Declare a universal function that allows for the game to be reset: Reset all of the variables
    player.img=(plusle)
    gameState='game'
  }
    if(isClicked(325,450)){
      resetGame()
    player.img=(minun)
    gameState='game'
  }
}

function drawBerries(){
  for(let i=0;i<berries.x.length;i++){
  image(berries.img[i],berries.x[i],berries.y[i],berries.size[i],berries.size[i])
  berries.y[i]=berries.y[i]+berries.sp[i]
  if(berries.y[i]>height){ 
    berries.y[i]=random(-70,0)
    berries.x[i]=random(0,560)
    lives--
  }
    berryDetection(i) 
}
}

function berryDetection(index){
  for(index=0;index<berries.x.length;index++){
      if(detectCollision(index) || dashCollision(index)){
    if(berries.type[index] == "oran"){
      score++
    }
    else if(berries.type[index] =="mago"){
        score=score+2
      }
    else if(berries.type[index] =="lum"){
      score=score+4
    }
    else if(berries.type[index] == "sitrus"){
      score=score+5
    }
      amount--
    berries.x.splice(index,1) 
    berries.y.splice(index,1)
    berries.sp.splice(index,1)
    berries.size.splice(index,1)
    berries.type.splice(index,1)
    berries.img.splice(index,1)
      index--
    }
  }
}

function drawPlayer(){
    image(player.img,player.x,player.y,player.size,player.size)
  if(keyIsDown(LEFT_ARROW) & player.x >0){
    player.x-=player.sp
    directionFacing='Left' //Direction facing variable for dashes
  }
   else if(keyIsDown(RIGHT_ARROW) & player.x+player.size <600){
    player.x+=player.sp
     directionFacing='Right'
  }
  else
    directionFacing='none'
}
function detectCollision(i){ //Function for player berry collisions
  let xOverlap=berries.x[i]<player.x+player.size && player.x<berries.x[i]+berries.size[i]
  let yOverlap=berries.y[i]<player.y+player.size && player.y<berries.y[i]+berries.size[i]
  return xOverlap && yOverlap
  }
function resetGame(){
  berries={x:[],y:[],sp:[],size:[],type:[],img:[]}
      lives=7
  score=0
  stage=1
  amount=5
  makeBerries()
  dash.cooldown=0
  dash.amount=2
  player.x=300
}

function dashing(){ //Dash function
  if(dash.cooldown>0){
     dash.cooldown-=deltaTime //Decrease the time by milliseconds, not the usual frame decrease rate that p5js normally uses
     }
  if(dash.cooldown<0){ //Debug the code so that no negative numbers can show up as the dash cooldown
    dash.cooldown=0
  }
  if(dash.cooldown==0 && dash.amount<2){ //Allow for the cooldown of dashes to continue so that all of the dash charges can refresh
    dash.amount++
    dash.cooldown=3000 
  }
  if(dash.amount==2){
    dash.cooldown=0
  }
  if(keyIsDown(RIGHT_ARROW) && player.x+player.size < 600-dash.distance && directionFacing=="Right" && keyIsDown(32) && dash.amount>0 && spacePressed){ //Conditions for a dash to occur: the player needs to hold down an arrow key for a direction, they need to be within bounds, and the need to be pressing spacebar. The spacePressed variable ensures that holding down space bar does not cause multiple dashes to occur at once
    player.x=player.x+dash.distance
    dash.cooldown=3000
    dash.amount--
    dash.active="right"
    dash.ToE=500
    dash.x=player.x //Record what the player's x coordinate is the moment the dash occurs for lingering hitbox
    if(player.x+player.size>600){
      player.x=600-player.size //Ensure that the dash would not cause the player to go out of bounds
    }
  }
  if (keyIsDown(LEFT_ARROW) && player.x>0 && directionFacing=="Left" && keyIsDown(32) && dash.amount>0 && spacePressed){ //Repeat the same dash function as the right one but this time just make it so that the dash decreases the player's x coordinate
      player.x=player.x-dash.distance  
    dash.cooldown=3000
    dash.amount--
      rect(player.x,450,50,dash.distance)
    dash.active="left"
    dash.ToE=500 
    dash.x=player.x
    if(player.x<0){
      player.x=0
    }
   }
  if(dash.ToE > 0){ //Make a timer for the how long the dash lingers for
    dash.ToE-=deltaTime
  }
  else{
    dash.active="none"
  }
  if (dash.active == "right") { //Create an image for the lingering dash effect, depending on the right or left one
  image(lightning,dash.x, player.y, dash.distance + 50, player.size)
}

if (dash.active == "left") {
  image(lightning,dash.x, player.y, dash.distance + 50, player.size)
}
}
function keyPressed(){
  spacePressed=true
}
function dashCollision(i){ //Make a dash collision system
  if(dash.active=="right" || dash.active=="left"){
  let dxOverlap=berries.x[i]<dash.x+dash.distance+50 && dash.x<berries.x[i]+berries.size[i]
  let dyOverlap=berries.y[i]<player.y+player.size && player.y<berries.y[i]+berries.size[i]
  return dxOverlap && dyOverlap
  }
}
//Source for Images:
//All artwork of berries and player characters are under the Pokemon Franchise
//Background is from Nauris Amatnieks from Pinterest