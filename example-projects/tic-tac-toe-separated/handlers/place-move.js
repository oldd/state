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
    handler: 'place move',
    index,
    game: JSON.parse(JSON.stringify(game))
  })
}
