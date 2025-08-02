
//cross stich settings
let gridsX = 200; //adjusts amount of crossstich dots
let gridsY = 200;


let centerX=100; //centre point of circular paths and canvas
let centerY=100;

//global colour settings- choose colours for composition
let lightClrSelect =0; //setting up variable to easily switch between the lightcolours in an array ,0 =blue, 1= green
let darkClrSelect =0; //setting up variable to easily switch between the darkcolours in an array ,0 =blue, 1= green
let bgClrSelect= 0; //pg.background colour switch, 0= orange, 1 = blue, 2= green;

//radial flower ring 1 settings
let flowerAmount =10; //amount of flowers
let ringRadius1=60; //circular path radius
let flower180 = false; //trigger for if statement that toggles every even flower to be 180 degrees flipped if true


//radial flower ring 2 settings

let flowerAmount2 =5; //amount of flowers
let ringRadius2=25; //circular path radius ///20 and 25 looks cool when set to 5 flowers
let flowerRing2invert= true; //inverts the colours of flower ring 2let flower1802 = false;
let flower1802 = false;

//radial flower ring 3 settings
let flowerAmount3 =40; //amount of flowers ////4 gives geometric look when paired with 80 radius
let ringRadius3=100; //circular path radius ///20 and 25 looks cool when set to 5 flowers
let flowerRing3invert= true; //inverts the colours of flower ring 2
let flower1803 = false;


///center and corner flower
let CenterRectSelect =true; //trigger for if statement that toggles between center having either diamond and ellipse at center of flower
let petalAmount = 10; 
let petals1Radius = 15; 
let petal2Amount = 10;
let petals2Radius = 15;

let geometricCenter = false; /////trigger for if statement that selects between geometric center and flower center

//geometric shape settings
let triangleAmount= 8;
let triangleRadius= 15;


//corner motif settings
let cornerScale =1;
let geometricCorner = true;
let cornerXPos = true; //selects between corners or centre edge reflections for motif

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(NINE_PORTRAIT);
  pWallpaper.show_guide(false);

  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 0;


}

function wallpaper_background() {
  background(0);
}

function my_symbol() {

  let pattern = rawPattern(); // converting the raw pattern graphics object into a variable that the crossstich rasteriser can use
  
  // image(pattern, 100, 100);  //test raw pattern
 crossstitch(pattern);

}
  

function rawPattern() {
//this is where the pattern is drawn, it is drawn onto a pg object so that it can be rasterised for the cross stich effect
 
let pg = createGraphics(200, 200); //creating graphics object
 let bgColour = [color(241, 87, 85),color(69, 128, 194),color(149, 239, 149)]; //creating colour array to easily switch background colours. p5 array reference page helped
  
  pg.background(bgColour[bgClrSelect]);//settingh graphics object background, feels redundant but allows me to have a black background for the whole sketch and a colourful background that gets crosstiched, the black background is important as it gives the crossstich effect
  pg.angleMode(DEGREES); //changing from radians


  //corner motif
  // cornerMotif(pg);

  //flower ring 1
 radialFlowerRing1(pg);
 
 //flower ring 2- center
//  radialFlowerRing2(pg);

 
  //flower ring 3- outer
//  radialFlowerRing3(pg);

//Center motif
// centerMotif1and2(pg);

//filigree
pg.scale(-1,1);
pg.translate(-150,40);

filigree(pg);

  return pg; // this tells the function to output the above code;
}



function crossstitch(pattern) {
// graphics object rasterisation technique learnt through Tim Roedenbroker pGraphics processing course. I rewrote it in p5 from a previous processing sketch of mine with variables that work for this context.

pattern.loadPixels();
  let tileW = 200 / gridsX; // setting the amount of crossstich dots by dividing the mySymbol 200 x 200 size by the adjustable variables gridsX and gridsY
  let tileH = 200 / gridsY;
  let dotW= tileW; // setting the size of the crosstich dots, creating its 
  let dotH= tileH;
  // let patternClr = pattern.get(); // getting the 'pixel data' from the raw pattern function so that it can then be rasterised
 
  noStroke(); //adding no stroke to dots

   //nested for loop grid that creates the crossstich dots
  for (let x = 0; x < gridsX; x++) {
    for (let y = 0; y < gridsY; y++) {
      let px = int(x * tileW + tileW / 2); //raw pattern pixel x coordinate to get colour info from
      let py = int(y * tileH + tileH / 2); //raw pattern pixel y coordinate to get colour info from

      let clr = pattern.get(px, py); //getting the pixel data from the raw pattern using px and py, 
      fill(clr);// filling the crossstich dot with the colour that the pixel data has

      push();//setting up seperate system for the for loop
      translate(px, py);//setting crosstich dot x and y postition
      ellipse(0, 0, dotW, dotH); //drawing cross stich dot
   
      pop();//ending system
    }
  }
}


function cornerMotif(pg){
  //function to clean up rawPattern function so that it is easier to work with

  let flowerMiddleX = [0, 200,0, 200];
  let flowerMiddleY = [0, 0, 200, 200];

  let flowerMiddleX2 = [0, 100,100, 200];
  let flowerMiddleY2 = [100, 0, 200, 100];


 
  for (let x = 0; x < 4; x++) {
    pg.push();
    if( cornerXPos == true){
  
    pg.translate(flowerMiddleX[x], flowerMiddleY[x]); 
  } 
  else {pg.translate(flowerMiddleX2[x], flowerMiddleY2[x]);

  }
    pg.scale(cornerScale);
    pg.translate(-centerX, -centerY);                  
   
   
   if (geometricCorner==true){
    geometricShape(pg);
   }

   else {flower1(pg)}
    pg.pop();

    
  }
}

function centerMotif1and2(pg){
  //cleans up rawPattern function to make it easier to work with
 
  if (geometricCenter == true){ //if statement toggle between flower and geometric pattern in the centrer

    geometricShape(pg); 
   
  }
  else{
    flower1(pg); ///center flower
  }

}

function radialFlowerRing1(pg){
  //function for cleaning up rawPattern to make it easier to work with
  //seperating them out into multiple different functions allows them to be used with independenat settings and turned on and off easily

 //for loop for duplicating flower2 and radially distributing it
 for (let x = 0; x < flowerAmount; x++) {
    
  let angle = x * (360 / flowerAmount) - 90; //getting the distance that the flowers will be spaced out. 360/ flowerAmount gives even spreading and then the -90 makes it so that it is always vertically symetrical no matter how many flowers are used.
  
  let flowerX = centerX + ringRadius1 * pg.cos(angle);   // this sets the x and y position of each flower using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
  let flowerY = centerY + ringRadius1 * pg.sin(angle);

  let flowerFlip = x % 2 == 0; //setting up every even flower to be flipped

  pg.push(); //putting the flower into its own system so it doesn't use global rotation etc. 
  
  pg.translate(flowerX, flowerY); //setting the x and y position of the flower so that it follows the radial distribution
  
  //setting up true false switch using if statement so that the 180 degree flip can be turned on and off to create flexibility
 
 //if flower180 variable = true
  if (flower180 == true) {
  
    // flipping every even flower using if statement. 
    if (x % 2 == 0) {
      pg.rotate(angle + 90); // this is the flower pointed out from the centre, using rotate with the angle variable to rotate the flower to the circle tangent and then adding 90 degrees to make it perpendicular to circle tangent
    } else {
      pg.rotate(angle + 270); //this is the flower pointed in to the centre, using 270 instead of 90 to flip it
    }
  } 
  //if flower180 variable =false;
  else {
    pg.rotate(angle + 90);
  }

  flower2(pg, flowerFlip); // imaging the flower2 graphics object
  pg.pop();// ending that system 
}

}


 function radialFlowerRing2(pg){
    //function for cleaning up rawPattern to make it easier to work with

    //for loop for duplicating flower2 and radially distributing it
    for (let x = 0; x < flowerAmount2; x++) {
       
     let angle = x * (360 / flowerAmount2) - 90; //getting the distance that the flowers will be spaced out. 360/ flowerAmount gives even spreading and then the -90 makes it so that it is always vertically symetrical no matter how many flowers are used.
     
     let flowerX2 = centerX + ringRadius2 * pg.cos(angle);   // this sets the x and y position of each flower using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
     let flowerY2 = centerY + ringRadius2 * pg.sin(angle);
   
     let flowerFlip2 = x % 2 == 0; //setting up every even flower to be flipped
   
     pg.push(); //putting the flower into its own system so it doesn't use global rotation etc. 
     
     pg.translate(flowerX2, flowerY2); //setting the x and y position of the flower so that it follows the radial distribution
     
     //setting up true false switch using if statement so that the 180 degree flip can be turned on and off to create flexibility
    
    //if flower180 variable = true
     if (flower1802 == true) {
     
       // flipping every even flower using if statement. 
       if (x % 2 == 0) {
         pg.rotate(angle + 270); // this is the flower pointed out from the centre, using rotate with the angle variable to rotate the flower to the circle tangent and then adding 90 degrees to make it perpendicular to circle tangent
       } else {
         pg.rotate(angle + 90); //this is the flower pointed in to the centre, using 270 instead of 90 to flip it
       }
     } 
     //if flower180 variable =false;
     else {
       pg.rotate(angle + 90);
     }
   if (flowerRing2invert==true){ //inverting colour toggle
    flower2invert(pg, flowerFlip2); // imaging the flower2 graphics object
   }
   else{
     flower2(pg, flowerFlip2); // imaging the flower2 graphics object
   }
     pg.pop();// ending that system 
   }
   
   }

   function radialFlowerRing3(pg){
      //function for cleaning up rawPattern to make it easier to work with

    //for loop for duplicating flower2 and radially distributing it
    for (let x = 0; x < flowerAmount3; x++) {
       
     let angle = x * (360 / flowerAmount3) - 90; //getting the distance that the flowers will be spaced out. 360/ flowerAmount gives even spreading and then the -90 makes it so that it is always vertically symetrical no matter how many flowers are used.
     
     let flowerX3 = centerX + ringRadius3 * pg.cos(angle);   // this sets the x and y position of each flower using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
     let flowerY3 = centerY + ringRadius3 * pg.sin(angle);
   
     let flowerFlip2 = x % 2 == 0; //setting up every even flower to be flipped
   
     pg.push(); //putting the flower into its own system so it doesn't use global rotation etc. 
     
     pg.translate(flowerX3, flowerY3); //setting the x and y position of the flower so that it follows the radial distribution
     
     //setting up true false switch using if statement so that the 180 degree flip can be turned on and off to create flexibility
    
    //if flower180 variable = true
     if (flower1803 == true) {
     
       // flipping every even flower using if statement. 
       if (x % 2 == 0) {
         pg.rotate(angle + 270); // this is the flower pointed out from the centre, using rotate with the angle variable to rotate the flower to the circle tangent and then adding 90 degrees to make it perpendicular to circle tangent
       } else {
         pg.rotate(angle + 90); //this is the flower pointed in to the centre, using 270 instead of 90 to flip it
       }
     } 
     //if flower180 variable =false;
     else {
       pg.rotate(angle + 90);
     }
   if (flowerRing3invert==true){
    flower2invert(pg, flowerFlip2); // imaging the flower2 graphics object
   }
   else{
     flower2(pg, flowerFlip2); // imaging the flower2 graphics object
   }
     pg.pop();// ending that system 
   }
   
   }



function flower2 (pg) {
  // drawing the flower for the radial distributed rings
    
    let lightColour = [color(69, 128, 194),color(149, 239, 149)]; //0 = blue, 1 = green, creating colour array to choose from
    let darkColour = [color(32, 59, 114), color (33,112,87)]; //0= blue, 1 = green
    
  
    //drawing the flower so that it can be used on the raw pattern graphics object, made it its own function so that the raw pattern is cleaner since I will be drawing multiple things on it
    
    pg.stroke(0);/// setting the flower stroke colour
    pg.strokeWeight(0.5);/// setting the flower stroke weight
   
   
    pg.push();//setting up its own system
  
    pg.scale(0.5); //setting the flower size
    pg.translate(-100,-100); ///having to shift flower 0,0 since it does weird stuff when trying to rotate the flower when centred at 100,100
  
   //drawing the flower using beginShape(), and bezier vertexs segments so that I can fill the shapes in
   
   pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(83,61);
    pg.bezierVertex(84,63,84,64,85,66);
    pg.vertex(85,66);
    pg.bezierVertex(84,72,79,76,78,82);
    pg.bezierVertex(76,88,77,94,77,94);
    pg.bezierVertex(67,80,80,73,83,61);
    pg.vertex(83,61);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(60,73);
    pg.bezierVertex(71,74,71,87,77,93);
    pg.bezierVertex(77,93,78,96,78,96);
    pg.bezierVertex(78,96,76,95,72,95);
    pg.bezierVertex(64,90,67,79,60,73);
    pg.vertex(60,73);
    pg.endShape();
    
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(99,115);
    pg.bezierVertex(95,108,86,107,82,101);
    pg.bezierVertex(76,95,75,85,81,79);
    pg.vertex(81,80);
    pg.bezierVertex(77,90,86,90,85,97);
    pg.vertex(85,97);
    pg.bezierVertex(93,99,97,108,99,115);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(lightColour[lightClrSelect]);
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
    pg.fill(lightColour[lightClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(74,87);
    pg.bezierVertex(74,87,71,80,67,76);
    pg.bezierVertex(69,73,73,74,76,75);
    pg.bezierVertex(76,75,74,78,74,81);
    pg.bezierVertex(73,84,73,87,74,87);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(101,59);
    pg.bezierVertex(105,69,116,69,110,83);
    pg.vertex(110,83);
    pg.bezierVertex(105,80,98,80,93,84);
    pg.vertex(92,83);
    pg.bezierVertex(86,70,97,69,101,59);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(93,84);
    pg.bezierVertex(89,76,91,72,94,69);
    pg.vertex(93,69);
    pg.bezierVertex(87,72,85,76,85,81);
    pg.bezierVertex(85,81,85,83,87,86);
    pg.bezierVertex(88,88,89,88,89,88);
    pg.bezierVertex(89,88,91,86,93,84);
    pg.endShape();
  
    
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(120,60);
    pg.bezierVertex(123,72,135,79,125,93);
    pg.bezierVertex(125,93,127,87,124,81);
    pg.bezierVertex(124,75,118,71,118,65);
    pg.vertex(118,65);
    pg.bezierVertex(118,63,119,62,120,60);
    pg.vertex(120,60);
    pg.endShape();
  
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(142,72);
    pg.bezierVertex(136,78,139,89,131,94);
    pg.bezierVertex(126,94,124,95,124,95);
    pg.bezierVertex(124,95,125,92,125,92);
    pg.bezierVertex(131,86,131,73,142,72);
    pg.vertex(142,72);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(103,114);
    pg.bezierVertex(105,107,109,98,117,96);
    pg.vertex(117,96);
    pg.bezierVertex(116,89,125,89,122,79);
    pg.vertex(122,78);
    pg.bezierVertex(128,84,127,94,121,100);
    pg.bezierVertex(116,106,107,107,103,114);
    pg.endShape();
  
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(129,87);
    pg.bezierVertex(129,87,131,80,135,75);
    pg.bezierVertex(133,72,129,73,127,75);
    pg.bezierVertex(127,75,128,77,129,80);
    pg.bezierVertex(129,83,129,86,129,87);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
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
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(113,87);
    pg.bezierVertex(113,87,114,87,116,85);
    pg.bezierVertex(116,85,118,80,118,80);
    pg.bezierVertex(118,76,115,71,109,68);
    pg.vertex(109,68);
    pg.bezierVertex(112,71,114,75,110,83);
    pg.bezierVertex(112,85,113,87,113,87);
    pg.endShape();
  
   
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
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
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(100,142);
    pg.vertex(100,129);
    pg.vertex(101,129);
    pg.vertex(101,142);
    pg.endShape();
  
   
  
    pg.pop();//ending that system
  }
  
function flower2invert(pg) {
    // Inverted: swap all lightColour and darkColour usages
    let lightColour = [color(69, 128, 194), color(149, 239, 149)];
    let darkColour = [color(32, 59, 114), color(33, 112, 87)];
  
    pg.stroke(0);
    pg.strokeWeight(0.5);
  
    pg.push();
    pg.scale(0.5);
    pg.translate(-100, -100);
  
    // All lightColour fills become darkColour, and vice versa
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(83, 61);
    pg.bezierVertex(84, 63, 84, 64, 85, 66);
    pg.vertex(85, 66);
    pg.bezierVertex(84, 72, 79, 76, 78, 82);
    pg.bezierVertex(76, 88, 77, 94, 77, 94);
    pg.bezierVertex(67, 80, 80, 73, 83, 61);
    pg.vertex(83, 61);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(60, 73);
    pg.bezierVertex(71, 74, 71, 87, 77, 93);
    pg.bezierVertex(77, 93, 78, 96, 78, 96);
    pg.bezierVertex(78, 96, 76, 95, 72, 95);
    pg.bezierVertex(64, 90, 67, 79, 60, 73);
    pg.vertex(60, 73);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(99, 115);
    pg.bezierVertex(95, 108, 86, 107, 82, 101);
    pg.bezierVertex(82, 101, 80, 99, 78, 96);
    pg.bezierVertex(74, 95, 69, 95, 65, 97);
    pg.vertex(65, 97);
    pg.bezierVertex(73, 97, 76, 105, 82, 109);
    pg.bezierVertex(87, 113, 94, 110, 99, 115);
    pg.vertex(99, 115);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(99, 115);
    pg.bezierVertex(95, 108, 86, 107, 82, 101);
    pg.bezierVertex(76, 95, 75, 85, 81, 79);
    pg.vertex(81, 80);
    pg.bezierVertex(77, 90, 86, 90, 85, 97);
    pg.vertex(85, 97);
    pg.bezierVertex(93, 99, 97, 108, 99, 115);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(86, 118);
    pg.bezierVertex(83, 116, 79, 116, 76, 117);
    pg.vertex(76, 117);
    pg.bezierVertex(80, 118, 80, 121, 82, 124);
    pg.bezierVertex(88, 127, 96, 125, 100, 130);
    pg.vertex(100, 130);
    pg.bezierVertex(98, 124, 92, 116, 86, 118);
    pg.vertex(86, 118);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(115, 118);
    pg.bezierVertex(108, 116, 102, 124, 100, 130);
    pg.vertex(100, 130);
    pg.bezierVertex(105, 125, 113, 127, 118, 124);
    pg.bezierVertex(120, 121, 121, 118, 125, 117);
    pg.vertex(125, 117);
    pg.bezierVertex(122, 116, 118, 116, 115, 118);
    pg.vertex(115, 118);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(101, 142);
    pg.bezierVertex(101, 143, 102, 145, 103, 146);
    pg.vertex(103, 146);
    pg.bezierVertex(102, 147, 101, 149, 100, 150);
    pg.vertex(100, 150);
    pg.bezierVertex(100, 149, 99, 147, 98, 146);
    pg.vertex(98, 146);
    pg.bezierVertex(99, 145, 100, 143, 100, 142);
    pg.vertex(101, 142);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(104, 115);
    pg.bezierVertex(103, 115, 101, 108, 101, 108);
    pg.bezierVertex(101, 108, 100, 114, 100, 115);
    pg.bezierVertex(99, 115, 99, 115, 98, 114);
    pg.bezierVertex(98, 114, 95, 112, 93, 112);
    pg.bezierVertex(99, 116, 100, 124, 100, 130);
    pg.vertex(101, 129);
    pg.bezierVertex(101, 123, 103, 116, 108, 113);
    pg.bezierVertex(108, 113, 110, 111, 111, 111);
    pg.bezierVertex(111, 111, 106, 112, 104, 115);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(99, 115);
    pg.vertex(100, 115);
    pg.bezierVertex(101, 111, 102, 109, 101, 105);
    pg.vertex(101, 105);
    pg.bezierVertex(100, 100, 96, 95, 91, 93);
    pg.vertex(91, 93);
    pg.bezierVertex(92, 88, 84, 87, 85, 81);
    pg.vertex(85, 82);
    pg.bezierVertex(83, 84, 82, 87, 82, 90);
    pg.bezierVertex(82, 90, 86, 93, 86, 97);
    pg.vertex(85, 97);
    pg.bezierVertex(93, 99, 97, 108, 99, 115);
    pg.vertex(100, 115);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(74, 87);
    pg.bezierVertex(74, 87, 71, 80, 67, 76);
    pg.bezierVertex(69, 73, 73, 74, 76, 75);
    pg.bezierVertex(76, 75, 74, 78, 74, 81);
    pg.bezierVertex(73, 84, 73, 87, 74, 87);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(82, 89);
    pg.bezierVertex(82, 89, 80, 87, 80, 85);
    pg.bezierVertex(80, 85, 81, 80, 81, 80);
    pg.bezierVertex(80, 80, 78, 82, 78, 82);
    pg.bezierVertex(79, 76, 84, 72, 85, 66);
    pg.vertex(85, 66);
    pg.bezierVertex(88, 65, 91, 68, 90, 71);
    pg.vertex(90, 71);
    pg.bezierVertex(87, 73, 84, 77, 85, 81);
    pg.bezierVertex(85, 81, 82, 84, 82, 89);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(101, 59);
    pg.bezierVertex(105, 69, 116, 69, 110, 83);
    pg.vertex(110, 83);
    pg.bezierVertex(105, 80, 98, 80, 93, 84);
    pg.vertex(92, 83);
    pg.bezierVertex(86, 70, 97, 69, 101, 59);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(93, 84);
    pg.bezierVertex(89, 76, 91, 72, 94, 69);
    pg.vertex(93, 69);
    pg.bezierVertex(87, 72, 85, 76, 85, 81);
    pg.bezierVertex(85, 81, 85, 83, 87, 86);
    pg.bezierVertex(88, 88, 89, 88, 89, 88);
    pg.bezierVertex(89, 88, 91, 86, 93, 84);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(120, 60);
    pg.bezierVertex(123, 72, 135, 79, 125, 93);
    pg.bezierVertex(125, 93, 127, 87, 124, 81);
    pg.bezierVertex(124, 75, 118, 71, 118, 65);
    pg.vertex(118, 65);
    pg.bezierVertex(118, 63, 119, 62, 120, 60);
    pg.vertex(120, 60);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(142, 72);
    pg.bezierVertex(136, 78, 139, 89, 131, 94);
    pg.bezierVertex(126, 94, 124, 95, 124, 95);
    pg.bezierVertex(124, 95, 125, 92, 125, 92);
    pg.bezierVertex(131, 86, 131, 73, 142, 72);
    pg.vertex(142, 72);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(104, 114);
    pg.bezierVertex(108, 110, 116, 112, 121, 108);
    pg.bezierVertex(127, 104, 129, 96, 137, 96);
    pg.vertex(137, 96);
    pg.bezierVertex(133, 94, 128, 94, 124, 96);
    pg.bezierVertex(122, 98, 121, 100, 121, 100);
    pg.bezierVertex(116, 106, 107, 107, 103, 114);
    pg.vertex(104, 114);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(103, 114);
    pg.bezierVertex(105, 107, 109, 98, 117, 96);
    pg.vertex(117, 96);
    pg.bezierVertex(116, 89, 125, 89, 122, 79);
    pg.vertex(122, 78);
    pg.bezierVertex(128, 84, 127, 94, 121, 100);
    pg.bezierVertex(116, 106, 107, 107, 103, 114);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(103, 114);
    pg.vertex(103, 114);
    pg.bezierVertex(102, 110, 101, 108, 101, 104);
    pg.vertex(101, 104);
    pg.bezierVertex(102, 99, 107, 94, 111, 92);
    pg.vertex(111, 92);
    pg.bezierVertex(110, 87, 118, 86, 118, 80);
    pg.vertex(118, 81);
    pg.bezierVertex(120, 83, 121, 86, 120, 89);
    pg.bezierVertex(120, 89, 117, 92, 117, 96);
    pg.vertex(117, 96);
    pg.bezierVertex(109, 98, 105, 107, 103, 114);
    pg.vertex(103, 114);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(129, 87);
    pg.bezierVertex(129, 87, 131, 80, 135, 75);
    pg.bezierVertex(133, 72, 129, 73, 127, 75);
    pg.bezierVertex(127, 75, 128, 77, 129, 80);
    pg.bezierVertex(129, 83, 129, 86, 129, 87);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(120, 89);
    pg.bezierVertex(120, 89, 122, 87, 123, 84);
    pg.bezierVertex(123, 84, 122, 79, 122, 79);
    pg.bezierVertex(123, 79, 124, 81, 124, 81);
    pg.bezierVertex(124, 75, 118, 71, 118, 65);
    pg.vertex(117, 65);
    pg.bezierVertex(115, 65, 112, 67, 112, 70);
    pg.vertex(112, 70);
    pg.bezierVertex(116, 73, 118, 76, 118, 80);
    pg.bezierVertex(118, 80, 120, 83, 120, 89);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(113, 87);
    pg.bezierVertex(113, 87, 114, 87, 116, 85);
    pg.bezierVertex(116, 85, 118, 80, 118, 80);
    pg.bezierVertex(118, 76, 115, 71, 109, 68);
    pg.vertex(109, 68);
    pg.bezierVertex(112, 71, 114, 75, 110, 83);
    pg.bezierVertex(112, 85, 113, 87, 113, 87);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(darkColour[darkClrSelect]);
    pg.vertex(89, 88);
    pg.bezierVertex(95, 78, 108, 79, 113, 87);
    pg.bezierVertex(113, 87, 111, 88, 111, 92);
    pg.vertex(111, 92);
    pg.bezierVertex(101, 97, 101, 105, 101, 105);
    pg.vertex(101, 106);
    pg.bezierVertex(101, 106, 101, 98, 91, 93);
    pg.bezierVertex(91, 93, 92, 91, 89, 88);
    pg.endShape();
  
    pg.beginShape();
    pg.fill(lightColour[lightClrSelect]);
    pg.vertex(100, 142);
    pg.vertex(100, 129);
    pg.vertex(101, 129);
    pg.vertex(101, 142);
    pg.endShape();
  
    pg.pop();
  }


    function flower1(pg){
      //Creating the center flower
    
      let lightColour = [color(69, 128, 194),color(149, 239, 149)]; //0 = blue, 1 = green, creating colour array to choose from, learnt from p5 website array section
      let darkColour = [color(32, 59, 114), color (33,112,87)]; //0= blue, 1 = green
      let bgColour = [color(241, 87, 85),color(69, 128, 194),color(149, 239, 149)]; //creating colour array to easily switch background colours. p5 array reference page helped
      let centerDotAmount= 20; //amount of dots on each row
let centerDotSize= 1.5; //size of dots
let dotRows= 6; //how many circles of dots there are in for the dots in the center of the flower
let radius2 =10; //sets radius of ellipses   ////set to 50 to get interesting shape
let rectSize= 5; //size of center diamond
    
      pg.angleMode(DEGREES); //changing from radians
    
      //petals outer
      
      //for loop for duplicating petals and radially distributing them
    
       for (let x = 0; x < petalAmount; x++) {
        
        let angle = x * (360 / petalAmount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petalX = centerX + petals1Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petalY = centerY + petals1Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petalX, petalY); //setting the x and y position of the petal so that it follows the radial distribution
        pg.rotate(angle + 90);
      
        pg.beginShape();

        pg.fill(darkColour[darkClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
       pg.translate(-100,-100); //moving to 0,0 so rotate function works since I drew the petal at approx 100,100 for ease of drawing
        
    //petal drawing
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
      //petals inner
      //for loop for duplicating petals and radially distributing them
    
      for (let x = 0; x < petal2Amount; x++) {
        
        let angle = x * (360 / petal2Amount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petal2X = centerX + petals2Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petal2Y = centerY + petals2Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petal2X, petal2Y); //setting the x and y position of the petal so that it follows the radial distribution
        
       
          pg.rotate(angle + 90);
      
        pg.beginShape();

        pg.fill(lightColour[lightClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
        pg.scale(0.75);
        pg.translate(-100,-100);
        
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
      //petals inner 2
      //for loop for duplicating petals and radially distributing them
    
      for (let x = 0; x < petal2Amount; x++) {
        
        let angle = x * (360 / petal2Amount) - 0; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petal2X = centerX + petals2Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petal2Y = centerY + petals2Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petal2X, petal2Y); //setting the x and y position of the petal so that it follows the radial distribution
        
       
      pg.rotate(angle + 90);
      
        pg.beginShape();
        pg.fill(bgColour[bgClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
        pg.scale(0.75);
        pg.translate(-100,-100);
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
    
      //center dots background
    pg.fill(lightColour[lightClrSelect]);
    pg.stroke(0.1);
    pg.ellipse(centerX,centerY,radius2*2);
    
    // center dots
    let ringSpace = (radius2/ dotRows); ///variable for spacing out the rings of ellipses
    
    //using a nested for loop to create the rings, learnt the ring distribution through Patt Vira multiple circles with for loop youtube video and added it into the x loop so I could use it to translate my rings of radially distributed ellipses instead of regular circles like in video
    
    for (let x = 0; x < centerDotAmount; x++) { //the x loop sets the amount of dots in each ring
    for (let y = 0; y <dotRows; y ++){  //the y loop sets the amount of rings
    
      let angle2 = x * (360 / centerDotAmount)-90; //same code as written for flower2 distribution- just dividing a circle by the amount of dots and then - 90 degrees so it is always vertically symmetrical
    
    
    pg.angleMode(DEGREES);
     
      let ringDistance= ringSpace * y; //variable to make it cleaner in the lines below;
     
     let flowerDotsX = centerX + ringDistance * pg.cos(angle2);   // reusing the code I creeated for the radially distributed flowers to translate the ellipses onto a circular path
     let flowerDotsY = centerY + ringDistance * pg.sin(angle2);
    
        pg.push();
        pg.fill(darkColour[darkClrSelect]);
     
        pg.noStroke();
        pg.translate(flowerDotsX,flowerDotsY);
      
      pg.ellipse(0,0,centerDotSize); //dots
      pg.pop();
    }
    
    
    
    // center diamond or ellipse
    pg.push();
    pg.fill(lightColour[lightClrSelect]);
    pg.stroke(0);
    pg.strokeWeight(0.25);
    pg.rectMode(CENTER);
    pg.translate(centerX,centerY); //setting to center of mySymbol grid
    
    // setting up toggle between diamond or circle using if statement
    if (CenterRectSelect==true){
    pg.rotate(45); //rotating 45 degrees to make diamond
    pg.rect(0,0,rectSize);
    } 
    else {
      pg.ellipse(0,0,rectSize);
    }
    pg.pop();
    }
    
    
    }
  
    function geometricShape(pg){
      //Creating the geometric shape
    
      let lightColour = [color(69, 128, 194),color(149, 239, 149)]; //0 = blue, 1 = green, creating colour array to choose from, learnt from p5 website array section
      let darkColour = [color(32, 59, 114), color (33,112,87)]; //0= blue, 1 = green
      let bgColour = [color(241, 87, 85),color(69, 128, 194),color(149, 239, 149)]; 
    
      pg.angleMode(DEGREES); //changing from radians
    
      //petals tangent
      //for loop for duplicating petals and radially distributing them
    // pg.scale(0.9);
    // pg.translate(11,10);
       for (let x = 0; x < petalAmount; x++) {
        
        let angle = x * (360 / petalAmount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petalX = centerX + petals1Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petalY= centerY + petals1Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petalX, petalY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
          pg.rotate(angle + 90);
      
        pg.beginShape();
        pg.fill(darkColour[darkClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
        
    
        pg.translate(-100,-100);
         
    
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
      for (let x = 0; x < petalAmount; x++) {
        
        let angle = x * (360 / petalAmount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petalX = centerX + petals1Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petalY = centerY + petals1Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petalX, petalY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
          pg.rotate(angle + 90);
      
        pg.beginShape();
        pg.fill(lightColour[lightClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
        
        
        pg.translate(-100,-100);
         
    
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
      //petals inner
      //for loop for duplicating petals and radially distributing them
    
      for (let x = 0; x < petal2Amount; x++) {
        
        let angle = x * (360 / petal2Amount) - 30; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let petal2X = centerX + petals2Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let petal2Y = centerY + petals2Radius * pg.sin(angle);
    
    
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(petal2X, petal2Y); //setting the x and y position of the petal so that it follows the radial distribution
        
       
          pg.rotate(angle + 90);
      
        pg.beginShape();
        pg.fill(bgColour[bgClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
        pg.scale(0.75);
        pg.translate(-100,-100);
        pg.vertex(102,106);
        pg.bezierVertex(103,106,108,99,103,91);
        pg.bezierVertex(99,84,99,86,97,82);
        pg.vertex(97,82);
        pg.bezierVertex(96,86,97,84,93,91);
        pg.bezierVertex(88,99,93,106,93,106);
        pg.bezierVertex(93,106,97,112,103,106);
        pg.endShape();
    
        pg.pop();// ending that system 
      }
    
    
    ///triangles
    
      for (let x = 0; x < triangleAmount; x++) {
        
        let angle = x * (360 / triangleAmount) - 90; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -90 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
        let triangleX = centerX + triangleRadius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
        let triangleY = centerY + triangleRadius * pg.sin(angle);
    
       
        pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
        pg.translate(triangleX, triangleY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
          pg.rotate(angle + 90);
      
      
        pg.fill(lightColour[lightClrSelect]);
        pg.stroke(0);
        pg.strokeWeight(0.5);
    
        let triW= 5;
        let triH= 10;
        pg.triangle(0,0,-triW,triH,triW,triH);
        
        
        pg.pop();// ending that system 
      }
    
      
      // center diamond
    pg.push();
    pg.fill(bgColour[bgClrSelect]);
    pg.stroke(0);
    pg.strokeWeight(0.25);
    pg.rectMode(CENTER);
    pg.translate(centerX,centerY); //setting to center of mySymbol grid
    
    let rectSize2 = 15;
    
    pg.rotate(45); //rotating 45 degrees to make diamond
    pg.ellipse(0,0,rectSize2);
    
    pg.pop();
    
    
    
    }
    
    // function cornerGeometricShape(pg){
    //   //Creating the center flower
    
    //   let lightColour = [color(69, 128, 194),color(149, 239, 149)]; //0 = blue, 1 = green, creating colour array to choose from, learnt from p5 website array section
    //   let darkColour = [color(32, 59, 114), color (33,112,87)]; //0= blue, 1 = green
    //   let bgColour = [color(241, 87, 85),color(69, 128, 194),color(149, 239, 149)]; 
    
    //   pg.angleMode(DEGREES); //changing from radians
    
    //   //petals tangent
    //   //for loop for duplicating petals and radially distributing them
    // // pg.scale(0.9);
    // // pg.translate(11,10);
    //    for (let x = 0; x < petalAmount; x++) {
        
    //     let angle = x * (360 / petalAmount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
    //     let petalX = centerX + radius3 * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
    //     let petalY = centerY + radius3 * pg.sin(angle);
    
    
    //     pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
    //     pg.translate(petalX, petalY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
    //       pg.rotate(angle + 90);
      
    //     pg.beginShape();
    //     pg.fill(darkColour[darkClrSelect]);
    //     pg.stroke(0);
    //     pg.strokeWeight(0.5);
        
    //     if (CenterGeometric == true) {
    //       pg.translate(-75,-75);
    //     }
          
    //     else {
    //     pg.translate(-100,-100);
    //         }
    
    //     pg.vertex(102,106);
    //     pg.bezierVertex(103,106,108,99,103,91);
    //     pg.bezierVertex(99,84,99,86,97,82);
    //     pg.vertex(97,82);
    //     pg.bezierVertex(96,86,97,84,93,91);
    //     pg.bezierVertex(88,99,93,106,93,106);
    //     pg.bezierVertex(93,106,97,112,103,106);
    //     pg.endShape();
    
    //     pg.pop();// ending that system 
    //   }
    
    //   for (let x = 0; x < petalAmount; x++) {
        
    //     let angle = x * (360 / petalAmount) - 85; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
    //     let petalX = centerX + radius3 * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
    //     let petalY = centerY + radius3 * pg.sin(angle);
    
    
    //     pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
    //     pg.translate(petalX, petalY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
    //       pg.rotate(angle + 90);
      
    //     pg.beginShape();
    //     pg.fill(lightColour[lightClrSelect]);
    //     pg.stroke(0);
    //     pg.strokeWeight(0.5);
        
        
    //     pg.translate(-100,-100);
         
    
    //     pg.vertex(102,106);
    //     pg.bezierVertex(103,106,108,99,103,91);
    //     pg.bezierVertex(99,84,99,86,97,82);
    //     pg.vertex(97,82);
    //     pg.bezierVertex(96,86,97,84,93,91);
    //     pg.bezierVertex(88,99,93,106,93,106);
    //     pg.bezierVertex(93,106,97,112,103,106);
    //     pg.endShape();
    
    //     pg.pop();// ending that system 
    //   }
    
    //   //petals inner
    //   //for loop for duplicating petals and radially distributing them
    
    //   for (let x = 0; x < petal2Amount; x++) {
        
    //     let angle = x * (360 / petal2Amount) - 30; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -85 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
    //     let petal2X = centerX + petals2Radius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
    //     let petal2Y = centerY + petals2Radius * pg.sin(angle);
    
    
    //     pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
    //     pg.translate(petal2X, petal2Y); //setting the x and y position of the petal so that it follows the radial distribution
        
       
    //       pg.rotate(angle + 90);
      
    //     pg.beginShape();
    //     pg.fill(bgColour[bgClrSelect]);
    //     pg.stroke(0);
    //     pg.strokeWeight(0.5);
    //     pg.scale(0.75);
    //     pg.translate(-100,-100);
    //     pg.vertex(102,106);
    //     pg.bezierVertex(103,106,108,99,103,91);
    //     pg.bezierVertex(99,84,99,86,97,82);
    //     pg.vertex(97,82);
    //     pg.bezierVertex(96,86,97,84,93,91);
    //     pg.bezierVertex(88,99,93,106,93,106);
    //     pg.bezierVertex(93,106,97,112,103,106);
    //     pg.endShape();
    
    //     pg.pop();// ending that system 
    //   }
    
    
    // ///triangles
    
    //   for (let x = 0; x < triangleAmount; x++) {
        
    //     let angle = x * (360 / triangleAmount) - 90; //getting the distance that the flowers will be spaced out. 360/ petalAmount gives even spreading and then the -90 makes it so that it is always vertically symetrical no matter how many flowers are used.
        
    //     let triangleX = centerX + triangleRadius * pg.cos(angle);   // this sets the x and y position of each petal using cos and sin to create a circlular path and then adding the adjustable radius distance from the centre point. 
    //     let triangleY = centerY + triangleRadius * pg.sin(angle);
    
       
    //     pg.push(); //putting the petal into its own system so it doesn't use global rotation etc. 
        
    //     pg.translate(triangleX, triangleY); //setting the x and y position of the petal so that it follows the radial distribution
        
       
    //       pg.rotate(angle + 90);
      
      
    //     pg.fill(lightColour[lightClrSelect]);
    //     pg.stroke(0);
    //     pg.strokeWeight(0.5);
    
    //     let triW= 5;
    //     let triH= 10;
    //     pg.triangle(0,0,-triW,triH,triW,triH);
        
        
    //     pg.pop();// ending that system 
    //   }
    
      
    //   // center diamond
    // pg.push();
    // pg.fill(bgColour[bgClrSelect]);
    // pg.stroke(0);
    // pg.strokeWeight(0.25);
    // pg.rectMode(CENTER);
    // pg.translate(centerX,centerY); //setting to center of mySymbol grid
    
    // let rectSize2 = 15;
    
    // pg.rotate(45); //rotating 45 degrees to make diamond
    // pg.ellipse(0,0,rectSize2);
    
    // pg.pop();
    
    
    
    // }
    
   
    function filigree(pg){
      //drawing the filigree 

      let lightColour = [color(69, 128, 194),color(149, 239, 149)]; //0 = blue, 1 = green, creating colour array to choose from, learnt from p5 website array section
      let darkColour = [color(32, 59, 114), color (33,112,87)]; //0= blue, 1 = green
      let bgColour = [color(241, 87, 85),color(69, 128, 194),color(149, 239, 149)]; 

      pg.stroke(0);
      pg.strokeWeight(1);
      pg.scale(0.6);
      
  
      pg.beginShape();
      pg.fill(lightColour[lightClrSelect]);
      pg.vertex(102, 147);
      pg.bezierVertex(102, 147, 116, 154, 119, 134);
      pg.bezierVertex(119, 134, 101, 108, 99, 107);
      pg.bezierVertex(97, 106, 79, 106, 75, 95);
      pg.bezierVertex(71, 85, 76, 82, 76, 82);
      pg.bezierVertex(76, 82, 79, 92, 96, 99);
      pg.bezierVertex(112, 105, 119, 114, 122, 124);
      pg.bezierVertex(124, 134, 122, 146, 112, 150);
      pg.bezierVertex(112, 150, 108, 152, 102, 147);
      pg.endShape();
      
      pg.beginShape();
      pg.fill(darkColour[darkClrSelect]);
      pg.vertex(95, 106);
      pg.bezierVertex(95, 106, 80, 109, 72, 99);
      pg.vertex(72, 99);
      pg.bezierVertex(74, 101, 79, 101, 79, 101);
      pg.bezierVertex(79, 101, 89, 107, 95, 106);
      pg.endShape();
      
      pg.beginShape();
      pg.fill(lightColour[lightClrSelect]);
      pg.vertex(98, 127);
      pg.bezierVertex(101, 126, 114, 120, 118, 136);
      pg.bezierVertex(118, 136, 120, 129, 118, 124);
      pg.bezierVertex(116, 120, 105, 114, 98, 127);
      pg.bezierVertex(98, 127, 99, 127, 99, 127); 
      pg.endShape();
      
 
      pg.beginShape();
      pg.fill(darkColour[darkClrSelect]);
      pg.vertex(108, 119);
      pg.bezierVertex(108, 119, 97, 105, 82, 121);
      pg.vertex(81, 121);
      pg.bezierVertex(86, 107, 101, 108, 101, 108);
      pg.bezierVertex(101, 108, 116, 112, 119, 125);
      pg.bezierVertex(119, 125, 115, 118, 108, 119);
      pg.endShape();
      
      pg.beginShape();
      pg.fill(darkColour[darkClrSelect]);
      pg.vertex(109, 147);
      pg.bezierVertex(109, 147, 116, 147, 118, 136);
      pg.bezierVertex(118, 136, 116, 128, 113, 127);
      pg.bezierVertex(112, 127, 119, 140, 108, 148);
      pg.endShape();
      
      pg.beginShape();
      pg.fill(darkColour[darkClrSelect]);
      pg.vertex(112, 107);
      pg.bezierVertex(117, 114, 98, 91, 98, 91);
      pg.bezierVertex(85, 72, 91, 65, 91, 65);
      pg.bezierVertex(91, 65, 78, 80, 96, 99);
      pg.bezierVertex(96, 99, 108, 102, 112, 107);
      pg.endShape();
      
      pg.beginShape();
      pg.fill(lightColour[lightClrSelect]);
      pg.vertex(120, 119);
      pg.bezierVertex(123, 127, 113, 99, 113, 99);
      pg.bezierVertex(109, 76, 117, 72, 117, 72);
      pg.bezierVertex(117, 72, 99, 81, 109, 105);
      pg.bezierVertex(109, 105, 118, 113, 120, 119);
      pg.endShape();
      
    }
    
      
    
    
    
    