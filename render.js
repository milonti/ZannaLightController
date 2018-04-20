const {remote, ipcRenderer} = require('electron');
const currentWindow = remote.getCurrentWindow();
const {consolelog} = remote.require("./app.js");

function drawCanvasCircle(){
  var can = document.getElementById('wheelCanvas');
  var ctx = can.getContext("2d");
  var img = ctx.createImageData(300,300);
  var data = img.data;
  var radius = 50;
  var grd = ctx.createRadialGradient(150,150,0,150,150,150);
  var grd2 = ctx.createLinearGradient(0,0,150,150);
  grd2.addColorStop(0,'red');
  grd2.addColorStop(1/6.0,'orange');
  grd2.addColorStop(2/6.0,'yellow');
  grd2.addColorStop(3/6.0,'green');
  grd2.addColorStop(4/6.0,'blue');
  grd2.addColorStop(5/6.0,'indigo');
  grd2.addColorStop(6/6.0,'violet');
  grd.addColorStop(0,'white');
  grd.addColorStop(0.5,'green');
  grd.addColorStop(1,'red');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(150,150,150,0,2*Math.PI, true);
  ctx.fill();
}

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
