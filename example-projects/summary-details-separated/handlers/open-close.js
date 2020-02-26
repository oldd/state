function openCloseHandler() {
  debugger;
  // read user input
  const newIsOpen = document.getElementById('toggle-is-open').checked;
  // update state
  componentInfo.isOpen = newIsOpen;
  // update UI from state
  document.getElementById('component').open = componentInfo.isOpen;
  // log interaction
  const copyOfState = JSON.parse(JSON.stringify(componentInfo));
  log.push({
    handler: 'open, close',
    newIsOpen,
    componentInfo: copyOfState
  })
}
