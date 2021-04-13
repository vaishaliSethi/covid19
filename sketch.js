var bg;
var player; 
var germsGroup, maskGroup, sanitizerGroup, vaccineGroup;
var vaccineCount, maskCount, sanitizerCount, score;
var GameState;
var PLAY;
var FAIL;
var WIN;
var NOTENOUGH;
var restart;
function preload(){
    bgImg = loadImage("images/track.jpg");
    germ1 = loadImage("images/germ1.png");
    germ2 = loadImage("images/germ2.png");
    germ3 = loadImage("images/germ3.png");
    maskImg = loadImage("images/mask.png");
    sanitizer1 = loadImage("images/sanitizer1.png");
    sanitizer2 = loadImage("images/sanitizer2.png");
    vaccineImg = loadImage("images/vaccine.png");
    restartImg = loadImage("images/restart.png");
    playerAnimation = loadAnimation("images/sprite1.png", "images/sprite2.png", "images/sprite3.png", "images/sprite4.png","images/sprite5.png");
}
function setup(){
    var canvas = createCanvas(700,900);

    bg= createSprite(350,0,700,10000);
    bg.addImage(bgImg);
    bg.visible=true;

    player= createSprite(350,700,20,75);
    player.addAnimation("player", playerAnimation);
    player.visible=true;

    restart= createSprite(350,575,50,50);
    restart.addImage(restartImg);
    restart.scale=0.7;
    restart.visible = false;

    germsGroup = new Group();
    maskGroup = new Group();
    sanitizerGroup = new Group();
    vaccineGroup = new Group();

    GameState= "PLAY"
    vaccineCount= 0;
    maskCount = 0;
    sanitizerCount = 0;
    score = 0;
}
function draw(){
    background("black");
    if(GameState === "PLAY"){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityY = 3;
    if(bg.y=== 3750){bg.velocityY=0;player.velocityY= -3; if(player.x===0){player.velocityY=0;}}
    if(keyDown("RIGHT_ARROW")){player.x=player.x+20;}
    if(keyDown("LEFT_ARROW")){player.x=player.x-20;}
    spawnGerms();
    spawnHandsanitizer();
    spawnMask();
    spawnVaccine();
    if(bg.y=== 3750 && vaccineCount !== 2){GameState="NOTENOUGH";}
    if(maskCount===0 && sanitizerCount===0 && germsGroup.collide(player)){
        GameState="FAIL";
        germsGroup.destroyEach();
    }else if(maskCount>0 && germsGroup.collide(player)){
        console.log("FIX THIS!!");
        maskCount = maskCount -1;
        germsGroup.destroyEach();  
    }else if(sanitizerCount>0 && germsGroup.collide(player)){
        console.log("FIX THIS!!");
        sanitizerCount = sanitizerCount -1;
        germsGroup.destroyEach();  
    }
    if(maskGroup.collide(player)){
        maskGroup.destroyEach();
        maskCount = maskCount + 2;
    }
    if(sanitizerGroup.collide(player)){
        sanitizerGroup.destroyEach();
        sanitizerCount = sanitizerCount + 1;
    }
    if(vaccineGroup.collide(player)){
        vaccineCount = vaccineCount +1;
        vaccineGroup.destroyEach();
    }
    if(vaccineCount === 2){
        GameState = "WIN";
        console.log("You Won");
    }
    }else if(GameState === "WIN"){
        bg.visible = false;
        background("lightgreen");
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();
        germsGroup.destroyEach();
        vaccineGroup.destroyEach();
        player.velocityY=0;
        restart.visible= true;
        player.visible = false;
        textSize(50);
        fill("black");
        stroke ("white");
        strokeWeight(5);
        text("Game Over: You Won",100,450);
        textSize(25);
        text("You No Longer Will Be Affected By the Covid 19 Virus",50,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }else if(GameState === "FAIL"){
        bg.visible = false;
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();
        germsGroup.destroyEach();
        restart.visible= true;
        vaccineGroup.destroyEach();
        player.velocityY=0;
        player.visible = false;
        textSize(50);
        fill("red");
        stroke ("white");
        strokeWeight(5);
        text("Game Over: You Lost",100,450);
        textSize(25);
        text("You Have Been Affected By the Covid 19 Virus",90,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }else if(GameState === "NOTENOUGH"){
        bg.visible = false;
        maskGroup.destroyEach();
        sanitizerGroup.destroyEach();
        germsGroup.destroyEach();
        restart.visible= true;
        vaccineGroup.destroyEach();
        player.velocityY=0;
        player.visible = false;
        fill("red");
        stroke ("white");
        strokeWeight(5);
        textSize(25);
        text("You Didn't Get Enough Vaccine Shots in Time",100,400);
        textSize(50);
        text("Game Over: You Lost",100,450);
        textSize(25);
        text("You Have Been Affected By the Covid 19 Virus",90,500);
        if(mousePressedOver(restart)) {
            reset();
          }
    }
    

    drawSprites();
    textSize(25);
   fill("red");
   stroke ("white");
   strokeWeight(5);
   text("Vaccine Count: "+ vaccineCount, 450,50);
   text(" PowerUp: "+ (maskCount + sanitizerCount), 450,100);
}

function spawnGerms() {
    if(frameCount % 80 === 0) {
      var germ = createSprite(50,50,10,10);
      germ.velocityY =  +(6 + 3*score/100);
      var position= random(100,600);
      germ.x= position;
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: germ.addImage(germ1);
                break;
        case 2: germ.addImage(germ2);
                break;
        case 3: germ.addImage(germ3);
                break;
        default: break;
      }
              
      germ.scale = 0.30;
      germ.lifetime = 300;
      germsGroup.add(germ);
    }
  }

function spawnMask() {
    if(frameCount % 400 === 0) {
      var mask = createSprite(50,50,10,10);
      mask.velocityY = +(8 + 3*score/100);
      var position= random(100,600);
      mask.x= position;
      mask.addImage(maskImg);

      mask.scale = 0.15;
      mask.lifetime = 300;
      maskGroup.add(mask);
  }
}
function spawnHandsanitizer() {
    if(frameCount % 200 === 0) {
      var sanitizer = createSprite(50,50,10,10);
      sanitizer.velocityY = +(8 + 3*score/100);
      var position= random(100,600);
      sanitizer.x= position;
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: sanitizer.addImage(sanitizer1);
                sanitizer.scale= 0.25;
                break;
        case 2: sanitizer.addImage(sanitizer2);
                sanitizer.scale= 0.15;
                break;
        default: break;
      }
      sanitizer.lifetime = 300;
      sanitizerGroup.add(sanitizer);
    }
  }

function spawnVaccine() {
    if(bg.y=== 3000) {
    console.log("It's Time");
      var vaccine = createSprite(50,50,10,10);
      vaccine.velocityY = +(6 + 3*score/100);
      var position= random(100,600);
      vaccine.x= position;
      vaccine.addImage(vaccineImg);
              
      vaccine.scale = 0.5;
      vaccine.lifetime = 300;
      vaccineGroup.add(vaccine);
    }

  if(bg.y=== 1725 && vaccineCount===0) {
    console.log("It's Time");
      var vaccine = createSprite(50,50,10,10);
      vaccine.velocityY = 10;
      var position= random(100,600);
      vaccine.x= position;
      vaccine.addImage(vaccineImg);
              
      vaccine.scale = 0.7;
      vaccine.lifetime = 300;
      vaccineGroup.add(vaccine);
    }
  }

function reset(){
    GameState="PLAY";
    bg.visible=true;
    player.visible=true;
    restart.visible=false;
    vaccineCount=0; 
    sanitizerCount=0;
    maskCount=0;
    score=0;
    bg.y=0;
    bg.velocityY = 3;
}