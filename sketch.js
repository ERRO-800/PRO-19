var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  ghost=createSprite(300,450)
  ghost.addImage(ghostImg)
  ghost.scale=0.31
  ghost.debug=false;
  ghost.setCollider("rectangle",-21,48,100,260);
}

function draw() {
  if (gameState=="play") {
    gameplay();  
  }  

  else{
    background(0)
   //spookySound.play()
  }
  
}

function spawnDoor() {

  if (frameCount % 140 === 0) {
     door = createSprite(300,-10,10,10);
    door.x = Math.round(random(100,500));
    door.addImage(doorImg);
    door.scale = 1;
    door.velocityY = 1;
    door.y=-door.height/2
     
    door.lifetime = 600+door.height;
    door.depth=ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    
    climber=createSprite(door.x,door.y+door.height/2);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.scale=1;
    climber.lifetime=600+door.height;
    
    invisibleBlock=createSprite(climber.x,climber.y+3,90,20);
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600+door.height;
    invisibleBlock.visible=false 
    
    climber.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
   
    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);

  }

}

function gameplay() {
  
  background(200);
  
  if(tower.y > 400){
    tower.y = 300
  }

  spawnDoor()
  drawSprites()
  
  if (keyDown("space")) {
    ghost.velocityY=-10
  }
 
  ghost.velocityY = ghost.velocityY+1                    
 
  if (keyDown(RIGHT_ARROW)) {
    ghost.x=ghost.x+3
  }
 
  if (keyDown(LEFT_ARROW))  {
    ghost.x=ghost.x-3
  }

  ghost.collide(climbersGroup)

 if (ghost.y>600||ghost.isTouching(invisibleBlockGroup)) {
  gameState="END"
  }

}