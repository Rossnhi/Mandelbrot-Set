let generateButton;
let scale = 3;
let unit;
let cen = [-0.5, 0];
let iter = 20;
let scaleInp;
let cenX;
let cenY;
let iterInp;
let save;
let interestingPoints = [[200,0.23380833,0.529875,300],[2000,0.27877166666,0.0081249999,500],[500,-0.77568377,0.13646737,150],[125000,-1.74936736,0,300],[10000,-0.9074270308123249,0.26800196078431376,400],[1000,-0.43470703372124603,-0.579964741957389,500],[10000,-1.2004388409981441,0.2890386244586513,300],[20,-0.9175,0.2583,200]];
let points;
function setup() {
  pixelDensity(1);
  let myCan = createCanvas(Math.floor(0.9 * displayWidth), Math.floor (0.9 * displayWidth));
  myCan.parent("#canvasContainer");
  myCan.mousePressed(setCenter); 

  unit = width/scale;

  generateButton = select("#gen");  //dont use document.getElementById() as that returns an HTML.element, not p5.elementand styles and callbacks such as .mousePressed only works for p5.element.
  generateButton.mousePressed(generate);

  save = select("#saveImage");
  save.mousePressed(saveImage);

  points = selectAll(".points");
  for ( let i = 0; i < points.length; i++) {
    points[i].mousePressed(function() {popUp.call(), goTo.call(this, i)}); // IMPORTANT: This is how you pass arguments to callbacks
  }
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

function compSqMag([a, b]) {
  return((a * a) + (b * b));
}

function inMandelbrot([a, b]) {
  let fz = [a,b];
  for ( let i = 0; i < iter; i++) {
    if (compSqMag(fz) > 4) {
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
        colfil = 255;
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

function setCenter() {
  cenX = select("#centerX");
  cenY = select("#centerY");
  cenX.value((cen[0] - scale/2) + (mouseX/unit));
  cenY.value((cen[1] - scale/2) + (mouseY/unit));
}

function generate() {
  scaleInp = select("#scale")
  cenX = select("#centerX");
  cenY = select("#centerY");
  iterInp = select("#iter");
  scale = 1/scaleInp.value();
  unit = width/scale;
  cen[0] = cenX.value();
  cen[1] = cenY.value();
  iter = iterInp.value();
  redraw();
}

function saveImage() {
  let fileName = scale.toString() + "," + cen.toString() + "," + iter.toString();
  saveCanvas(fileName, "png");
}

function goTo(i) {
  scaleInp = select("#scale")
  cenX = select("#centerX");
  cenY = select("#centerY");
  iterInp = select("#iter");
  scaleInp.value(interestingPoints[i][0]);
  cenX.value(interestingPoints[i][1]);
  cenY.value(interestingPoints[i][2]);
  iterInp.value(interestingPoints[i][3]);
  generate();
}
