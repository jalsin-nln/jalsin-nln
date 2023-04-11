/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const UP_ARROW_KEY = 38;
  const DOWN_ARROW_KEY = 40;
  const W_KEY = 87;
  const S_KEY = 83;
  // Game Item Objects
  function GamePiece(id) {
    var GamePieceInstance = {}
    GamePieceInstance.id = id;
    GamePieceInstance.x = $(id).css("left");
    GamePieceInstance.y = $(id).css("top");
    GamePieceInstance.width = $(id).width();
    GamePieceInstance.height = $(id).height();
    GamePieceInstance.speedX = 0;
    GamePieceInstance.speedY = 0;
    return GamePieceInstance;
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  var positionX =0;
  var positionY =0;
  var speedX = 0;
  var speedY = 0;
  var secondSpeedX = 0;
  var secondSpeedY = 0;
  var secondPositionX = $("#playerTwo").css("left");
  var secondPositionY = $("#playerTwo").css("top");
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    if (event.which === W_KEY) {
      speedY = 5;
    }
    if (event.which === S_KEY) {
      speedY = -5;
    }
    if (event.which === UP_ARROW_KEY) {
      secondSpeedY = 5;
    }
    if (event.which === DOWN_ARROW_KEY) {
      secondSpeedY = -5;
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
  
}
