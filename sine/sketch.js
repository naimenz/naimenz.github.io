// width and height of sketch
let w;
let h;
// array to hold pts
let pts = [];

function setup() {
    // setting width and height of sketch
    w = 600;
    h = 0.95*windowHeight;
    let canv = createCanvas(w,h);
    ellipseMode(RADIUS);
    noStroke();
    for (let i = 0; i < 36; i++) {
        pts.push(new Point(50*i/2+30, i, color("#008B8B")));
    }
}

function draw() {
    background(255);
    for (let i = 0; i < pts.length; i++) {
        pt = pts[i];
        pt.update(frameCount);
        pt.show();
    }
}
