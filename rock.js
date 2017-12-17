var distance;

class Rock{
	constructor(tempX,tempY){
		this.x=tempX;
		this.y=tempY;

	}
	// update(){
	// 	distance=random(10);
	// }
	display(){
		fill(255);
		stroke(0);
		strokeWeight(2);
		ellipse(this.x,this.y,20,10);
		ellipse(this.x+10,this.y+5,30,10);
	}
}