"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector(".message").textContent = "No Number";
    displayMessage("No Number!");
  } else if (guess === secretNumber) {
    // document.querySelector(".message").textContent = "Correct Number!";
    displayMessage("Correct Number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess > secretNumber ? "Too High!" : "Too Low!";

      displayMessage(guess > secretNumber ? "Too High!" : "Too Low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You Lost The Game");
      document.querySelector(".score").textContent = 0;
    }
    // } else if (guess > secretNumber) {
    //   if (score > 1) {
    //     // document.querySelector(".message").textContent = "Too High ";
    //     displayMessage("Too High!");
    //     score--;
    //     document.querySelector(".score").textContent = score;
    //   } else {
    //     // document.querySelector(".message").textContent = "You Lost The Game";
    //     displayMessage("You Lost The Game");
    //     document.querySelector(".score").textContent = 0;
    //   }
    // } else if (guess < secretNumber) {
    //   if (score > 1) {
    //     // document.querySelector(".message").textContent = "Too Low";
    //     displayMessage("Too Low!");
    //     score--;
    //     document.querySelector(".score").textContent = score;
    //   } else {
    //     // document.querySelector(".message").textContent = "You Lost The Game";
    //     displayMessage("You Lost The Game");
    //     document.querySelector(".score").textContent = 0;
    //   }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // document.querySelector(".message").textContent = "Start Guessing....";
  displayMessage("Start Guessing....");
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
