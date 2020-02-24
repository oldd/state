function resetHandler() {
  // debugger;

  // update state
  dictionary.words = [];
  dictionary.query = '';
  dictionary.result = '';

  // re-render UI from state
  document.getElementById('word').value = '';
  document.getElementById('query-field').value = '';
  document.getElementById('result').innerHTML = '';

  // log user interaction
  //  user story name, user input, copy of state
  log.push({
    handler: 'reset',
    dictionary: JSON.parse(JSON.stringify(dictionary))
  })

}
