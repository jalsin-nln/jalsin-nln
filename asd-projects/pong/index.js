/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables7
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width() - $("#ball").width();
  const BOARD_HEIGHT = $("#board").height() - $("#ball").height();
  const LEFT_SIDE = 0;
  const TOP_SIDE = 0;
  const SCORE_ONE = 1;
  const SCORE_TWO = 1;
  let KEY = {
    'UP': 38,
    'DOWN': 40,
    'W': 87,
    'S': 83
  }

  // Game Item Objects
  function GamePiece(id) {
    let GameItem = {};
    GameItem.x = parseFloat($(id).css("left"));
    GameItem.y = parseFloat($(id).css("top"));
    GameItem.width = $(id).width();
    GameItem.height = $(id).height();
    GameItem.speedX = 0;
    GameItem.speedY = 0;
    GameItem.id = id;
    return GameItem;
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleDownKeyEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleUpKeyEvent);
  let rightPaddle = GamePiece("#rightPaddle");
  let leftPaddle = GamePiece("#leftPaddle");
  let ball = GamePiece("#ball");
  
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(leftPaddle);
    moveObject(rightPaddle);
    moveObject(ball);
    wallCollision(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
  }

  /*
  Called in response to events.
  */
  function handleDownKeyEvent(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = -5;
    }
    else if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
    }
    else if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
    }
    else if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
    }
  }

  function handleUpKeyEvent() {
    leftPaddle.speedY = LEFT_SIDE;
    rightPaddle.speedY = TOP_SIDE;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  

  function wallCollision(obj) {
    if (obj.x >= BOARD_WIDTH) {
      startBall();
      $("#scoreOne").text(updatedScore);
    }
    if (obj.x <= LEFT_SIDE) {
      startBall();
    }
    if (obj.y <= BOARD_HEIGHT) {
      obj.speedY = -obj.speedY;
    }
    if (obj.y >= TOP_SIDE) {
      obj.speedY = -obj.speedY;
    }

  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function startBall() {
    ball.x = $("#board").width() / 2;
    ball.y = $("#board").height() / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
