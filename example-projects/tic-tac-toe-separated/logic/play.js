function play(oldPlayer, oldValue) {
  const nextPlay = {};
  if (oldValue !== null) {
    nextPlay.squareValue = oldValue;
    nextPlay.nextPlayer = oldPlayer;
  } else {
    nextPlay.squareValue = oldPlayer;
    nextPlay.nextPlayer = oldPlayer === 'X'
      ? 'O'
      : 'X';
  }
  return nextPlay;
}

const playTests = [
  { name: 'Test 1', args: ['X', null], expected: { nextPlayer: 'O', squareValue: 'X' } },
  { name: 'Test 2', args: ['O', null], expected: { nextPlayer: 'X', squareValue: 'O' } },
  { name: 'Test 3', args: ['X', 'X'], expected: { nextPlayer: 'X', squareValue: 'X' } },
  { name: 'Test 4', args: ['O', 'X'], expected: { nextPlayer: 'O', squareValue: 'X' } },
  { name: 'Test 5', args: ['X', 'O'], expected: { nextPlayer: 'X', squareValue: 'O' } },
  { name: 'Test 6', args: ['O', 'O'], expected: { nextPlayer: 'O', squareValue: 'O' } },
];

console.log('-- testing: play --');
debugger;
for (let test of playTests) {
  const expected = test.expected;
  const actual = play(...test.args);
  const nextPlayerPasses = actual.nextPlayer === expected.nextPlayer
  const squareValuePasses = actual.squareValue === expected.squareValue;
  const passing = nextPlayerPasses && squareValuePasses;
  console.assert(passing, test.name);
  test.actual = actual;
};
console.log(playTests);
