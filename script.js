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
      togglePlayerTurn(); //now give the round to the other player

      // now check if i win !!
      if (winningConditions.includes(this.locations)) {
        this.score++;
      }
    }
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
}

function getWinner() {
  //returns "X" or "O" or "None" or "Incomplete"
  if (winningConditions.includes(xPlayer.locations)) {
    return "X";
  }
  if (winningConditions.includes(oPlayer.locations)) {
    return "O";
  }
  if (isComplete()) {
    return "None";
  }
  return "Incomplete";
}

function isComplete() {
  return !grid.includes("");
}

// now the game logic :
let xPlayer = new Player("X");
let oPlayer = new Player("O");
let playerTurn = xPlayer; // start with x turn
let roundResult = "Incomplete";
while (roundResult === "Incomplete") {}
