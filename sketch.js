var ball1,ball2;
var otherballs;
var platform;
var ladder;
var gravity=0.5;
var scene=1;
var posx=500;
var posy;
var flashlight,flashlight2;
var trigger;
var rocks=[];
var ties, otherties;

// function preload(){
// 	match=loadSound("assets/")
// }

function setup(){
	createCanvas(800,450);
//draw rocks randomly, constrain them on the ground and after puddle
	for(var i=0;i<20;i++){
	rocks[i]=new Rock(random(200,800),random(280,420));
}
//flashlight effect 
	flashlight=createSprite(0,0);
	flashlight.addImage(loadImage("assets/flashlight.png"));

	flashlight2=createSprite(0,0);
	flashlight2.addImage(loadImage("assets/flashlight2.png"));
//wrench represent lower class worker
	wrench=createSprite(900,350);
	wrench.addAnimation("pick","assets/wrench0001.png","assets/wrench0004.png");
	wrench.addAnimation("still","assets/wrench0001.png");
	wrench.setCollider("rectangle",0,0,160,100);
	wrench.debug=true;
//muddy poddle
	platform=createSprite(0,350);
	platform.addImage(loadImage("assets/platform.png"));
	platform.setCollider("rectangle",0,130,2000,191);
	//platform.debug=true;

//ladder in scene1
    ladder=createSprite(800,-196);
    ladder.addImage(loadImage("assets/ladder.png"));
    ladder.setCollider("rectangle",-20,-170,150,15);
    ladder.debug=true;
//ladder in scene2
    ladder2=createSprite(400,560);
    ladder2.addImage(loadImage("assets/ladder.png"));
    ladder2.setCollider("rectangle",-20,-170,150,15);
    ladder2.debug=true;
//tie repesent middle class
//tie as trigger
    tie=createSprite(400,100);
    tie.addImage(loadImage("assets/tie.png"));
    tie.setCollider("rectangle",0,0,40,200);
    tie.debug=true;
//other ties as background
    otherties=new Group();
    for(i=0;i<10;i++){
    	var ties=createSprite(random(width),random(-100,90));
    	ties.addImage(loadImage("assets/tie.png"));
    	//ties.scale=random(0.3,1);
    	otherties.add(ties);
    }

//main character in scene1
	ball1=createSprite(0,300);
	ball1.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
	ball1.addAnimation("fall","assets/ball_ground0001.png","assets/ball_ground0004.png");
	ball1.setCollider("circle",0,0,75);
	ball1.debug=true;
//main character in scene2;
    ball2=createSprite(400,300);
	ball2.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
	ball2.addAnimation("tie","assets/ball_tie0001.png","assets/ball_tie0004.png");
	ball2.setCollider("circle",0,0,75);
	ball2.debug=true;

	// otherballs=new Group();
	// for(var i=0;i<20;i++){
	// 	var other=createSprite(random(width),random(-200,-75));
	// 	other.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
	// 	other.setCollider("circle",0,0,75);
	// 	other.setSpeed(random(2,3), random(0, 360));
	// 	other.scale=random(0.3,1);
	// 	other.mass=other.scale;
	// 	otherballs.add(other);
	// }
}

function draw(){

//start from dark
	if(frameCount<100){
		background(0);	
	}else{


//scene1
if(scene===1){
 	background(255);
 drawSprite(platform);
 //draw rocks
 for(var i=0;i<20;i++){
rocks[i].display();
}
 drawSprite(ladder);
 drawSprite(ball1);
drawSprite(wrench);
 drawSprite(flashlight);

//flashlight move with ball
flashlight.position.x=ball1.position.x;
flashlight.position.y=ball1.position.y;
//camera move with ball
camera.position.x=ball1.position.x;
//give ball gravity
	ball1.velocity.y+=gravity;
	//keep still on ground
	if(ball1.collide(platform)){
		ball1.velocity.y=0;

	}
//press space to jump
	if(keyDown("space")){
		ball1.velocity.y=-4;

	}
	//press left and right arrow to move
	if(keyIsDown(LEFT_ARROW))
		ball1.position.x-=5;

	if(keyIsDown(RIGHT_ARROW))
		ball1.position.x+=5;
	//constrain ball in canvas
ball1.position.x=constrain(ball1.position.x,0,1000);


	// if(frameCount<4){
	// 	ball1.position.y=constrain(ball1.position.y,280,400);
	// }

//get wrench(move with ball)
if(ball1.overlapPoint(wrench.position.x,wrench.position.y)){
wrench.changeAnimation("still");
//rotate and fixed on ball
wrench.rotation=-40;
	wrench.position.x=ball1.position.x+55;
wrench.position.y=ball1.position.y+10;
//after get the wrench, ladder falls
		ladder.position.y+=2;
		ladder.position.y=constrain(ladder.position.y,-196,196);
}


	
//climb the ladder
//set colliders on the ladder when the ball reaches certain height
	if(ball1.collide(ladder)){
		ball1.velocity.y=0;
	}
//step1
	if(ball1.position.y<250&&ball1.position.y>180){
		ladder.setCollider("rectangle",20,115,80,15);
	}
	//step2
	if(ball1.position.y<180&&ball1.position.y>100){
		ladder.setCollider("rectangle",10,40,80,15);
	}
	//step3
	if(ball1.position.y<100&&ball1.position.y>20){
		ladder.setCollider("rectangle",0,-30,80,15);
	}
	//step4
    if(ball1.position.y<20&&ball1.position.y>0){
		ladder.setCollider("rectangle",-10,-100,80,15);
	}
	//step5
	if(ball1.position.y<-50){
		ladder.setCollider("rectangle",-20,-170,80,15);
	}
	//keep still on ladder

	
	
// if(ball.position.y<-50){
// 	camera.zoom=0.5;
// }else{
// 	camera.zoom=1;
// }

// otherballs.bounce(otherballs);

// for(var i=0;i<otherballs.length;i++){
// var s=otherballs[i];

//   if(s.position.x<0) {
//     s.position.x = 1;
//     s.velocity.x = abs(s.velocity.x);
//   }
  
//   if(s.position.x>width) {
//     s.position.x = width-1;
//     s.velocity.x = -abs(s.velocity.x);
//     }

//   if(s.position.y>-75) {
//     s.position.y = -76;
//     s.velocity.y = abs(s.velocity.y);
//   }
//   }


}
//condition to go to scene 2, climb to top of the ladder
 if(ball1.position.x>675&&ball1.position.x<925&&ball1.position.y<-50){
 	scene=2;
 }
 	if(scene===2){
 	ball1.remove();
 	background(255);
 	drawSprite(ladder2);
 	drawSprite(ball2);
    drawSprite(tie);
//     stroke(20);
// strokeWeight(3);
//     line(400,0,tie.position.x,tie.position.y-100);
    drawSprites(otherties);
    drawSprite(flashlight2);
    //flashlight move with ball
flashlight2.position.x=ball2.position.x;
flashlight2.position.y=ball2.position.y;
//ball move with ball
camera.position.x=ball2.position.x;
//ball gravity
ball2.velocity.y+=gravity;
//keep still on ladder
if(ball2.collide(ladder2)){
		ball2.velocity.y=0;
	}
	//ball control
if(keyWentDown("space")){
		ball2.velocity.y=-10;
	}
	if(keyIsDown(LEFT_ARROW))
		ball2.position.x-=5;
	if(keyIsDown(RIGHT_ARROW))
		ball2.position.x+=5;
	//reach tie, change to middle class
if(ball2.overlapPixel(tie.position.x,tie.position.y-60)){
	tie.remove();
	ball2.changeAnimation("tie");
	ball2.setCollider("circle",0,-20,75);
}
 }
}

} 
//test scenes
function mousePressed(){
	scene++;
}