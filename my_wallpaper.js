// let pixelX = 200;
// let pixelY = 200;
let gridsX = 50;
let gridsY = 50;

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
  let pattern= createGraphics(200, 200);
  
  pattern.stroke(0);
  pattern.fill(255, 0, 0);
  pattern.circle(100, 100, 50);

 
  // image(pattern, 0, 0);

  crossstitch(pattern); 
}

function crossstitch(pattern) {

  //rasterising pgraphics objects learnt through Tim Roedenbroker pGraphics processing course. rewritten in p5.js by me from one of my previous processing projects. 

  let wallpaperTileW= 200;
  let wallpaperTileH= 200;
  let pixelW = wallpaperTileW / gridsX;
  let pixelH = wallpaperTileH/ gridsY;

  let patternClr = pattern.get();  

  noStroke();

  for (let x = 0; x < gridsX; x++) {
    for (let y = 0; y < gridsY; y++) {
      let px = int(x * pixelW + pixelW / 2);
      let py = int(y * pixelH + pixelH / 2);

      let clr = patternClr.get(px, py);
      let bright = brightness(clr);
      let size = map(bright, 0, 255, 0, 1);

      let maskW = pixelW * size;
      let maskH = pixelH * size;

      push();
      fill(clr);
      translate(px, py);
      ellipse(0, 0, maskW, maskH);
      pop();
    }
  }
}