var player;
var platforms = [];
var sky;
var groundheight = 0; //this is 64 for mario background
var projectiles = [];
var enemies = [];

function preload() {
    //sky = loadImage("mario-old.png");
    //sky.loadPixels();
}

function setup() {
    var canv = createCanvas(700,400);
    canv.parent("jump-holder");
    player = new Player();
    enemies.push(new Enemy());
    var ground1 = new Platform(0,width,height-groundheight);
    var ground2 = new Platform(0,width,height-groundheight+4);
    ground1.show = function() {}
    ground2.show = function() {}

    platforms.push(ground1);
    platforms.push(ground2);
    for (var i = 1; i < 7; i++) {
        platforms.push(new Platform(i*100,i*100 + 40,height - i*60));
        platforms.push(new Platform((7-i)*100,(7-i)*100 - 40, height -i*60));
    }
    //these are for mario map features
    // var ledge = new Platform(380,475,height - 175);
    // ledge.show = function() {}
    // var pipe = new Platform(520,580,height-127);
    // pipe.show = function() {}
    // platforms.push(ledge);
    // platforms.push(pipe);
}

function draw() {
    background(51);
    //image(sky,0,0,width,height);
    if (focused) {
        player.isGrounded();
        player.update();
    }
    player.show();
    for (var i = enemies.length-1; i >= 0; i--) {
        var curEnemy = enemies[i];
        if (curEnemy.dead) {
            enemies.splice(i,1);
            enemies.push(new Enemy());
        }
        player.killed(curEnemy);
        if (focused) {
            curEnemy.isGrounded();
            curEnemy.update();
        }
        curEnemy.show();
    }

    for (var i = 0; i < platforms.length; i++) {
        stroke(165,42,42);
        platforms[i].show();
        noStroke();
    }

    for (var i = projectiles.length-1; i >=0; i--) {
        fill(255,0,0);
        curProjectile = projectiles[i];
        if (focused) {
            curProjectile.update();
            curProjectile.show();
        }
        if (curProjectile.pos.x > width || curProjectile.pos.y > height || curProjectile.collided) {
            projectiles.splice(i,1);
            //console.log(projectiles);
        }
        noFill();
    }
}

function keyPressed() {
    if (keyCode == 87) {
        player.jump();
    }
    if(keyCode == 68) {
        player.move("right");
    }
    else if(keyCode == 65) {
        player.move("left");
    }
    if (keyCode == 83 && ((player.pos.x +player.w/2>= platforms[platforms.length-1].xb && player.pos.x+player.w/2 <=platforms[platforms.length-1].xe) && (abs(player.pos.y+player.h - platforms[platforms.length-1].y) <= 4))) {
        player.show = function () {}
        //   player.shoot = function () {}
        // }
    }
}

function keyReleased() {
    if (keyCode == 65 || keyCode == 68) {
        player.vel.x = 0;
    }
}

function mousePressed() {
    player.shoot();
}
