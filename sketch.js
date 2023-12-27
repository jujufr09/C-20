var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Movendo plano de fundo
path=createSprite(1000,-290);
path.addImage(pathImg);
path.velocityY = 9;



//criar menino correndo 
boy = createSprite(0,800,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.09;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 590 ){
    path.y = height/7;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=1000;
        boy.y=400;
        boy.scale=2;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        if(mousePressedOver(path)) {
        reset()

        }
     
    }
  }
  
  drawSprites();
  textSize(50);
  fill(255);
  text("Tesouro: "+ treasureCollection,900,50);
  }

}

function createCash() {
  if (World.frameCount % 7 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 9;
  cash.lifetime = 600;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 15 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 9;
  diamonds.lifetime = 600;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 20 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 9;
  jwellery.lifetime = 600;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 60 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 11;
  sword.lifetime = 600;
  swordGroup.add(sword);
  }
}

function reset(){
gameState = PLAY
gameOver.visible=false
}