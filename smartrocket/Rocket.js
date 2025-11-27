function Rocket(num,dna) {
  this.pos = createVector(0.5*width, 0.8*height);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.fitness;
  this.achieved = false;
  this.collided = false;
  //this.forceRate = forceRate;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA(num);
  }


  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.detectSuccess();
    this.detectCollision();
    this.applyForce(this.dna.genes[count]);
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
    if(this.collided) {
      this.vel=createVector(0,0);
    }
  }

  this.show = function () {
    stroke(0);
    strokeWeight(4);
    fill(0);
    point(this.pos.x,this.pos.y);
    noStroke();
    // push();
    // translate(this.pos.x,this.pos.y);
    // rectMode(CENTER);
    // fill(0);
    // strokeWeight(4);
    // point(0,0/*,10,25*/);
    // pop();
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x,this.pos.y,Goal.pos.x,Goal.pos.y);
    if (d < best) {
      best = d;
    }
    this.fitness = pow(1.0/d,4);
    if (this.collided) {
      this.fitness *= 0.1;
    }
    if (this.achieved) {
      this.fitness *= 10;
    }
  }

this.detectSuccess = function() {
  if (dist(this.pos.x,this.pos.y,Goal.pos.x,Goal.pos.y) < 5) {
    this.achieved = true;
  }
}

  this.detectCollision = function() {
    for (var i = 0; i < obstacles.length; i++) {
      var obs = obstacles[i];
      if (((this.pos.x >= obs.pos.x) && (this.pos.x <= obs.pos.x + obs.w))  &&  ((this.pos.y >=obs.pos.y) && (this.pos.y <= obs.pos.y + obs.h))) {
        this.collided = true;
      }
    }
  }
}
