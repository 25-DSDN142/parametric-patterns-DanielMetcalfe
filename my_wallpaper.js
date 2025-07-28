
//cross stich settings
let gridsX = 200;
let gridsY = 200;

///test radial paths for adjustable amounts of objects
let objAmount = 12; ///amount of objects
let radius=70; //circlular path radius
let centerX=100; ///centre point of circular path
let centerY=100;
let objectSize = 20; //size of test object

let orange, blueD, blueL;



function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false);

  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;


}

function wallpaper_background() {
  background(0);
}

function my_symbol() {

  let pattern = rawPattern();
  
  // image(pattern, 0, 0);  //test raw pattern
  crossstitch(pattern);
}

function rawPattern(){
  let pg = createGraphics(200, 200);
  let orange = color(241, 87, 85);
  let blueD = color(32, 59, 114);
  let blueL = color(69, 128, 194);
  pg.background(orange);
  pg.angleMode(DEGREES);


pg.translate(-50,-50);
  for (let x = 0; x < objAmount; x++) {
    let angle = x * (360 / objAmount) - 90;

    // if (x % 2 == 0){

    // pg.fill(blueD);
    // }

    // else{
    //   pg.fill(blueL);
    // }

    let ellipseX = centerX + radius * pg.cos(angle);
    let ellipseY = centerY + radius * pg.sin(angle);
pg.push();

pg.translate(ellipseX,ellipseY);
    // pg.ellipse(0, 0, objectSize, objectSize);
    flower2(pg);
    pg.pop();
  }
// }
  return pg;
}




function crossstitch(pattern) {
  let tileW = 200 / gridsX;
  let tileH = 200 / gridsY;
  let crossW= tileW;
  let crossH= tileH;
  let patternClr = pattern.get();

  noStroke();

  for (let x = 0; x < gridsX; x++) {
    for (let y = 0; y < gridsY; y++) {
      let px = int(x * tileW + tileW / 2);
      let py = int(y * tileH + tileH / 2);

      let clr = patternClr.get(px, py);
      fill(clr);

      push();
      translate(px, py);
      ellipse(0, 0, crossW, crossH);
   
      pop();
    }
  }
}




function flower2 (pg) {

  let darkBlue = color(32, 59, 114);
  let lightBlue = color(69, 128, 194);
  let brightBlue= color(0,189,255);
  pg.stroke(0);
  pg.strokeWeight(0.5);
  pg.noFill();
 
pg.push();

pg.scale(0.5);
pg.translate(0,0);

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(83,61);
  pg.bezierVertex(84,63,84,64,85,66);
  pg.vertex(85,66);
  pg.bezierVertex(84,72,79,76,78,82);
  pg.bezierVertex(76,88,77,94,77,94);
  pg.bezierVertex(67,80,80,73,83,61);
  pg.vertex(83,61);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(60,73);
  pg.bezierVertex(71,74,71,87,77,93);
  pg.bezierVertex(77,93,78,96,78,96);
  pg.bezierVertex(78,96,76,95,72,95);
  pg.bezierVertex(64,90,67,79,60,73);
  pg.vertex(60,73);
  pg.endShape();
  

  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(99,115);
  pg.bezierVertex(95,108,86,107,82,101);
  pg.bezierVertex(82,101,80,99,78,96);
  pg.bezierVertex(74,95,69,95,65,97);
  pg.vertex(65,97);
  pg.bezierVertex(73,97,76,105,82,109);
  pg.bezierVertex(87,113,94,110,99,115);
  pg.vertex(99,115);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(99,115);
  pg.bezierVertex(95,108,86,107,82,101);
  pg.bezierVertex(76,95,75,85,81,79);
  pg.vertex(81,80);
  pg.bezierVertex(77,90,86,90,85,97);
  pg.vertex(85,97);
  pg.bezierVertex(93,99,97,108,99,115);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(86,118);
  pg.bezierVertex(83,116,79,116,76,117);
  pg.vertex(76,117);
  pg.bezierVertex(80,118,80,121,82,124);
  pg.bezierVertex(88,127,96,125,100,130);
  pg.vertex(100,130);
  pg.bezierVertex(98,124,92,116,86,118);
  pg.vertex(86,118);
  pg.endShape();


  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(115,118);
  pg.bezierVertex(108,116,102,124,100,130);
  pg.vertex(100,130);
  pg.bezierVertex(105,125,113,127,118,124);
  pg.bezierVertex(120,121,121,118,125,117);
  pg.vertex(125,117);
  pg.bezierVertex(122,116,118,116,115,118);
  pg.vertex(115,118);
  pg.endShape();


  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(101,142);
  pg.bezierVertex(101,143,102,145,103,146);
  pg.vertex(103,146);
  pg.bezierVertex(102,147,101,149,100,150);
  pg.vertex(100,150);
  pg.bezierVertex(100,149,99,147,98,146);
  pg.vertex(98,146);
  pg.bezierVertex(99,145,100,143,100,142);
  pg.vertex(101,142);
  pg.endShape();


  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(104,115);
  pg.bezierVertex(103,115,101,108,101,108);
  pg.bezierVertex(101,108,100,114,100,115);
  pg.bezierVertex(99,115,99,115,98,114);
  pg.bezierVertex(98,114,95,112,93,112);
  pg.bezierVertex(99,116,100,124,100,130);
  pg.vertex(101,129);
  pg.bezierVertex(101,123,103,116,108,113);
  pg.bezierVertex(108,113,110,111,111,111);
  pg.bezierVertex(111,111,106,112,104,115);
  pg.endShape();
 
 

  
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(99,115);
  pg.vertex(100,115);
  pg.bezierVertex(101,111,102,109,101,105);
  pg.vertex(101,105);
  pg.bezierVertex(100,100,96,95,91,93);
  pg.vertex(91,93);
  pg.bezierVertex(92,88,84,87,85,81);
  pg.vertex(85,82);
  pg.bezierVertex(83,84,82,87,82,90);
  pg.bezierVertex(82,90,86,93,86,97);
  pg.vertex(85,97);
  pg.bezierVertex(93,99,97,108,99,115);
  pg.vertex(100,115);
  pg.endShape();

  

  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(74,87);
  pg.bezierVertex(74,87,71,80,67,76);
  pg.bezierVertex(69,73,73,74,76,75);
  pg.bezierVertex(76,75,74,78,74,81);
  pg.bezierVertex(73,84,73,87,74,87);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(82,89);
  pg.bezierVertex(82,89,80,87,80,85);
  pg.bezierVertex(80,85,81,80,81,80);
  pg.bezierVertex(80,80,78,82,78,82);
  pg.bezierVertex(79,76,84,72,85,66);
  pg.vertex(85,66);
  pg.bezierVertex(88,65,91,68,90,71);
  pg.vertex(90,71);
  pg.bezierVertex(87,73,84,77,85,81);
  pg.bezierVertex(85,81,82,84,82,89);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(101,59);
  pg.bezierVertex(105,69,116,69,110,83);
  pg.vertex(110,83);
  pg.bezierVertex(105,80,98,80,93,84);
  pg.vertex(92,83);
  pg.bezierVertex(86,70,97,69,101,59);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(93,84);
  pg.bezierVertex(89,76,91,72,94,69);
  pg.vertex(93,69);
  pg.bezierVertex(87,72,85,76,85,81);
  pg.bezierVertex(85,81,85,83,87,86);
  pg.bezierVertex(88,88,89,88,89,88);
  pg.bezierVertex(89,88,91,86,93,84);
  pg.endShape();

  
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(120,60);
  pg.bezierVertex(123,72,135,79,125,93);
  pg.bezierVertex(125,93,127,87,124,81);
  pg.bezierVertex(124,75,118,71,118,65);
  pg.vertex(118,65);
  pg.bezierVertex(118,63,119,62,120,60);
  pg.vertex(120,60);
  pg.endShape();


  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(142,72);
  pg.bezierVertex(136,78,139,89,131,94);
  pg.bezierVertex(126,94,124,95,124,95);
  pg.bezierVertex(124,95,125,92,125,92);
  pg.bezierVertex(131,86,131,73,142,72);
  pg.vertex(142,72);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(104,114);
  pg.bezierVertex(108,110,116,112,121,108);
  pg.bezierVertex(127,104,129,96,137,96);
  pg.vertex(137,96);
  pg.bezierVertex(133,94,128,94,124,96);
  pg.bezierVertex(122,98,121,100,121,100);
  pg.bezierVertex(116,106,107,107,103,114);
  pg.vertex(104,114);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(103,114);
  pg.bezierVertex(105,107,109,98,117,96);
  pg.vertex(117,96);
  pg.bezierVertex(116,89,125,89,122,79);
  pg.vertex(122,78);
  pg.bezierVertex(128,84,127,94,121,100);
  pg.bezierVertex(116,106,107,107,103,114);
  pg.endShape();


  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(103,114);
  pg.vertex(103,114);
  pg.bezierVertex(102,110,101,108,101,104);
  pg.vertex(101,104);
  pg.bezierVertex(102,99,107,94,111,92);
  pg.vertex(111,92);
  pg.bezierVertex(110,87,118,86,118,80);
  pg.vertex(118,81);
  pg.bezierVertex(120,83,121,86,120,89);
  pg.bezierVertex(120,89,117,92,117,96);
  pg.vertex(117,96);
  pg.bezierVertex(109,98,105,107,103,114);
  pg.vertex(103,114);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(129,87);
  pg.bezierVertex(129,87,131,80,135,75);
  pg.bezierVertex(133,72,129,73,127,75);
  pg.bezierVertex(127,75,128,77,129,80);
  pg.bezierVertex(129,83,129,86,129,87);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(120,89);
  pg.bezierVertex(120,89,122,87,123,84);
  pg.bezierVertex(123,84,122,79,122,79);
  pg.bezierVertex(123,79,124,81,124,81);
  pg.bezierVertex(124,75,118,71,118,65);
  pg.vertex(117,65);
  pg.bezierVertex(115,65,112,67,112,70);
  pg.vertex(112,70);
  pg.bezierVertex(116,73,118,76,118,80);
  pg.bezierVertex(118,80,120,83,120,89);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(113,87);
  pg.bezierVertex(113,87,114,87,116,85);
  pg.bezierVertex(116,85,118,80,118,80);
  pg.bezierVertex(118,76,115,71,109,68);
  pg.vertex(109,68);
  pg.bezierVertex(112,71,114,75,110,83);
  pg.bezierVertex(112,85,113,87,113,87);
  pg.endShape();

 
  pg.beginShape();
  pg.fill(lightBlue);
  pg.vertex(89,88);
  pg.bezierVertex(95,78,108,79,113,87);
  pg.bezierVertex(113,87,111,88,111,92);
  pg.vertex(111,92);
  pg.bezierVertex(101,97,101,105,101,105);
  pg.vertex(101,106);
  pg.bezierVertex(101,106,101,98,91,93);
  pg.bezierVertex(91,93,92,91,89,88);
  pg.endShape();


  pg.beginShape();
  pg.fill(darkBlue);
  pg.vertex(100,142);
  pg.vertex(100,129);
  pg.vertex(101,129);
  pg.vertex(101,142);
  pg.endShape();

 

  pg.pop();
}