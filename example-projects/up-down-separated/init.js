window.onload = () => {
  debugger;
  // log initial state
  const copiedState = JSON.parse(JSON.stringify(numbers));
  log.push({ initialNumbers: copiedState });

  // render initial UI from state
  document.getElementById('current-number').innerHTML = numbers.current;
}
