function removeHandler() {
  // debugger;
  // read user input
  const toRemove = document.getElementById('word').value;

  // read from state
  const query = dictionary.query;
  const oldResult = dictionary.result;
  const words = dictionary.words;

  // perform search logic
  let newResult = '';
  if (toRemove === oldResult) {
    newResult = words
      .filter(word => word !== toRemove)
      .find(word => word.includes(query));
  } else {
    newResult = oldResult;
  }

  // update state
  dictionary.words = words.filter(word => word !== toRemove);
  dictionary.result = newResult;

  // update UI using state
  document.getElementById('result').innerHTML = dictionary.result;

  // log user interaction
  //  story name, user input, copy of state
  log.push({
    handler: 'remove',
    toRemove,
    dictionary: JSON.parse(JSON.stringify(dictionary))
  })
}
