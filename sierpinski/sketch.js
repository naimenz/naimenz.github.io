//variable to store depth of current drawing
let depth = 0;
let width = 600;
let height = 600;
let triangles;
let scl = width-50;

function setup() {
    noLoop();
    createCanvas(width,height);
    noStroke();
    triangles = [[0,0,0.5,sqrt(3)/2,1,0]];
    // triangles = [[1,3,0.2,0.3,0.5,2,0.1,1]];
    draw();
}

function draw() {
    background(51);
    for (triang of triangles) {
        triangle(
            triang[0]*scl + (width-scl)/2, (height+scl)/2-triang[1]*scl,
            triang[2]*scl + (width-scl)/2, (height+scl)/2-triang[3]*scl,
            triang[4]*scl + (width-scl)/2, (height+scl)/2-triang[5]*scl
        );
    }

}

function S1(triang) {
    return triang.map(x=> x/2.0);
}

function S2(triang) {
    let r = triang.map(x=> x/2.0);
    for (var i = 0; i < r.length; i+=2) {
        r[i] += 0.5;
    }
    return r;
}

function S3(triang) {
    let r = triang.map(x=> x/2.0);
    for (var i = 0; i < r.length; i+=2) {
        r[i] += 0.25;
        r[i+1] += sqrt(3)/4.0;
    }
    return r;
}
function mousePressed() {
    console.log(depth);
    if (depth < 8) {
        let f1 = triangles.map(S1);
        let f2 = triangles.map(S2);
        let f3 = triangles.map(S3);
        triangles = f1.concat(f2).concat(f3);
        draw();
    }
    depth++;
}
