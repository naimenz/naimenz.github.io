function Enemy() {
  this.pos = createVector(width*0.75, height/2);
  this.vel = createVector(-0.5,0);
  this.acc = createVector(0,0);
  this.dead = false;
  this.diam = 50
  this.yfloor = height - this.diam/2 - groundheight;
  this.gravity = createVector(0,0.4);

  this.show = function() {
    fill(150,100,50);
    ellipse(this.pos.x,this.pos.y,this.diam,this.diam);
  }

  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (this.pos.y < this.yfloor-2) {
      this.applyForce(this.gravity);
    //   this.vel.add(this.acc);
       this.vel.y = constrain(this.vel.y,-100,10);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x,0,width-this.diam/2);
    this.pos.y = constrain(this.pos.y,-100,this.yfloor);
    this.acc.x = 0;
    this.acc.y = 0;
  }

  this.isGrounded = function () {
    for (var i = 0; i < platforms.length; i++) {
      if ((this.pos.x +this.w/2>= platforms[i].xb && this.pos.x+this.diam/2 <=platforms[i].xe) && (abs(this.pos.y+this.diam/2 - platforms[i].y) <= 4)) {
        //console.log("on platform",i);
        this.yfloor = platforms[i].y -this.diam/2;
        return true;
      }
    }
    this.yfloor = height - this.diam/2;
    return false;
  }

}
