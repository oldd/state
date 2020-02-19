function down() {
  debugger;
  // update state
  numbers.past.push(numbers.current);
  numbers.current -= 1;

  // render to user
  document.getElementById('current-number').innerHTML = numbers.current;

  // log action for developers
  log.push({
    userStory: 'down',
    numbers: JSON.parse(JSON.stringify(numbers))
  });
}
document.getElementById('minus-one').addEventListener('click', down);
