function queryHandler(event) {
  // debugger;
  // read user input
  const newQuery = event.target.value;

  // read state
  const words = dictionary.words;

  // search state
  const newResult = words.find(word => word.includes(newQuery));

  // update state
  dictionary.result = newResult;
  dictionary.query = newQuery;

  // display for user
  document.getElementById('result').innerHTML = dictionary.result;

  // log user interaction
  //  story name, user input, copy of state
  log.push({
    handler: 'query',
    newQuery,
    words: JSON.parse(JSON.stringify(words))
  })
}
