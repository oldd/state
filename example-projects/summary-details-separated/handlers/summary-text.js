function summaryTextHandler() {
  debugger;
  // read user input
  const newSummaryText = document.getElementById('new-summary-text').value;
  // update state
  componentInfo.summaryText = newSummaryText;
  // update UI from state
  const detailsEl = document.getElementById('component');
  const summaryEl = detailsEl.children[0];
  summaryEl.innerHTML = componentInfo.summaryText;
  // log interaction
  const copyOfState = JSON.parse(JSON.stringify(componentInfo));
  log.push({
    handler: 'summary text',
    newSummaryText,
    componentInfo: copyOfState
  })
}
