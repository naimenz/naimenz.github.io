function Point(level, phase, col) {
    // setting colour of point
    this.col = col;
    // defining the ylevel, frequeny, and phase of the point
    this.level = level;
    this.freq = PI/300;
    this.phase = phase;
    // defining the offset from the centre
    this.offset = 0;
    this.radius = 10;
    this.update = function(time) {
        this.offset = sin(this.freq * time + this.phase);
    }
    this.show = function() {
        fill(this.col);
        ellipse(w/2*(1+0.4*this.offset), this.level, this.radius);
    }
}
