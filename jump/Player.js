function Player() {
  this.w = 20; //width
  this.h = 50; //height
  this.pos = createVector(width/2, height-this.h - groundheight);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.yfloor = height - this.h - groundheight;
  this.gravity = createVector(0,0.4);
  this.dead = false;

  //draws the man
  this.show = function() {
    noStroke();
    fill(255,0,0);
    rect(this.pos.x,this.pos.y,this.w,this.h); //body
    fill(255,200,200);
    ellipse(this.pos.x+this.w/2,this.pos.y,30,30); //head
    stroke(0);
    strokeWeight(2);
    line(this.pos.x+this.w/2,this.pos.y+this.h*7/10,this.pos.x+this.w/2,this.pos.y+this.h-1); //leg seperator
    line(this.pos.x,this.pos.y+1/4*this.h,this.pos.x-this.w/2,this.pos.y+this.h/2); //left arm
    line(this.pos.x+this.w,this.pos.y+1/4*this.h,this.pos.x+3*this.w/2,this.pos.y+this.h/2); //right arm
    noStroke();
    fill(255);
    ellipse(this.pos.x+1/4*this.w,this.pos.y-3,2,2); //left eye
    ellipse(this.pos.x+3/4*this.w,this.pos.y-3,2,2); //right eye
    stroke(255);
    strokeWeight(2);
    bezier(this.pos.x,this.pos.y+5,this.pos.x+this.w/2 -1,this.pos.y+8,this.pos.x+this.w/2+1,this.pos.y+8,this.pos.x+this.w,this.pos.y+5); //big ol' smile
    noStroke();
    noFill();
  }

  //update position, velocity and acceleration
  this.applyForce = function (force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (this.dead) {
      this.pos = createVector(-1000,1000)
      return;
    }
    if (this.pos.y < this.yfloor-2) {
      this.applyForce(this.gravity);
    //   this.vel.add(this.acc);
       this.vel.y = constrain(this.vel.y,-100,10);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x,0,width-this.w);
    this.pos.y = constrain(this.pos.y,-100,this.yfloor);
    this.acc.x = 0;
    this.acc.y = 0;
  }

// jump function
  this.jump = function() {
    //console.log(this.pos.y,this.yfloor);
    if (this.isGrounded()) {
      this.vel.y = -8;
    }
  }
  this.move = function(dir) {
    if (dir == "left") {
      this.vel.x = -3;
    }
    else if (dir =="right") {
      this.vel.x = 3;
    }
  }
//checks if player is on a platform, sets new 'floor' and returns state as true/false
  this.isGrounded = function () {
    for (var i = 0; i < platforms.length; i++) {
      if ((this.pos.x +this.w>= platforms[i].xb && this.pos.x <=platforms[i].xe) && (abs(this.pos.y+this.h - platforms[i].y) <= 4)) {
        //console.log("on platform",i);
        this.yfloor = platforms[i].y -this.h;
        return true;
      }
    }
    this.yfloor = height - this.h;
    return false;
  }
    this.shoot = function() {
      projectiles.push(new Projectile(this.pos.x,this.pos.y));
  }

  this.killed = function(enemy) {
    if (collideRectCircle(this.pos.x,this.pos.y-30,this.w,this.h+30,enemy.pos.x,enemy.pos.y,enemy.diam)) {
      this.dead = true;
    }
  }
}
