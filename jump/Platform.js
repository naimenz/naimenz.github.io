function Platform(x1,x2,y) {
  if (x1 <= x2) {
    this.xb = x1; //beginning of Platform
    this.xe = x2; //end of platform
  }
  else {
    this.xb = x2;
    this.xe = x1;
  }
  this.y = y; //elevation
  //this.col = color(random(100,255),random(100,255),random(100,255)); //random colour

  this.show = function () {
    stroke(255,255,0);
    strokeWeight(10); //thickness
    line(this.xb,this.y,this.xe,this.y);
    noStroke();
  }
}
