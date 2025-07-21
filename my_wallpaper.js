let green;
let pink;
let navy;
let fg3;
let flowerSize =0.5;
let flowerAmount=1;
let pinkBAmount = 115; ///255 for yellow;
let flowerX = -20;
let flowerY =20;
 let flowerCW=100;
 let petalWidth=90;
 let petalHeight=100;

let navyRAmount= 40;  //40 navy




function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  //pWallpaper.output_mode(GRID_WALLPAPER);
  
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  =60;

green = color(255,255,0);
  pink = color(255,pinkBAmount,122);
  navy = color(navyRAmount,115,255);
  orange= color(255,140,82);
 


}

function wallpaper_background() {
  let bgColour= green;
  background(bgColour); //light honeydew green colour
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  // clear();
  // background(green);
  translate(-flowerX,flowerY);
  push();
translate(-20,0);
  for(let x = 0; x < flowerAmount; x ++){
    scale(flowerSize);
let flowerTiles= 200/flowerAmount;
let flowerSpace= x*flowerTiles;
 translate(flowerSpace,0);


    flower();
  }
  
  pop();
}


function flower () {

 


  // translate(flowerXpos,80);

  let crclSize = 35;
  let crclX = 200/2;
  let crclY = 200/4;






//petals 
   
  let petlSize = 30;
  let xOff = petlSize ;
  let yOff = xOff;

  let xOff2 = petlSize * (2/3);
     let yOff2 = petlSize * (2/3);
 
  push();
  
   noStroke();
  
   let petalColour= navy;

   fill(petalColour);
  
   

 ellipse(crclX-xOff,crclY,petalWidth, petalHeight
 );
   ellipse(crclX+xOff,crclY,petalWidth, petalHeight);
 
   ellipse(crclX,crclY-yOff, petalWidth,petalHeight);
   ellipse(crclX,crclY+yOff,petalWidth, petalHeight);

   ellipse(crclX-xOff2,crclY-yOff2,petalWidth, petalHeight);
   ellipse(crclX+xOff2,crclY-yOff2, petalWidth,petalHeight);

   ellipse(crclX-xOff2,crclY+yOff2,petalWidth, petalHeight);
   ellipse(crclX+xOff2,crclY+yOff2, petalWidth,petalHeight);

 
   pop();

// centre;
  push();
  
  noStroke();
  fill (orange);
  ellipse(crclX, crclY,flowerCW ,flowerCW); 

  pop();








}




