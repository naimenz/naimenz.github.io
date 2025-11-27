// object to contain bouncy ball variables and functions
let Ball = {};
// aliases for width and height of sketch
let w;
let h;
// define gravity for this simulation
let grav; 
// define ground level for the ball
let ground;

function setup() {
    // aliases for width/height
    w = windowWidth*0.9;
    h = windowHeight*0.9;
    let canv = createCanvas(w, h);
    background(51);
    // gravity is downwards
    grav = createVector(0,0.5);
    // ground level is the bottom of the sketch (at least to start with)
    ground = h/2;
    Ball.radius = 40;
    Ball.pos = createVector(w/2, 0);
    Ball.vel = createVector(0,0);
    Ball.acc = createVector(0,0);
    Ball.show = function() {
        fill(200,0,100);
        ellipseMode(RADIUS);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius);
    }
    // function to add force experienced by ball (force must be p5 vector)
    Ball.addForce = function(force) {
        this.acc.add(force)
    }
    // update ball's acceleration with gravity, and clear acceleration
    Ball.update = function() {
        console.log(this.acc);
        // if the ball hits the floor, bounce!
        if (this.pos.y == ground - this.radius && this.vel.y > 0) {
            this.vel.y *= -1;
        }
        // reset acceleration (as only accelerating while a force is applied)
        this.acc = createVector(0,0);
        this.addForce(grav);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        // keep the ball within the sketch
        this.pos.x = constrain(this.pos.x, 0 + this.radius, w - this.radius);
        this.pos.y = constrain(this.pos.y, 0 + this.radius, ground - this.radius);
        console.log(this.acc);
    }
}

function draw() {
    background(51);
    Ball.update();
    Ball.show();
}
