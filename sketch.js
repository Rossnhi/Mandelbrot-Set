let scale = 3;
let unit;
let cen = [-0.5,0];
let iter = 20;
function setup() {
  createCanvas(650, 650);
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
  for ( let i = 0; i < width; i++) {
    for ( let j = 0; j < width; j++) {
      let a = (cen[0] - scale/2) + (j/unit);
      let b = (cen[1] - scale/2) + (i/unit);
      let maandel = inMandelbrot([a,b]);
      if (maandel[0]){
        stroke(255);
        fill(255);
      }
      else{
        stroke(0 + (maandel[1] * 255/iter));
        fill(0 + (maandel[1] * 255/iter));
      }
      ellipse(j, i, 1, 1);
    }
  }
}

function mousePressed() {
  console.log((cen[0] - scale/2) + (mouseX/unit), (cen[1] - scale/2) + (mouseY/unit));
}
