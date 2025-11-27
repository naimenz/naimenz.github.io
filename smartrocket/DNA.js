function DNA(num) {
  this.genes = [];
  for (var i = 0; i < num; i++) {
    this.genes.push(p5.Vector.random2D().mult(factor));
   }

   this.crossover = function(dna2) {
     var tip = random(this.genes.length);
     var newDNA = new DNA(num);
     for (var i = 0; i < this.genes.length; i++) {
       if (i < tip) {
         newDNA.genes[i] = this.genes[i];
       } else {
         newDNA.genes[i] = dna2.genes[i];
       }
     }
     return newDNA;
   }

   this.mutate = function() {
     for (var i = 0; i < this.genes.length; i++) {
       if (random(1) < mutateRate) {
         this.genes[i] = p5.Vector.random2D().mult(factor);
       }

      }
   }

}
