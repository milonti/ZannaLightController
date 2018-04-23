const {remote, ipcRenderer} = require('electron');
const currentWindow = remote.getCurrentWindow();
const screen = remote.screen;
const {consolelog, runFunc} = remote.require("./app.js");

var canvas = document.getElementById('wheelCanvas');
var ctx = canvas.getContext('2d');

var rSlide = document.getElementById('rSlide');
var gSlide = document.getElementById('gSlide');
var bSlide = document.getElementById('bSlide');
var rVal = document.getElementById('rVal');
var bVal = document.getElementById('bVal');
var gVal = document.getElementById('gVal');

var rgbField = document.getElementById('rgbVal');
var hexField = document.getElementById('hexVal');
var hslField = document.getElementById('hslVal');

var previewDiv = document.getElementById('previewDiv');

function drawCanvasCircle(){
  var CX = canvas.width / 2,
      CY = canvas.height / 2,
      sx = CX-10,
      sy = CY-10;

  ctx.beginPath();
  ctx.arc(CX,CY,sx+2,0,2*Math.PI);
  ctx.fill();
  for (var i = 0; i < 360; i += 0.1) {
      var rad = i * (2 * Math.PI) / 360;
      var grad = ctx.createLinearGradient(CX, CY, CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
      grad.addColorStop(0, "hsla(" + i + ", 0%, 100%, 1.0)");
      grad.addColorStop(0.25, "hsla(" + i + ", 100%, 87.5%, 1.0)");
      grad.addColorStop(0.5, "hsla(" + i + ", 100%, 75%, 1.0)");
      grad.addColorStop(0.90, "hsla(" + i + ", 100%, 50%, 1.0)");
      grad.addColorStop(0.95, "hsla(" + i + ", 100%, 50%, 1.0)");
      grad.addColorStop(1, "hsla(" + i + ", 100%, 0%, 1.0)");
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(CX + sx * Math.cos(rad), CY + sy * Math.sin(rad));
      ctx.stroke();
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

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }
  h = h.toFixed(3);
  s = s.toFixed(3);
  v = v.toFixed(3);
  return [ h, s, v ];
}

/**
 * Converts an RGB color value to a hex string.
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  String          The hex string
 */
function rgb2hex(r,g,b){
  var rHex = r.toString(16);
  var bHex = b.toString(16);
  var gHex = g.toString(16);
  //Add leading zeroes if needed
  if(r < 16 ) rHex = "0" + rHex;
  if(g < 16 ) gHex = "0" + gHex;
  if(b < 16 ) bHex = "0" + bHex;
  return String("#"+rHex+gHex+bHex).toUpperCase();
}

function getColorByClick(ev){
  console.log(ev);
  var pix = ctx.getImageData(ev.offsetX,ev.offsetY,1,1).data;
  console.log(pix[0],pix[1],pix[2]);
  sendColor(pix,'Click');
}

function SendColorToSliders(color){
  rSlide.value = color[0];
  gSlide.value = color[1];
  bSlide.value = color[2];
  rVal.value = color[0];
  gVal.value = color[1];
  bVal.value = color[2];
}

function SendColorToHexField(color){
  hexField.value = rgb2hex(color[0],color[1],color[2]);
}

function SendColorToRgbField(color){
  rgbField.value = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
}

function SendColorToHslField(color){
  var val = rgbToHsv(color[0],color[1],color[2]);
  hslField.value = 'hsl('+val[0]+','+val[1]+','+val[2]+')';
}

function SendColorToPreview(color){
  console.log(color);
  previewDiv.style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
}

Sendables = {
  'Preview':0,
  'HslField':1,
  'RgbField':2,
  'HexField':3,
  'Sliders':4
}

function sendColor(color,sender){
  for(place in Sendables){
    if(place != sender){
      eval('SendColorTo'+place+'(color)');
    }
  }

}
//View Prep Work
//Attach event listeners and run initial functions Here
runFunc(drawCanvasCircle);
