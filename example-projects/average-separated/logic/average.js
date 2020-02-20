function average(arr) {
  if (arr.length === 0) return 0;

  const sum = arr
    .reduce((sum, num) => {
      return sum + num;
    }, 0);
  const avg = sum / arr.length;
  return avg;
}

const averageTests = [
  { name: 'Test 1', args: [[0, 0, 0]], expected: 0 },
  { name: 'Test 2', args: [[0, 1]], expected: 0.5 },
  { name: 'Test 3', args: [[1, 3]], expected: 2 },
  { name: 'Test 4', args: [[1, 2, 3, 4, 5]], expected: 3 },
  { name: 'Test 5', args: [[1.5, 3.5, 9.5, 20.5]], expected: 8.75 },
  { name: 'Test 6', args: [[100, 1]], expected: 50.5 },
  { name: 'Test 7', args: [[0, 100]], expected: 50 },
  { name: 'Test 8', args: [[5, 4, 3, 2, 1]], expected: 3 },
  { name: 'Test 9', args: [[]], expected: 0 },
];

console.log('-- testing: average --');
debugger;
for (let test of averageTests) {
  const expected = test.expected;
  const actual = average(...test.args);
  const passing = actual === expected;
  console.assert(passing, test.name);
  test.actual = actual;
};
console.log(averageTests);
