/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Varia bles7
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width() - $("#ball").width();
  const BOARD_HEIGHT = $("#board").height() - $("#ball").height();
  const LEFT_SIDE = 0;
  const TOP_SIDE = 0;
  let playerOneScore = 0;
  let playerTwoScore = 0;
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
    bounceBall(ball, leftPaddle);
    bounceBall(ball, rightPaddle);
    checkForWinner();
  }

  /*
  Called in response to events.
  */
  function handleDownKeyEvent(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = -7;
    }
    else if (event.which === KEY.S) {
      leftPaddle.speedY = 7;
    }
    else if (event.which === KEY.UP) {
      rightPaddle.speedY = -7;
    }
    else if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 7;
    }
  }
  /*resets the paddle speed on keyup event*/
  function handleUpKeyEvent() {
    leftPaddle.speedY = LEFT_SIDE;
    rightPaddle.speedY = TOP_SIDE;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  /* checks for collisions between the ball and paddles*/
  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.width;
    obj1.bottomY = obj1.y + obj1.height;
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.width;
    obj2.bottomY = obj2.y + obj2.height;

    if (obj1.leftX < obj2.rightX &&
      obj1.rightX > obj2.leftX &&
      obj1.topY < obj2.bottomY &&
      obj1.bottomY > obj2.topY) {
      return true;
    } else {  
      return false;
    }
  }
  /* bounces the ball off of the paddles*/
  function bounceBall(obj1, obj2) {
    if (doCollide(obj1, obj2)) {  
        obj1.speedX *= -1;
    }
  }
  /* checks for collisions between the ball,left,and right paddles on all four sides of the board*/
  function wallCollision(obj) {
    if (obj.x >= BOARD_WIDTH) {
      playerOneScore++;
      $("#scoreOne").text(playerOneScore);
      startBall();
    }
    if (obj.x <= LEFT_SIDE) {
      playerTwoScore++;
      $("#scoreTwo").text(playerTwoScore);
      startBall();
    }
    if (obj.y + obj.height <= BOARD_HEIGHT) {
      obj.speedY *= -1;
    }
    if (obj.y >= TOP_SIDE) {
      obj.speedY *= -1;
    }

  }
  /* changes the location and speed of the objects in the game and redraws them*/
  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  /*starts the ball at a certain position and sets the speed X, and Y at random*/
  function startBall() {
    ball.x = $("#board").width() / 2;
    ball.y = $("#board").height() / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  /*checks for which player has reached enough points to win the game*/
  function checkForWinner() {
    if (playerOneScore === 11) {
      $("#winner").text("PLAYER ONE HAS WON THE GAME!");
      endGame();
    }
    if (playerTwoScore === 11) {
      $("#winner").text("PLAYER TWO HAS WON THE GAME!");
      endGame();
    }
  }
  /* ends the game*/
  function endGame() {
          // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
   
   
   
  }

}
