
let board ;

let players = ['X', 'O'];

let currentPlayer;
let available;
let resultP;
const cellSize = {
  width: 0,
  height: 0,
};

function initGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  available = [];
  if (!resultP) {
    resultP = createP('');
  }
  resultP.style('font-size', '32pt');
  cellSize.width = width / board.length;
  cellSize.height = height / board[0].length;
  currentPlayer = floor(random(players.length));
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push(`${i}_${j}`);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  initGame();
}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }

}

function nextTurn(i, j) {
  let index = available.indexOf(`${i}_${j}`);
  let spot = available.splice(index, 1)[0];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

function isCellAvailable(i, j) {
  return available.indexOf(`${i}_${j}`) !== -1;
}

function mousePressed() {
  const i = Math.floor(mouseX / cellSize.width);
  const j = Math.floor(mouseY / cellSize.height);
  if (!checkWinner() && isCellAvailable(i, j)) {
    nextTurn(i, j);
  }
}

function keyPressed() {
  let keyIndex = -1;
  if (checkWinner() !== null && key == 'r') {
    initGame();
  }
}

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }

    }
  }

  let result = checkWinner();

  if (result != null) {
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins! Click "R" to launch new game :)`);
    }
  } else {
    resultP.html(`${players[currentPlayer]} Turn`);
  }
}

