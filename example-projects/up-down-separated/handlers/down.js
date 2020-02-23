function down() {
  debugger;
  // update state
  numbers.past.push(numbers.current);
  numbers.current -= 1;

  // render to user
  document.getElementById('current-number').innerHTML = numbers.current;

  // log action for developers
  const copiedState = JSON.parse(JSON.stringify(numbers));
  log.push({
    handler: 'down',
    numbers: copiedState
  });
}
