var ball1, ball2, ball3;
var otherballs;
var platform;
var ladder;
var gravity = 0.5;
var scene = 1;
var posx = 500;
var posy;
var flashlight, flashlight2, flashlight3;
var trigger;
var rocks = [];
var tie;
var ties, otherties;
var blocks;
var blocksPosY = 700;
var blocksraise = false;
var money;
var moneyblock;
var crown;
//text
var font;
var string;
//sound
var bgm;
var crown;
var die;
var match;
var money;
var pushball;
var tie;
var wrench;
var wrench_drop;

function preload() {
	//text
	font = loadFont("assets/font.otf");
	//sound
	bgm = loadSound("assets/sound/bgm.mp3");
	match = loadSound("assets/sound/match.wav");
	// crown = loadSound("assets/sound/crown.wav");
	// die = loadSound("assets/sound/die.wav");
	// money = loadSound("assets/sound/money.wav");
	// pushball = loadSound("assets/sound/push.wav");
	// wrench = loadSound("assets/sound/wrench.wav");
	// wrench_drop = loadSound("assets/sound/wrench_drop.wav");
}

function setup() {
	createCanvas(800, 450);
	//text
	string = "YOU DIED";
	//draw rocks randomly, constrain them on the ground and after puddle
	for (var i = 0; i < 20; i++) {
		rocks[i] = new Rock(random(200, 800), random(280, 420));
	}
	//flashlight effect 
	flashlight = createSprite(0, 0);
	flashlight.addImage(loadImage("assets/flashlight.png"));
	flashlight2 = createSprite(0, 0);
	flashlight2.addImage(loadImage("assets/flashlight2.png"));
	flashlight3 = createSprite(0, 0);
	flashlight3.addImage(loadImage("assets/flashlight3.png"));
	//wrench represent lower class worker
	wrench = createSprite(900, 350);
	wrench.addAnimation("pick", "assets/wrench0001.png", "assets/wrench0004.png");
	wrench.addAnimation("still", "assets/wrench0001.png");
	wrench.setCollider("rectangle", 0, 0, 160, 100);
	//wrench.debug = true;
	wrench2 = createSprite(460, 310);
	wrench2.addImage(loadImage("assets/wrench0001.png"));
	wrench2.setCollider("rectangle", 0, 0, 20, 150);
	//wrench2.debug = true;
	//muddy poddle
	platform = createSprite(0, 350);
	platform.addImage(loadImage("assets/platform.png"));
	platform.setCollider("rectangle", 0, 130, 2000, 191);
	//platform.debug=true;
	//ladder in scene1
	ladder = createSprite(800, -196);
	ladder.addImage(loadImage("assets/ladder.png"));
	ladder.setCollider("rectangle", 0, 0, 0, 0);
	//ladder.debug = true;
	//ladder in scene2
	ladder2 = createSprite(400, 560);
	ladder2.addImage(loadImage("assets/ladder.png"));
	ladder2.setCollider("rectangle", -20, -170, 150, 15);
	//ladder2.debug = true;
	//tie repesent middle class
	//tie as trigger
	tie = createSprite(400, 100);
	//tie.addAnimation("still","assets/tie.png");
	tie.addAnimation("rotate", "assets/tie_rotate0001.png", "assets/tie_rotate0004.png");
	tie.setCollider("rectangle", 0, 0, 40, 200);
	//tie.debug = true;
	//other ties as background
	otherties = new Group();
	for (i = 0; i < 10; i++) {
		var ties = createSprite(random(width), random(-100, 90));
		ties.addImage(loadImage("assets/tie.png"));
		//ties.scale=random(0.3,1);
		otherties.add(ties);
	}
	//main character in scene1
	ball1 = createSprite(0, 300);
	ball1.addAnimation("normal", "assets/ball_normal0001.png", "assets/ball_normal0004.png");
	ball1.addAnimation("fall", "assets/ball_ground0001.png", "assets/ball_ground0004.png");
	ball1.setCollider("circle", 0, 0, 75);
	//ball1.debug = true;
	//main character in scene2;
	ball2 = createSprite(400, 300);
	ball2.addAnimation("normal", "assets/ball_normal0001.png", "assets/ball_normal0004.png");
	ball2.addAnimation("tie", "assets/ball_tie0001.png", "assets/ball_tie0004.png");
	ball2.setCollider("circle", 0, 0, 75);
	//ball2.debug = true;
	ball3 = createSprite(400, 300);
	//ball2.addAnimation("normal","assets/ball_normal0001.png","assets/ball_normal0004.png");
	ball3.addAnimation("tie", "assets/ball_tie0001.png", "assets/ball_tie0004.png");
	ball3.addAnimation("crown", "assets/ball_crown0001.png", "assets/ball_crown0004.png");
	ball3.setCollider("circle", 0, 0, 75);
	//ball3.debug=true;
	otherballs = new Group();
	for (var i = 0; i < 5; i++) {
		var other = createSprite(800 + i * 50, 250);
		other.addAnimation("normal", "assets/ball_normal0001.png", "assets/ball_normal0004.png");
		other.setCollider("circle", 0, 0, 75);
		other.scale = random(0.3, 1);
		otherballs.add(other);
	}
	blocks = new Group();
	for (var i = 0; i < 5; i++) {
		var block = createSprite(600 + i * 300, blocksPosY - (i * 50));
		block.addImage(loadImage("assets/block.png"));
		blocks.add(block);
		block.setCollider("rectangle", 0, 0, 112, 112);
		//block.debug = true;
	}
	money = createSprite(400, 450);
	money.addImage(loadImage("assets/block.png"));
	money.setCollider("rectangle", 0, 0, 112, 112);
	moneyblock = createSprite(1000, 350);
	moneyblock.addImage(loadImage("assets/platform_money.png"));
	moneyblock.setCollider("rectangle", 0, 0, 844, 112);
	crown = createSprite(1600, 100);
	crown.addAnimation("normal", "assets/crown0001.png", "assets/crown0004.png");
	match.play();
	bgm.play();
}

function draw() {
	//start from dark
	if (frameCount < 30) {
		background(0);
	} else {
		//scene1
		if (scene === 1) {
			background(255);
			drawSprite(platform);
			//draw rocks
			for (var i = 0; i < 20; i++) {
				rocks[i].display();
			}
			drawSprite(ladder);
			drawSprite(ball1);
			drawSprite(wrench);
			drawSprite(flashlight);
			//flashlight move with ball
			flashlight.position.x = ball1.position.x;
			flashlight.position.y = ball1.position.y;
			//camera move with ball
			camera.position.x = ball1.position.x;
			//give ball gravity
			ball1.velocity.y += gravity;
			//keep still on ground
			if (ball1.collide(platform)) {
				ball1.velocity.y = 0;
			}
			//press space to jump
			if (keyWentDown("space")) {
				ball1.velocity.y = -6;
			}
			//press left and right arrow to move
			if (keyIsDown(LEFT_ARROW)) ball1.position.x -= 5;
			if (keyIsDown(RIGHT_ARROW)) ball1.position.x += 5;
			//constrain ball in canvas
			ball1.position.x = constrain(ball1.position.x, 0, 1000);
			// if(frameCount<4){
			// 	ball1.position.y=constrain(ball1.position.y,280,400);
			// }
			//get wrench(move with ball)
			if (ball1.overlapPoint(wrench.position.x, wrench.position.y)) {
				wrench.changeAnimation("still");
				//rotate and fixed on ball
				wrench.rotation = -40;
				wrench.position.x = ball1.position.x + 55;
				wrench.position.y = ball1.position.y + 10;
				//after get the wrench, ladder falls
				ladder.position.y += 2;
				ladder.position.y = constrain(ladder.position.y, -196, 196);
			}
			//climb the ladder
			//set colliders on the ladder when the ball reaches certain height
			if (ball1.collide(ladder)) {
				ball1.velocity.y = 0;
			}
			//step1
			if (ball1.position.y < 250 && ball1.position.y > 180) {
				ladder.setCollider("rectangle", 20, 115, 80, 15);
			}
			//step2
			if (ball1.position.y < 180 && ball1.position.y > 100) {
				ladder.setCollider("rectangle", 10, 40, 80, 15);
			}
			//step3
			if (ball1.position.y < 100 && ball1.position.y > 20) {
				ladder.setCollider("rectangle", 0, -30, 80, 15);
			}
			//step4
			if (ball1.position.y < 20 && ball1.position.y > 0) {
				ladder.setCollider("rectangle", -10, -100, 80, 15);
			}
			//step5
			if (ball1.position.y < -50) {
				ladder.setCollider("rectangle", -20, -170, 80, 15);
			}
			//keep still on ladder
			//condition to go to scene 2, climb to top of the ladder
			if (ball1.position.x > 675 && ball1.position.x < 925 && ball1.position.y < -50) 
				scene = 2;
			if (ball1.position.y > 500) 
				scene = 4;
		}
		if (scene === 2) {
			ball1.remove();
			background(255);
			drawSprite(ladder2);
			drawSprites(otherties);
			drawSprite(ball2);
			drawSprite(wrench2);
			drawSprite(tie);
			drawSprites(blocks);
			drawSprite(flashlight2);
			//flashlight move with ball
			flashlight2.position.x = ball2.position.x;
			flashlight2.position.y = ball2.position.y;
			//ball move with ball
			camera.position.x = ball2.position.x;
			//ball gravity
			ball2.velocity.y += gravity;
			wrench2.velocity.y += gravity;
			//wrench move with ball2
			wrench2.rotation = -40;
			//keep still on ladder
			if (ball2.collide(ladder2)) {
				ball2.velocity.y = 0;
			}
			if (wrench2.collide(ladder2)) {
				wrench2.velocity.y = 0;
			}
			if (ball2.collide(blocks)) {
				ball2.velocity.y = 0;
			}
			//ball control
			if (keyWentDown("space")) {
				ball2.velocity.y = -5;
				wrench2.velocity.y = -5;
			}
			if (keyIsDown(LEFT_ARROW)) {
				ball2.position.x -= 5;
				wrench2.position.x -= 5;
			}
			if (keyIsDown(RIGHT_ARROW)) {
				ball2.position.x += 5;
				wrench2.position.x += 5;
			}
			//reach tie, change to middle class
			if (ball2.overlap(tie)) {
				tie.animation.play();
				//tie.changeAnimation("rotate");
			} else {
				tie.animation.goToFrame(0);
			}
			//what happen after getting the tie
			if (ball2.overlapPixel(tie.position.x, tie.position.y - 60)) {
				tie.remove();
				ball2.changeAnimation("tie");
				ball2.setCollider("circle", 0, -20, 75, 75);
				//wrench falls
				wrench2.rotation--;
				wrench2.setCollider("rectangle", 0, 0, 0, 0);
				wrench2.velocity.y += 1;
				wrench2.velocity.x = 3;
				//money block raise
				blocksraise = true;
			}
		}
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];
			b.position.y = blocksPosY - (i * 50);
			if (blocksraise) {
				blocksPosY -= 0.5;
				blocksPosY = constrain(blocksPosY, 300, 700);
			}
		}
		//print(ball2.position.y);
		if (ball2.position.x > 1800 && ball2.position.y < -20) scene = 3;
		//gameover
		if (ball2.position.y > 500) 
			scene = 4;
	}
	//scene3
	if (scene === 3) {
		//ball2.remove();
		background(255);
		drawSprite(ball3);
		drawSprites(otherballs);
		//otherballs waiting
		for (var i = 0; i < otherballs.length; i++) {
			var s = otherballs[i];
			s.velocity.y += gravity;
			if (s.collide(moneyblock)) {
				s.velocity.y = 0;
			}
		}
		//push
		otherballs.displace(otherballs);
		ball3.displace(otherballs);
		drawSprite(money);
		drawSprite(moneyblock);
		drawSprite(crown);
		drawSprite(flashlight3);
		//flashlight move with ball
		flashlight3.position.x = ball3.position.x;
		flashlight3.position.y = ball3.position.y;
		//camera move with ball
		camera.position.x = ball3.position.x;
		//give ball gravity
		ball3.velocity.y += gravity;
		//keep still on ground
		if (ball3.collide(money) || ball3.collide(moneyblock)) {
			ball3.velocity.y = 0;
		}
		//press space to jump
		if (keyDown("space")) ball3.velocity.y = -2;
		//press left and right arrow to move
		if (keyIsDown(LEFT_ARROW)) ball3.position.x -= 5;
		if (keyIsDown(RIGHT_ARROW)) ball3.position.x += 5;
		//after getting the crown, become upper class
		if (ball3.overlapPixel(crown.position.x, crown.position.y)) {
			ball3.velocity.y = 5;
			ball3.changeAnimation("crown");
			crown.remove();
		}
		if (ball3.position.y > 500){
			scene = 4;
		}
	}
	//gameover interface
	if (scene === 4) {
		background(0);
		fill(255);
		textFont(font, 50);
		text(string, width / 2, height / 2);
		//bgm.stop();
	}
}
//test
// function mousePressed() {
// 	scene++;
// }