var rockets = [];
var num = 300;
var Goal;
var popnum = 20;
var mutateRate = 0.05;
var forceRate = 1;
var factor = 0.1;
var best;
var count = 0;
var loopcount = 0;
var countP;
var genP;
var obstacles = [];
var para;

// variables to hold one corner of a new obstacle;
var startX;
var startY;

function setup() {
    let canv = createCanvas(600,600);
    best = dist(0.5*width, 0.8*height, 0.5*width, 20);
    // place canvas inside list on home page
    canv.parent('rocket-holder');
    para = select('#rocket-stats');
    frameRate(60);
    Goal = {
        pos: createVector(width/2, 20),
        show: function () {
            fill(255,0,100);
            ellipse(this.pos.x,this.pos.y,20,20);
            noFill();
        }
    }
    obstacles.push(new Obstacle(width/2 - 40, height/2, 80, 20));
    for (var i = 0; i < popnum; i++) {
        rockets.push(new Rocket(num));
    }
}

function draw() {
    background(221);
    for (var i = 0; i < rockets.length; i++) {
        rockets[i].update();
        rockets[i].show();
    }
    Goal.show();
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
    }
    para.html("Time elapsed: "+round(count/60)+"s</br>Current generation: "+loopcount+"</br>Closest approach: "+round(best)+" pixels");
    count++;
    // while mouse is pressed, draw obstacle guide
    if (mouseIsPressed) {
        fill(255,0,0,100);
        rect(startX, startY, mouseX - startX, mouseY - startY);
        noFill();
    }

    if (count >= num) {
        var sum = assignFitnesses();
        newGeneration(sum);
        //    newRandom(num);
        count = 0;
        if (mutateRate > 0.005) {
            mutateRate -= 0.001;
        }
        loopcount+=1
        // if (loopcount > 40) {
        //   Goal.pos.x = width-50;
        //   Goal.pos.y = height-50;
        // }
        // if (best < 10) {
        //   fill(255,0,100);
        //   ellipse(width/2,height/2,100,100);
        //   noLoop();
        //}

    }
}

assignFitnesses = function() {
    var sum = 0;
    for (var i = 0; i < rockets.length; i++){
        rockets[i].calcFitness();
        sum += rockets[i].fitness;
    }
    return sum;
}

pickParent = function(list,sum) {
    index = 0;
    r = random(sum);
    while (r > 0) {
        r = r - list[index].fitness;
        index++
    }
    index--;
    return list[index];
}

generateChild = function(sum) {
    p1 = pickParent(rockets,sum);
    p2 = pickParent(rockets,sum);
    childDNA = p1.dna.crossover(p2.dna);
    var child = new Rocket(num,childDNA);
    child.dna.mutate();
    return child
}

newGeneration = function(sum) {
    nextgen = [];
    for (var i = 0; i < popnum; i++){
        nextgen.push(generateChild(sum));
    }
    rockets = nextgen;

}

newRandom = function(num) {
    for (var i = 0; i < rockets.length; i++) {
        rockets[i] = new Rocket(num);
    }

}

// defining one corner of  a new obstacle when the mouse is dragged
function mousePressed() {
    startX = mouseX
    startY = mouseY
    return false;
}

//adding the other corner and pushing obstacle to obstacle array
function mouseReleased() {
    //making sure that the obstacle is drawn with positive width and height
    let x1 = mouseX >= startX ? startX : mouseX;
    let x2 = mouseX >= startX ? mouseX : startX;
    let y1 = mouseY >= startY ? startY : mouseY;
    let y2 = mouseY >= startY ? mouseY : startY;
    obstacles.push(new Obstacle(x1, y1, x2-x1, y2-y1));
}
