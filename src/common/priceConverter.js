export const priceConverter = (value)=>{
   var val = Math.abs(value)
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2) + ' Lac';
  }https://jsfiddle.net/33nw5jcd/1/#
  /*else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';*/
  return val;
}