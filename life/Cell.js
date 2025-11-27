function Cell(x, y, alive, colour) {
  this.x = x;
  this.y = y;
  this.alive = alive;
  this.colour = colour;

  this.live = function() {
    this.alive = true;
    this.colour = "#008B8B";
  }

  this.die = function() {
    this.alive = false;
    this.colour = 51;
  }

  this.update = function() {
    let neighbours = [];
    //hack to stop edge cells from updating at the moment
    if (this.x > 0 && this.x < cols - 1 && this.y > 0 && this.y < rows - 1) {
      neighbours.push(
        cells[this.x - 1][this.y - 1],
        cells[this.x - 1][this.y],
        cells[this.x - 1][this.y + 1],
        cells[this.x][this.y - 1],
        cells[this.x][this.y + 1],
        cells[this.x + 1][this.y - 1],
        cells[this.x + 1][this.y],
        cells[this.x + 1][this.y + 1]
      );
      let aliveCount = 0;
      for (let cell of neighbours) {
        if (cell.alive) {
          aliveCount++;
        }
      }
      let newCell = new Cell(this.x, this.y, this.alive, this.colour);
      if (newCell.alive && (aliveCount < 2 || aliveCount > 3)) {
        newCell.die();
      } else if (!newCell.alive && aliveCount === 3) {
        newCell.live();
      }
      nextGen[newCell.x][newCell.y] = newCell;
    } else {
      nextGen[this.x][this.y] = this;
    }
  }
}

Cell.prototype.show = function() {
  fill(this.colour);
  rect(this.x * scl, this.y * scl, scl, scl);
  return this;
}
