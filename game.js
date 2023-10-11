// game.js

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var mathProblems = [
  { problem: "What is 2 + 3?", answer: "5" },
  { problem: "What is 5 * 4?", answer: "20" },
  { problem: "What is 10 / 2?", answer: "5" },
  { problem: "What is 8 - 3?", answer: "5" }
];
var currentMathProblemIndex = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animateSequence(gamePattern);
}

function animateSequence(sequence) {
  for (var i = 0; i < sequence.length; i++) {
    (function(i) {
      setTimeout(function() {
        $("#" + sequence[i]).fadeOut(100).fadeIn(100);
        playSound(sequence[i]);
      }, 500 * i);
    })(i);
  }
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      if (currentMathProblemIndex < mathProblems.length) {
        displayMathProblem();
      } else {
        $("#level-title").text("Congratulations! You've completed the game.");
        setTimeout(startOver, 2000);
      }
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function displayMathProblem() {
  var currentProblem = mathProblems[currentMathProblemIndex];
  $("#math-container").show();
  $("#math-problem").text(currentProblem.problem);
  $("#math-answer").show();
}

$("#check-answer").click(function() {
  var userAnswer = $("#math-answer").val().trim();
  var currentProblem = mathProblems[currentMathProblemIndex];

  if (userAnswer === currentProblem.answer) {
    currentMathProblemIndex++;
    $("#math-answer").val("");
    $("#math-container").hide();
    nextSequence();
  } else {
    alert("Incorrect answer. Try again.");
  }
});

$(document).keypress(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  currentMathProblemIndex = 0;
  started = false;
  $("#math-answer").hide();
  $("#level-title").text("Press A Key to Start");
}

