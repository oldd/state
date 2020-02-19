function placeMove(event) {
  debugger;
  // read & process user input
  const index = event.target.id;

  // read from state
  const oldSquareValue = game.board[index];
  const oldNextPlayer = game.nextPlayer;

  // perform core logic
  const newValues = play(oldNextPlayer, oldSquareValue);

  // update state
  game.nextPlayer = newValues.nextPlayer;
  game.board[index] = newValues.squareValue;

  // update UI from state
  event.target.innerHTML = game.board[index];

  // log action
  log.push({
    userStory: 'place move',
    index,
    game: JSON.parse(JSON.stringify(game))
  })
}

const gameBoard = document.getElementById('board');

for (let row of gameBoard.children) {
  for (let square of row.children) {
    square.addEventListener('click', placeMove);
  }
}
