
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

// Starting press any key
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

// User input
$(".btn").click(function() {

  var userColour = this.id;
  userPattern.push(userColour);

  playSound(userColour);
  animatePress(userColour);

  checkAnswer(userPattern.length-1);
});


// Checking userPattern(current-Colour) with gamePattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


// computer's inputs
function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Add animation effect of button
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

// Add sound effect
function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Play again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
