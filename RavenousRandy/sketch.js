function setup() {
  createCanvas(400, 550);
}

// Objects with lists used to manage the variables for each fruit or dangerous object. 
let frt = {X: [], Y: [], Speed: [], W: [], Image: []}
let dangfrt={X:[], Y:[], Speed:[], W:[], Image:[]}
let randy={W:100, H:100, X:250, Y:450,Img:null, S:7};

// List used to manage the numbers used for the arithmetic function
num=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
sign=['PLUS', 'TIMES'];

let state=0
let hunger=0
let lives=1
let score=0

function preload(){
makefruit(7)
randy.Img = loadImage("randy.png")

}

// This function makes the falling fruit and the falling dangerous objects.
function makefruit(count){
  for(let i = 0; i<count; i++){
    frt.X.push(Math.floor(random(0, 400)))
    frt.Y[i] = (Math.floor(random(-height,0)))
    frt.Speed.push(Math.floor(random(3,5)))
    frt.W[i] = (Math.floor(random(70, 90)))
    frt.Image[i] = loadImage("Fruit"+floor(i%5)+".png")
  }
  for(let i = 0; i<2; i++){
    dangfrt.X.push(Math.floor(random(width)))
    dangfrt.Y[i] = (Math.floor(random(-height,0)))
    dangfrt.Speed.push(Math.floor(random(7,10)))
    dangfrt.W[i] = (Math.floor(random(30, 35)))
    dangfrt.Image[i] = loadImage("Danger"+floor(i%2)+".png")
  }
}

function movedanger(){
  for(let j=0; j<dangfrt.Y.length; j++){
    
   dangfrt.Y[j] = dangfrt.Y[j]+dangfrt.Speed[j]
    if(dangfrt.Y[j]>height){
      dangfrt.Y[j]=-height-500;
      dangfrt.X[j]=random(width)
    }
    if (detectCollision(j,dangfrt.X, dangfrt.Y, dangfrt.Speed, dangfrt.W, dangfrt.W, dangfrt.Image)){
    score-=10
    lives-=1
    state=2
    
    dangfrt.X[j]=random(0, 350)
    dangfrt.Y[j]=random(-height,0)
    dangfrt.Speed[j]=random(7,10)
    dangfrt.W[j]=random(30,35)
    }
//     Output here: through for loop, the angerous objects are drawn
    image(dangfrt.Image[j], dangfrt.X[j], dangfrt.Y[j], dangfrt.W[j]*3, dangfrt.W[j]*3)
  }
}

function movefruit(){
  for(let j=0; j<frt.Y.length; j++){
    
   frt.Y[j] = frt.Y[j]+frt.Speed[j]
    if(frt.Y[j]>height){
      score-=3
      hunger+=1
      frt.Y[j]=-height;
      frt.X[j]=random(width)
      if(hunger>=10){
        lives-=1
        state=2
        hunger=0
      }
    }
    if (detectCollision(j,frt.X, frt.Y, frt.Speed, frt.W, frt.W, frt.Image)){
      score+=2
      frt.X[j]=random(0, 350)
      frt.Y[j]=random(-height,0)
      frt.Speed[j]=random(3,5)
      frt.W[j]=random(70,90)
    }
//     Through for loop, fruits are printed.
    image(frt.Image[j], frt.X[j], frt.Y[j], frt.W[j], frt.W[j])
  }
}

// This function detects collisions based on the index of an object and the lists entered. 
function detectCollision(j, xList, yList, spList, wList, hList, imList){
  let xOverlap=xList[j]<randy.X+randy.W && randy.X<xList[j]+wList[j]
  let yOverlap=yList[j]<randy.Y+randy.H && randy.Y<yList[j]+hList[j];
  
  if(xOverlap && yOverlap){
    return true;
  }
    return false;
}

// This is where input is received to move the player character
function moverandy(){
  if(keyIsDown(65)||keyIsDown(LEFT_ARROW)){
    randy.X-=randy.S
  }
  if(keyIsDown(68)||keyIsDown(39)){
    randy.X+=randy.S
  }
  if(randy.X<0){
    randy.X=0
  }
  if(randy.X+randy.W>400){
    randy.X=width-randy.W
  }
//   Output is received through the image function, drawing an image of Randy. 
  image(randy.Img, randy.X, randy.Y, randy.W, randy.H)
}

function startscreen(){
  background(255, 169, 99)
  textSize(42)
  textAlign(CENTER)
  text("RAVENOUS RANDY", 200, 100)
  ellipse(200, 395, 100, 100)
  textSize(24)
  text("START", 200, 400)      
  if((dist(mouseX, mouseY, 200, 395)<=100) && mouseIsPressed){
     state=1
  }
}

function gamescreen(){
  background(134, 207, 107)
  textSize(16)
  text("Lives: "+ lives, 30, 30);
  text("Hunger: ", 30, 60);
  fill(0)
  rect(60, 40, 100, 30)
  fill('red')
  rect(65, 45, hunger*9,20)
  
  text("Score: "+score, 30, 90)
  
//   Calls the move functions for randy, fruit, and dangerous objects.
  movefruit(frt.X,frt.Y,frt.Speed,frt.W,frt.W,frt.Image)
  movedanger(dangfrt.X, dangfrt.Y, dangfrt.Speed, dangfrt.W, dangfrt.W, dangfrt.Image)
  moverandy(randy.X,randy.Y,randy.W,randy.H,randy.S,randy.Img)
  
}

// Prompts the user with an arithmetic problem when a life is lost.
function arithmetic(){
  let num1=random(num)
  let num2=random(num)
  let operation=random(sign)
  let ans
  var intput=int(prompt("YOU DIED! "+ num1+" "+ operation+" "+ num2+" EQUALS WHAT???"))
  if(operation=="PLUS"){
    ans=num1+num2
  }
  else{
    ans=num1*num2
  }
  if(intput==ans){
    state=1
    lives+=1
  }
  else{
    state=1
  }
  if(lives<=0){
    state=3
  }
}

function deathscreen(){
  background(1)
  textSize(52)
  textAlign(CENTER)
  textFont('Courier New')
  fill(255, 0, 0)
  text("RANDY DIED", 200, 200)
  textSize(32)
  text("SCORE: "+score, 200, 400)
}

// Updates the current screen of the game.
function draw() {
  if(state==0){
    startscreen()
  }
  if(state==1) {
    gamescreen()
  }
  if(state==2){
    arithmetic()
  }
  if(state==3){
    deathscreen()
  }
}

// SOURCES:
// randy.png: https://www.dreamstime.com/royalty-free-stock-images-portrait-young-man-screaming-mouth-open-studio-shot-image33402609
// Danger0: My picture
// Danger1: https://www.dreamstime.com/royalty-free-stock-images-portrait-young-man-screaming-mouth-open-studio-shot-image33402609
// Fruit0: https://www.pqmfl.com/product/cantaloupe/
// Fruit1: https://www.hardyfruittrees.ca/produit/apple-trees-for-northern-canada/apple-tree-oiase/?srsltid=AfmBOoowo8tZOzOiXF1MmxhZIQXyWjGTFeDSJJoMGCTOYxeLLX-AsGAN
// Fruit2: https://www.quanta.org/orange/
// Fruit3: https://www.melissas.com/products/red-watermelon?srsltid=AfmBOoqRx50-gLw4-A6MvAlMIaltqIC6K8BTSTfVxS0nCZTjlQhZ2xEM
// Fruit4: https://en.wikipedia.org/wiki/File:Kiwifruit_cross_section.jpg