/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
//const htmlBoard = document.getElementById('board');
const ResetBtn = document.getElementById('Reset');

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
var player1 = prompt('Enter Player1 Name: You will be Red');
var player2 =prompt('Enter Player2 Name: You will be blue');

function makeBoard() {

  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  // Getting top row for click Event
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //make connect 4 board
  //set the id for all cell
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
     htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
 for(let y = HEIGHT - 1;y>=0;y--){
   if(!board[y][x]){
     return y;
   }
 }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = '0px';

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  setTimeout(()=>{
    piece.style.top =  `${50 + (y)*(spot.offsetWidth + 4) + ((HEIGHT -1) - y)*2}px`;

  },1);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  let name = currPlayerName();
  
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${name} won!`);
  }

  // check for tie
  if(board.every(row => row.every(cell => cell))){
    return endGame('Tie!!!');
  }
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  currPlayer = currPlayer === 1?2:1;
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  
  function _win(cells) {
    
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }

}
ResetBtn.addEventListener('click',function(){
  board = [];
  currPlayer = 1;
  const htmlBoard = document.getElementById('board');
  htmlBoard.remove();
  const newhtmlboard = document.createElement('table');
  newhtmlboard.setAttribute("id","board");
  const gamediv = document.getElementById('game');
  gamediv.append(newhtmlboard);
  currPlayerName();
  makeBoard();
  makeHtmlBoard();

})

function currPlayerName(){
  let playerDisplay = document.getElementById('player');
  if(currPlayer === 1){
    var name = player1;
  }
  if(currPlayer === 2)
  {
    var name = player2;
  }
  playerDisplay.textContent = name;
  return name;

}

makeBoard();
makeHtmlBoard();
