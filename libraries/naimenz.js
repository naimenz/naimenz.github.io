
/* My reusable functions */

function scaleTo(input,min1,max1,min2,max2) {
  var factor = (max2-min2) / (max1 - min1);
  var offset = min2 - min1;
  return (input * factor) + offset;
}
