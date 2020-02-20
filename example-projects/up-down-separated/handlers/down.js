function down() {
  debugger;
  // update state
  numbers.past.push(numbers.current);
  numbers.current -= 1;

  // render to user
  document.getElementById('current-number').innerHTML = numbers.current;

  // log action for developers
  log.push({
    handler: 'down',
    numbers: JSON.parse(JSON.stringify(numbers))
  });
}
