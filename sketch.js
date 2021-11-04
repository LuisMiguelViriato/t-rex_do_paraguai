var trex, trex_correndo, pontas;
var solo,imagemdosolo, soloinvisivel;
var nuvem
var flokin
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var gruposcactos, gruponuvens;
var estadodojogo = "JOGAR"; 
var perdeukk;
var pavrao;
var restart, restartimg;
var die, cp, jump;
var ptc = 0;

function preload (){
  //loadAnimation/loadImage = carrega todas as imagens/animações 
  
  pavrao = loadImage ("gameOver.png")
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  imagemdosolo = loadImage ( "ground2.png");
  flokin = loadImage ("cloud.png")
  
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
  restartimg = loadImage("restart.png");
  
  die = loadSound ("die.mp3")
  cp = loadSound ("checkPoint.mp3")
  jump = loadSound ("jump.mp3")
  
  
}

function setup(){ //Padrões de configuração do jogo!
  createCanvas(600,200);
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);  
  // addAnimation adiciona a animação no Sprite!
  trex.addAnimation ("running", trex_correndo); 
  
  // pontas = createEdgeSprites (); // Beiradas! 
  trex.scale = 0.5; //scala e posição
  
  //SOLO
  solo = createSprite(300,190,600,20); 
  solo.addImage ("ground1", imagemdosolo)
  
  //solo invisível:
  soloinvisivel = createSprite(300,200,600,10); 
  soloinvisivel.visible = false; 
  
  //perdeukk= createSprite(300,100,2,2)
  //perdeukk.addImage(pavrao )

  gruposcactos = new Group();
  gruponuvens =  new Group();
  
  //gameover
      perdeukk= createSprite(300,100,2,2)
  perdeukk.addImage(pavrao )
  perdeukk.visible = false;
    //restart
    restart = createSprite (300,150,10,10)
  restart.addImage(restartimg)
  restart.scale = 0.5;
   restart.visible = false;
  
  
}
 
function draw(){

   background ("white");
   text ("Pontuação: "+ptc, 500,50)
  
  
  if(estadodojogo === "JOGAR"){
    ptc =  ptc + Math.round(frameCount/80);                                       
     solo.velocityX = -(5+(ptc/100));
    if (trex.isTouching(gruposcactos)){
      estadodojogo="ENCERRAR"
      die.play();
    }
    
      //trex pulando
      if(keyDown("space") && trex.y >=160) {    
        trex.velocityY = -10;
        jump.play();
      }
     trex.velocityY = trex.velocityY + 0.8; //"gravidade"  
    
      gerarNuvens();
      gerarcactos();
    
  }else if (estadodojogo === "ENCERRAR"){
    //??????????????????????????????
      solo.velocityX = 0;
    gruposcactos.setVelocityXEach (0);
    gruponuvens.setVelocityXEach (0);
    gruposcactos.setLifetimeEach (-1)
     gruponuvens.setLifetimeEach (-1)
    restart.visible = true
    perdeukk.visible = true
    trex.velocityY = 0
    if(mousePressedOver(restart)){
      pressme()
      
    }
    
  }
 
  //SOLO:
  if(solo.x<0) {
    solo.x=solo.width/2;  //width === largura
  }
  trex.collide (soloinvisivel ); // quicando nas beiras
 
  
  drawSprites();
  
}

function gerarNuvens() {
  if(frameCount%60===0) {
    nuvem = createSprite(600,90,22,55)
    nuvem.velocityX=-5
    nuvem.addImage(flokin);
    nuvem.y=Math.round(random(13,80))
    nuvem.lifetime=130
    
     gruponuvens.add(nuvem);
  }

}
function gerarcactos(){
  if(frameCount%60===0){
    cacto=createSprite(640,180)
    cacto.scale=0.4
    cacto.velocityX= -(5+(ptc/100));
    cacto.addImage(obstacle1)
    cacto.lifetime=210
     gruposcactos.add(cacto);
    
    
   var bot=Math.round(random(1,6))
    switch (bot){
      case 1:cacto.addImage (obstacle1)    
        break
         case 2:cacto.addImage (obstacle2) 
        break
        case 3:cacto.addImage (obstacle3) 
         break 
        case 4:cacto.addImage (obstacle4) 
         break
        case 5:cacto.addImage (obstacle5) 
         break
        case 6:cacto.addImage (obstacle6) 
         break
        
        
            }  
  }
  
  
}
  function pressme(){
    estadodojogo="JOGAR"
     ptc = 0
    gruposcactos.destroyEach()
    gruponuvens.destroyEach()
   frameCount=0
    restart.visible = false
    perdeukk.visible = false
   
    
  }
  
  
  
  
  