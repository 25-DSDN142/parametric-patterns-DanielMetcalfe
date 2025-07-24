
//cross stich settings
let gridsX = 50;
let gridsY = 50;

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

function rawPattern() {
  let pg = createGraphics(200, 200);
  pg.angleMode(DEGREES); 
  let orange = color(241,87,85);
  let blueD = color (32,59,114);
  let blueL = color(69,128,194);


  pg.background(orange);
  pg.fill(blueD);
  pg.stroke(0);

  //centre circle
  pg.ellipse(centerX, centerY, 50);
  
  //corner circles
  push();
  
  let cornerD= 100;
  let cornerSize= 100;

  pg.ellipse(centerX-cornerD, centerY-cornerD, cornerSize);
  pg.ellipse(centerX+cornerD, centerY-cornerD, cornerSize);
  pg.ellipse(centerX-cornerD, centerY+cornerD,cornerSize);
  pg.ellipse(centerX+cornerD, centerY+cornerD,cornerSize);
  pop();


  ////objects on the circular path- using cosine and sine to postion objects.
  for (let x = 0; x < objAmount; x++) {
    let angle = x * (360 / objAmount) - 90;

    if (x % 2 == 0){

    pg.fill(blueD);
    }

    else{
      pg.fill(blueL);
    }

    let ellipseX = centerX + radius * pg.cos(angle);
    let ellipseY = centerY + radius * pg.sin(angle);

    pg.ellipse(ellipseX, ellipseY, objectSize, objectSize);


 
  }
  

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
