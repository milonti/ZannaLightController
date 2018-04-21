const {remote, ipcRenderer} = require('electron');
const currentWindow = remote.getCurrentWindow();
const {consolelog} = remote.require("./app.js");

function drawCanvasCircle(){
  var canvas = document.getElementById('wheelCanvas');
  var graphics = canvas.getContext("2d");
  var CX = canvas.width / 2,
      CY = canvas.height / 2,
      sx = CX-10,
      sy = CY-10;

  graphics.beginPath();
  graphics.arc(CX,CY,sx+2,0,2*Math.PI);
  graphics.fill();
  for (var i = 0; i < 360; i += 0.1) {
      var rad = i * (2 * Math.PI) / 360;
      var grad = graphics.createLinearGradient(CX, CY, CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
      grad.addColorStop(0, "hsla(" + i + ", 0%, 100%, 1.0)");
      grad.addColorStop(0.25, "hsla(" + i + ", 100%, 87.5%, 1.0)");
      grad.addColorStop(0.5, "hsla(" + i + ", 100%, 75%, 1.0)");
      // grad.addColorStop(0.93, "hsla(" + i + ", 100%, 50%, 1.0)");
      grad.addColorStop(0.95, "hsla(" + i + ", 100%, 50%, 1.0)");
      grad.addColorStop(1, "hsla(" + i + ", 100%, 0%, 1.0)");
      graphics.strokeStyle = grad;
      graphics.beginPath();
      graphics.moveTo(CX, CY);
      graphics.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
      graphics.stroke();
  }

}

//Helper function, though i ended up not using it
function hsv2rgb(hue, sat, val){
let chroma = val * sat;
let hue1 = hue/60;
let x = chroma * (1-Math.abs((hue1%2)-1));
if (hue1 >= 0 && hue1 <= 1) {
      ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
      ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
      ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
      ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
      ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
      ([r1, g1, b1] = [chroma, 0, x]);
    }

    let m = val - chroma;
    let [r,g,b] = [r1+m, g1+m, b1+m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255*r,255*g,255*b];
}
function rgb2Hsv(r,g,b){

}
function rgb2hex(r,g,b){
  var rHex = r.toString(16);
  var bHex = b.toString(16);
  var gHex = g.toString(16);
  //Add leading zeroes if needed
  if(r < 16 ) rHex = "0" + rHex;
  if(g < 16 ) gHex = "0" + gHex;
  if(b < 16 ) bHex = "0" + bHex;
  return "#"+rHex+gHex+bHex;
}

function getColor(){}
