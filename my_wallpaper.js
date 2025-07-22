
let gridsX = 50;
let gridsY = 50;
let circleSize=100;
let circleX=200;
let circleY=200;

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false);

  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;


}

function wallpaper_background() {
  background(240, 255, 240);
}

function my_symbol() {
  let pattern = rawPattern();
 
  // image(pattern, 0, 0);  //test raw pattern
  crossstitch(pattern);
}

function rawPattern() {
  let pg = createGraphics(200, 200);
 
 //corner tiling test
  pg.stroke(0);
  pg.fill(255, 0, 0);
  pg.circle(circleX, circleY, circleSize);
  pg.circle(circleX-200, circleY, circleSize);
  pg.rectMode(CENTER);
  pg.ellipse(circleX, circleY-200, circleSize);
  pg.ellipse(circleX-200, circleY-200, circleSize);
 

  
  return pg;
}

function crossstitch(pattern) {
  let tileW = 200 / gridsX;
  let tileH = 200 / gridsY;
  let patternClr = pattern.get(); 

  noStroke();

  for (let x = 0; x < gridsX; x++) {
    for (let y = 0; y < gridsY; y++) {
      let px = int(x * tileW + tileW / 2);
      let py = int(y * tileH + tileH / 2);

      let clr = patternClr.get(px, py);
      let bright = brightness(clr);
      let size = map(bright, 0, 255, 0, 1);

      let w = tileW * size;
      let h = tileH * size;

      push();
      fill(clr);
      translate(px, py);
      ellipse(0, 0, w, h);
      pop();
    }
  }
}