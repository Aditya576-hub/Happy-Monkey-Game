
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400, 400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",  monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("white");
  
 if (gameState == PLAY) {
   
   stroke("white");
  textSize(20);
  fill("white");         
  text("score:  "+ score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime:  "+ survivalTime, 100, 50);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }

  if(keyDown("space") && monkey.y >= 310) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
   
   if (obstacleGroup.isTouching(monkey)) {
       gameState = END;
   }
  
spawnBanana(); 
spawnObstacle();  
}   
   
   if (gameState == END) {
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     
     
     
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
   }  
  
drawSprites();  
}

function spawnBanana() {
if (frameCount % 100 == 0) {
banana = createSprite(380,280,20,20);
banana.addImage(bananaImage);
banana.x = Math.round(random(120,200));
banana.y = Math.round(random(300,200));  
banana.velocityX = -3;
banana.scale = 0.1;  
  
FoodGroup.add(banana); 
}  
}  

function spawnObstacle() {
 if (frameCount % 60 == 0) {
obstacle = createSprite(230,320,20,20);
obstacle.addImage(obstacleImage);
obstacle.x = Math.round(random(120,200));
obstacle.velocityX = -5
obstacle.scale = 0.1;
  
obstacleGroup.add(obstacle);  
}
}