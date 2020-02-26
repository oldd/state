function mainTextHandler() {
  debugger;
  // read user input
  const newMainText = document.getElementById('new-main-text').value;
  // update state
  componentInfo.mainText = newMainText;
  // update UI from state
  const detailsEl = document.getElementById('component');
  const pEl = detailsEl.children[1];
  pEl.innerHTML = componentInfo.mainText;
  // log interaction
  const copyOfState = JSON.parse(JSON.stringify(componentInfo));
  log.push({
    handler: 'main text',
    newMainText,
    componentInfo: copyOfState
  })
}
