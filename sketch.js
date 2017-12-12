var ball;
var otherballs;
var platform;
var ladder;
var gravity=0.5;


function setup(){
	createCanvas(800,450);

	platform=createSprite(400,350);
	platform.addImage(loadImage("assets/platform.png"));
	platform.setCollider("rectangle",0,130,800,191);
	//platform.debug=true;

    ladder=createSprite(400,-196);
    ladder.addImage(loadImage("assets/ladder.png"));
    ladder.setCollider("rectangle",-20,-170,150,15);
    //ladder.debug=true;

	ball=createSprite(400,300);
	ball.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
	ball.addAnimation("fall","assets/ball_ground0001.png","assets/ball_ground0004.png");
	ball.setCollider("circle",0,0,75);
	//ball.debug=true;

	otherballs=new Group();
	for(var i=0;i<20;i++){
		var other=createSprite(random(width),random(-200,-75));
		other.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
		other.setCollider("circle",0,0,75);
		other.setSpeed(random(2,3), random(0, 360));
		other.scale=random(0.3,1);
		other.mass=other.scale;
		otherballs.add(other);
	}

}

function draw(){
	background(255);

	ball.velocity.y+=gravity;
	if(ball.collide(platform)){
		ball.velocity.y=0;
	}

	if(keyWentDown("space")){
		ball.velocity.y=-4;
	}
	if(keyIsDown(LEFT_ARROW))
		ball.position.x-=5;
	if(keyIsDown(RIGHT_ARROW))
		ball.position.x+=5;


	if(frameCount<400){
		ball.position.y=constrain(ball.position.y,280,400);
	}

	if(frameCount>300){
		ladder.position.y+=2;
		ladder.position.y=constrain(ladder.position.y,-196,196);
	}
	ball.collide(ladder);

	if(ball.position.y<250&&ball.position.y>180){
		ladder.setCollider("rectangle",20,115,80,15);
	}
	if(ball.position.y<180&&ball.position.y>100){
		ladder.setCollider("rectangle",10,40,80,15);
	}
	if(ball.position.y<100&&ball.position.y>20){
		ladder.setCollider("rectangle",0,-30,80,15);
	}
    if(ball.position.y<20&&ball.position.y>0){
		ladder.setCollider("rectangle",-10,-100,80,15);
	}
	if(ball.position.y<-60){
		ladder.setCollider("rectangle",-20,-170,80,15);
	}
	
	//ladder.debug=true;
	
	
if(ball.position.y<-50){
	camera.zoom=0.5;
}else{
	camera.zoom=1;
}

otherballs.bounce(otherballs);

for(var i=0;i<otherballs.length;i++){
var s=otherballs[i];

  if(s.position.x<0) {
    s.position.x = 1;
    s.velocity.x = abs(s.velocity.x);
  }
  
  if(s.position.x>width) {
    s.position.x = width-1;
    s.velocity.x = -abs(s.velocity.x);
    }

  if(s.position.y>-75) {
    s.position.y = -76;
    s.velocity.y = abs(s.velocity.y);
  }
  }

 drawSprites();
}