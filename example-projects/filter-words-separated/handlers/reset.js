function resetHandler() {
  debugger;

  // update state
  words.query = '';
  words.filtered = [];
  words.all = [];

  // re-render UI from state
  document.getElementById('filtered-words').innerHTML = '';
  document.getElementById('query-field').value = '';
  document.getElementById('word').value = '';

  // log user interaction
  //  user story name, user input, copy of state
  log.push({
    handler: 'reset',
    words: JSON.parse(JSON.stringify(words))
  })

}
