/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "UP":38,
    "DOWN":40,
    "LEFT":37,
    "RIGHT":39,
    "W":87,
    "A":65,
    "S":83,
    "D":68,
  };
  var BOARD_WIDTH = $("#board").width() - $("#walker").width();
  var BOARD_HEIGHT = $("#board").height() - $("#walker").height();
  var LEFT_SIDE = 0;
  var TOP_SIDE = 0;
  
  // Game Item Objects


  // one-time setup
  var positionX=0;
  var positionY=0;
  var speedX=0;
  var speedY=0;
  var secondPositionX=390;
  var secondPositionY=390;
  var secondSpeedX=0;
  var secondSpeedY=0;
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    repositionPlayerTwo();
    setBoundary();
    redrawGameItem();
    redrawPlayerTwo();
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      speedX = -5;
    }

    else if (event.which === KEY.RIGHT){
      speedX = 5;
    }
    else if (event.which === KEY.UP){
      speedY = -5;
    }
    else if (event.which === KEY.DOWN){
      speedY = 5;    
    }
    else if (event.which === KEY.W){
      secondSpeedY = -5;
    }
    else if (event.which === KEY.A){
      secondSpeedX = -5;
    }
    else if (event.which === KEY.S){
      secondSpeedY = 5;
    }
    else if (event.which === KEY.D){
      secondSpeedX = 5;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

 function repositionGameItem(){
   positionY += speedY;
   positionX += speedX;
  }

 function repositionPlayerTwo(){
  secondPositionY += secondSpeedY;
  secondPositionX += secondSpeedX;
 }

  function redrawGameItem(){
    $("#walker").css("top", positionY);
    $("#walker").css("left", positionX);
  
  }

  function redrawPlayerTwo(){
    $("#playerTwo").css("top", secondPositionY);
    $("#playerTwo").css("left", secondPositionX);
  }
  function handleKeyUp(){
    speedX =0;
    speedY =0;
    secondSpeedX=0;
    secondSpeedY=0;
  }
 function setBoundary(){
  //checking the position of the walker
  if (positionX >= BOARD_WIDTH){
   positionX = BOARD_WIDTH;
  }
  if ( positionX <= LEFT_SIDE){
    positionX =  LEFT_SIDE;
  }
  if (positionY >= BOARD_HEIGHT){
  positionY = BOARD_HEIGHT;
 }
  if (positionY <= TOP_SIDE ){
  positionY = TOP_SIDE;
 }//checking the position of player two
 if (secondPositionX >= BOARD_WIDTH){
  secondPositionX = BOARD_WIDTH;
 }
 if (secondPositionX <= LEFT_SIDE){
  secondPositionX = LEFT_SIDE;
 }
 if(secondPositionY >= BOARD_HEIGHT){
  secondPositionY = BOARD_HEIGHT;
 }
 if(secondPositionY <= TOP_SIDE){
  secondPositionY = TOP_SIDE;
 }
 }
 

}
