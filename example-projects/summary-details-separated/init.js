
window.onload = function () {
  debugger;

  // update initial UI from state
  const detailsEl = document.getElementById('component');
  detailsEl.open = componentInfo.isOpen;

  const summaryEl = detailsEl.children[0];
  summaryEl.innerHTML = componentInfo.summaryText;

  const pEl = detailsEl.children[1];
  pEl.innerHTML = componentInfo.mainText;

  // log initial state
  const copiedState = JSON.parse(JSON.stringify(componentInfo));
  log.push({ initialComponentInfo: copiedState });
}
