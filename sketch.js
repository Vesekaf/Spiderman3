const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var spiderman;
var bgImg;
var web;
var ground;
var buildingWall;

var gameState;

var score; 

var robber;

var hp;


function preload(){

  bgImg = loadImage("city.jpg");



}
function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
  world = engine.world;

  spiderman = new Spiderman(displayWidth/2-500, displayHeight/2, 100, 100); 

  ground = new Ground(displayWidth/2, displayHeight, displayWidth, 20);

  

  
 
  gameState = "Web";
  
}

function draw() {
  background(bgImg);

  Engine.update(engine);
  spiderman.display();
  ground.display();
  
  /*(keyCode === 32){
          
    web = new constraint(spiderman.body, {x: spiderman.body.position.x + 25, y: 75});
    web.display();
    
    
  }
*/
  
  
  if(gameState === "Web"){

    if(frameCount % 500 === 0){

      buildingWall = new building(displayWidth, displayHeight/2+250, 600, 800);
      
    }
    text(score, 100, 100);

    if(buildingWall !== undefined){
      buildingWall.display();
    }
    
    score = score + Math.round(getFrameRate()/60);

    
    if(score < 1000){
      
      gameState = "Battle"
    
    }
  }

  if(gameState === "Battle"){

    robber = new thug(100, 100, 150, 100);
    robber.display();


    var Mpos4 = robber.body.position;
    var Spos = spiderman.body.position;
  
  var distance = dist(Spos.x, Spos.y, Mpos4.x, Mpos4.y)
  
    
    if(distance <= robber.width + spiderman.width ){
            
      World.remove(world, robber.body);
      robber.visible = false;
  
    }
    
  }

  
  //   
  
  

  
  
  drawSprites();

  
}

function keyPressed(){
  if(keyCode === 37){
            
      Matter.Body.setVelocity(spiderman.body, {x: -5, y:0});
      
  }

  if(keyCode === 39){
            
    Matter.Body.setVelocity(spiderman.body, {x: 5, y:0});
    
}
if(keyCode === 38){
            
  Matter.Body.setVelocity(spiderman.body, {x: 0, y:-10});
  
}
if(keyCode === 40){
            
  Matter.Body.setVelocity(spiderman.body, {x: 0, y:1});
  
}

if(keyWentUp("r")){

  
  web.letgo();

}

}

function mouseDragged(){

  Matter.Body.setPosition(spiderman.body, {x: mouseX, y: mouseY});


}
function spawnBuildings(){

      



}


/*function isTouching(object1, object2){



  if(object1.position.x - object2.position.x <= object1.width/2 + object2.width/2 &&
    object2.position.x - object1.position.x <= object2.width/2 + object1.width/2 &&
    object1.position.y - object2.position.y <= object1.height/2 + object2.height/2 && 
    object2.position.y - object1.position.y <= object2.height/2 +  object1.height/2){
    
    return true;

  }

  else{

    return false;

  }
}
*/