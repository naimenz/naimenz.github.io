function Projectile(x,y) {
  this.pos = createVector(x,y);
  vx = mouseX-x;
  vy = mouseY-y
  this.vel = createVector(vx,vy).setMag(12);
  this.acc = createVector(0,0);
  this.gravity = createVector(0,0.4);
  this.collided = false;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(255,0,0);
    ellipse(this.pos.x,this.pos.y,10,10);
    noStroke();
  }
  this.update = function() {
    this.hit();
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
  }

  this.hit = function() {
    for (var i = 0; i < enemies.length; i++) {
      var curEnemy = enemies[i];
      if (collideCircleCircle(this.pos.x,this.pos.y,10,curEnemy.pos.x,curEnemy.pos.y,50)) {
        curEnemy.dead = true;
        this.collided = true;
      }
    }
  }
}
