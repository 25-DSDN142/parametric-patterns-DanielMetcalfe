
//cross stich settings
let gridsX = 200;
let gridsY = 200;

///test radial paths for adjustable amounts of objects
let objAmount = 12; ///amount of objects
let radius=60; //circlular path radius
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
 flower2(pg);


//  ////objects on the circular path- using cosine and sine to postion objects.
//  for (let x = 0; x < objAmount; x++) {
//   let angle = x * (360 / objAmount) - 90;

//   if (x % 2 == 0){

//   pg.fill(blueD);
//   }

//   else{
//     pg.fill(blueL);
//   }

//   let ellipseX = centerX + radius * pg.cos(angle);
//   let ellipseY = centerY + radius * pg.sin(angle);

//   pg.ellipse(ellipseX, ellipseY, objectSize, objectSize);



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
////outlines
pg.scale(0.5);
pg.translate(100,100)
  pg.stroke(0);
  pg.strokeWeight(2);
  pg.noFill();

  pg.bezier(79, 52, 76, 66, 61, 73, 73, 89);
  pg.bezier(79, 52, 80, 53, 81, 55, 82, 57);
  pg.bezier(82, 57, 81, 64, 75, 69, 74, 76);
  pg.bezier(81, 75, 81, 69, 85, 65, 90, 62);
  pg.bezier(88, 63, 88, 60, 85, 57, 82, 57);
  pg.bezier(53, 65, 66, 66, 66, 81, 73, 89);
  pg.bezier(61, 68, 63, 66, 68, 66, 71, 68);
  pg.bezier(98, 114, 94, 106, 83, 105, 78, 98);
  pg.bezier(78, 98, 71, 91, 70, 79, 77, 73);
  pg.bezier(77, 73, 73, 84, 83, 85, 82, 93);
  pg.bezier(82, 94, 92, 96, 95, 105, 98, 113);
  pg.bezier(122, 51, 125, 65, 139, 73, 128, 89);
  pg.bezier(121, 51, 120, 53, 119, 55, 119, 57);
  pg.bezier(119, 57, 120, 64, 126, 69, 127, 75);
  pg.bezier(120, 75, 120, 69, 116, 64, 111, 62);
  pg.bezier(113, 62, 112, 59, 116, 57, 119, 57);
  pg.bezier(147, 64, 135, 66, 135, 81, 128, 89);
  pg.bezier(140, 68, 137, 65, 133, 66, 130, 68);
  pg.bezier(103, 114, 107, 106, 118, 104, 123, 97);
  pg.bezier(123, 97, 130, 91, 131, 79, 124, 72);
  pg.bezier(124, 73, 128, 84, 118, 85, 119, 93);
  pg.bezier(119, 93, 110, 95, 106, 105, 103, 113);
  pg.bezier(119, 75, 120, 81, 111, 82, 112, 89);
  pg.bezier(112, 89, 107, 91, 102, 96, 101, 102);
  pg.bezier(82, 75, 81, 81, 90, 83, 89, 89);
  pg.bezier(89, 89, 94, 91, 100, 96, 100, 102);
  pg.bezier(119, 75, 122, 77, 123, 81, 122, 85);
  pg.bezier(81, 75, 79, 78, 78, 82, 79, 85);
  pg.bezier(100, 50, 96, 61, 83, 62, 90, 78);
  pg.bezier(100, 50, 105, 61, 118, 62, 111, 78);
  pg.bezier(111, 62, 111, 62, 110, 61, 110, 61);
  pg.bezier(88, 63, 89, 62, 90, 61, 91, 61);
  pg.bezier(87, 82, 93, 73, 108, 73, 115, 82);
  pg.bezier(91, 111, 98, 115, 99, 124, 100, 131);
  pg.bezier(109, 112, 103, 116, 101, 124, 100, 131);
  pg.bezier(100, 100, 101, 105, 100, 110, 99, 114);
  pg.bezier(101, 100, 100, 105, 102, 110, 103, 114);
  pg.bezier(103, 113, 103, 114, 103, 114, 103, 115);
  pg.bezier(103, 115, 103, 115, 104, 114, 104, 114);
  pg.bezier(103, 115, 103, 115, 103, 115, 104, 114);
  pg.bezier(103, 114, 103, 114, 103, 114, 103, 114);
  pg.bezier(71, 117, 75, 116, 80, 116, 83, 119);
  pg.bezier(83, 119, 90, 117, 97, 123, 100, 130);
  pg.bezier(71, 118, 76, 118, 77, 122, 79, 125);
  pg.bezier(79, 125, 85, 129, 95, 126, 100, 133);
  pg.bezier(130, 119, 126, 118, 121, 118, 118, 120);
  pg.bezier(118, 120, 111, 117, 103, 123, 100, 130);
  pg.bezier(129, 119, 125, 120, 124, 124, 121, 126);
  pg.bezier(121, 126, 115, 130, 106, 126, 100, 132);
  pg.bezier(59, 93, 64, 91, 69, 91, 74, 93);
  pg.bezier(59, 93, 68, 93, 71, 103, 78, 107);
  pg.bezier(78, 107, 84, 111, 92, 109, 98, 114);
  pg.bezier(53, 65, 61, 72, 57, 86, 66, 91);
  pg.bezier(142, 93, 137, 91, 132, 91, 127, 93);
  pg.bezier(142, 93, 133, 93, 130, 103, 123, 107);
  pg.bezier(123, 107, 117, 111, 109, 109, 103, 114);
  pg.bezier(148, 65, 140, 72, 144, 85, 135, 91);
  pg.bezier(111, 111, 110, 111, 109, 112, 108, 112);
  pg.bezier(99, 131, 100, 136, 99, 141, 99, 146);
  pg.bezier(100, 129, 100, 135, 100, 140, 100, 146);
  pg.bezier(99, 145, 99, 147, 98, 149, 97, 150);
  pg.bezier(100, 145, 100, 147, 101, 149, 103, 150);
  pg.bezier(99, 155, 99, 153, 98, 152, 97, 150);
  pg.bezier(100, 155, 100, 153, 101, 152, 102, 150);
  pg.bezier(99, 155, 99, 155, 100, 156, 100, 156);
  pg.bezier(100, 155, 100, 155, 100, 156, 100, 156);
}


