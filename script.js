let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let startBtn = document.querySelector("#start-btn");
let startScreen = document.querySelector(".start-screen");
let mainGame = document.querySelector("main");

let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let playAgainBtn = document.querySelector("#play-again-btn");

let player1 = "";
let player2 = "";

let turnO = true; 
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//Enter name
startBtn.addEventListener("click", () => {
  if (player1Input.value.trim() === "" || player2Input.value.trim() === "") {
    alert("Please enter both player names!");
    return;
  }

  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  startScreen.classList.add("hide");
  mainGame.classList.remove("hide");
});

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `It's a Draw between ${player1} and ${player2}.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winnerSymbol) => {
  let winnerName = winnerSymbol === "O" ? player1 : player2;
  msg.innerText = `🎉 Congratulations, ${winnerName} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", () => {
  resetGame();
});

resetBtn.addEventListener("click", resetGame);

// Play Again button
playAgainBtn.addEventListener("click", () => {
  player1Input.value = "";
  player2Input.value = "";
  player1 = "";
  player2 = "";

  msgContainer.classList.add("hide");
  mainGame.classList.add("hide");
  resetGame();

  startScreen.classList.remove("hide");
  player1Input.focus();
});
