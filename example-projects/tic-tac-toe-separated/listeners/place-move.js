const gameBoard = document.getElementById('board');

for (let row of gameBoard.children) {
  for (let square of row.children) {
    square.addEventListener('click', placeMove);
  }
}
