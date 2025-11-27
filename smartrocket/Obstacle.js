function Obstacle(x,y,w,h) {
  this.pos = createVector(x,y);
  this.w = w;
  this.h = h;


this.show = function() {
  fill(255,0,0);
  rect(this.pos.x,this.pos.y,this.w,this.h);
  noFill();
}
}
