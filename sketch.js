let scale = 3;
let unit;
let cen = [-0.5, 0];
let iter = 5;
function setup() {
  pixelDensity(1);
  createCanvas(600, 600);
  unit = width/scale;
}

function draw() {
  drawMandelbrot();
  noLoop();
}

function compAdd([a1, b1], [a2, b2]) {
  return([a1 + a2, b1 + b2]);
}

function compMult([a1, b1], [a2, b2]) {
  return([(a1 * a2) - (b1 * b2), (a1 * b2) + (b1 * a2)]);
}

function compMag([a, b]) {
  return(Math.sqrt((a * a) + (b * b)));
}

function inMandelbrot([a, b]) {
  let fz = [a,b];
  for ( let i = 0; i < iter; i++) {
    if (compMag(fz) >= 2) {
      return([false, i]);
    }
    fz = compAdd(compMult(fz, fz), [a,b]);
  }
  return([true, 50]);
}

function drawMandelbrot() {
  let colfil;
  loadPixels();
  for ( let i = 0; i < height; i++) {
    for ( let j = 0; j < width; j++) {
      let a = (cen[0] - scale/2) + (j/unit);
      let b = (cen[1] - scale/2) + (i/unit);
      let maandel = inMandelbrot([a,b]);
      if (maandel[0]){
        colfil = 0;
      }
      else{
        colfil = 0 + (maandel[1] * 255/iter);
      }
      
      let index = (j + (i * width )) * 4;
       pixels[index] = colfil;
       pixels[index + 1] = colfil;
       pixels[index + 2] = colfil;
       pixels[index + 3] = 255;

    }
  }
  updatePixels();
}

function mousePressed() {
  console.log((cen[0] - scale/2) + (mouseX/unit), (cen[1] - scale/2) + (mouseY/unit));
}