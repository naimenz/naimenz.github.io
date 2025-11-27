const scl = 20;
//width and height refer to those of the window
const w = 600;
const h = 600;
const gridW = w * 2;
const gridH = h * 2;
const cols = gridW / scl;
const rows = gridH / scl;
let cells = [];
let nextGen = []
for (let i = 0; i < cols; i++) {
  cells.push([]);
  nextGen.push([]);
}

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent('canvas-holder');
  noFill();
  makeCells();
  frameRate(10);
  noLoop();


}

function draw() {
  background(51);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      cells[x][y].update();
    }
  }
  temp = cells;
  cells = nextGen;
  nextGen = temp;
  drawCells();
}


function setCell() {
  if (mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h) {
    let x = floor((mouseX + 0.5 * w) / scl);
    let y = floor((mouseY + 0.5 * h) / scl);
    let cell = cells[x][y];
    if (mouseButton === LEFT) {
      cell.live();
    } else if (mouseButton === RIGHT) {
      cell.die();
    }
    push();
    translate(-w / 2, -h / 2);
    cell.show();
    pop();
  }
  return false;
}

function mousePressed() {
  setCell();
}

function mouseDragged() {
  setCell();
}


function keyPressed() {
  if (keyCode == 32) {
    loop();
  }
}

function makeCells() {
  let cell;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cell = new Cell(x, y, false, 51);
      cells[x][y] = cell;
    }
  }
}

function drawCells() {
  push();
  translate(-w / 2, -h / 2);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      cells[x][y].show();
    }
  }
  pop();
}

function resetGame() {
  makeCells();
  drawCells();
  noLoop();
}
