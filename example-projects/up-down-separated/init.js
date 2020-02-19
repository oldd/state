window.onload = () => {
  debugger;
  // log initial state
  log.push({ initialNumbers: JSON.parse(JSON.stringify(numbers)) });

  // render initial UI from state
  document.getElementById('current-number').innerHTML = numbers.current;
}
