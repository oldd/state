function up() {
  // update state
  numbers.past.push(numbers.current);
  numbers.current += 1;

  // render to user
  document.getElementById('current-number').innerHTML = numbers.current;

  // log action for developers
  log.push({
    action: 'up',
    numbers: JSON.parse(JSON.stringify(numbers))
  });
}

function down() {
  // update state
  numbers.past.push(numbers.current);
  numbers.current -= 1;

  // render to user
  document.getElementById('current-number').innerHTML = numbers.current;

  // log action for developers
  log.push({
    action: 'down',
    numbers: JSON.parse(JSON.stringify(numbers))
  });
}
