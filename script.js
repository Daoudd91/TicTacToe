let grid = ["", "", "", "", "", "", "", "", ""]; //the grid that contains x's and o's
const winningConditions = [
  // the possible winning patterns by indices of x or o
  "012",
  "345",
  "678",
  "036",
  "147",
  "258",
  "048",
  "246",
];

function Player(char) {
  this.char = char; // char X or O
  this.score = 0;
  this.locations = "";

  this.play = function (index) {
    if (grid[index] === "") {
      grid[index] = this.char;
      if (this.locations === "") {
        this.locations += index;
      } else {
        this.locations += index;
        this.locations = this.locations.split("").sort().join(""); // because the winning conditions are sorted by index number
      }
      togglePlayerTurn(); // give the round to the other player

      // now check if i win !!
      if (this.didIWon()) {
        this.score++;
        writeScores();
        modalShow(this.char + " Player Won !!!");
      } else {
        if (isComplete()) {
          modalShow("Draw !!!");
        }
      }
    }
  };

  this.didIWon = function () {
    return winningConditions.some((x) => test(this.locations, x));
  };

  this.resetLocations = function () {
    // reset locations for a new round
    this.locations = "";
  };

  this.resetPlayer = function () {
    this.locations = "";
    this.score = 0;
  };
}

function togglePlayerTurn() {
  playerTurn = playerTurn == xPlayer ? oPlayer : xPlayer;
}

function newRound() {
  grid.fill("");
  xPlayer.resetLocations();
  oPlayer.resetLocations();
}

function resetGame() {
  grid.fill("");
  xPlayer.resetPlayer();
  oPlayer.resetPlayer();
  resetUI();
  resetScores();
}

function isComplete() {
  return !grid.includes("");
}

function writeScores() {
  document.querySelector("#xScore").innerHTML = xPlayer.score;
  document.querySelector("#oScore").innerHTML = oPlayer.score;
}
function resetScores() {
  document.querySelector("#xScore").innerHTML = 0;
  document.querySelector("#oScore").innerHTML = 0;
}

function resetUI() {
  document.querySelectorAll(".cell").forEach((item) => {
    // first remove O's and X's:
    item.innerHTML = "";
    item.classList.add("empty");
  });
}

function modalShow(message) {
  let modal = document.querySelector(".modal");
  document.querySelector(".message").innerHTML = message;
  modal.style.display = "block";
  modal.style.animation = "appear 0.5s";
}

function modalHide() {
  let modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.style.animation = "vanish 0.5s";
  newRound();
  resetUI();
}

function test(string, substring) {
  // check if all characters in substring are exists in string
  var letters = [...string];
  return [...substring].every((x) => {
    var index = letters.indexOf(x);
    if (~index) {
      letters.splice(index, 1);
      return true;
    }
  });
}

let xPlayer = new Player("X");
let oPlayer = new Player("O");
let playerTurn = xPlayer; // start with x turn

document.querySelectorAll(".cell").forEach((item) => {
  item.addEventListener("click", function () {
    if (item.classList.contains("empty")) {
      item.innerHTML = playerTurn.char;
      item.style.color = "black";
      item.classList.remove("empty");
      playerTurn.play(+item.id);
    }
  });

  item.addEventListener("mouseenter", function () {
    if (item.classList.contains("empty")) {
      item.innerHTML = playerTurn.char;
      item.style.color = "rgba(170, 170, 170, 0.5)";
    }
  });

  item.addEventListener("mouseleave", function () {
    if (item.classList.contains("empty")) {
      item.innerHTML = "";
      item.style.color = "black";
    }
  });
});

document.querySelector("#modalHide").addEventListener("click", modalHide);
document.querySelector("#reset").addEventListener("click", resetGame);
