function addHandler() {
  // debugger;
  // read user input
  const newWord = document.getElementById('word').value;

  // read from state
  const query = dictionary.query;
  const oldResult = dictionary.result;

  // perform search logic
  let newResult = '';
  if (newWord.indexOf(query) >= -1) {
    newResult = newWord;
  } else {
    newResult = oldResult;
  }

  // update state
  dictionary.words.push(newWord);
  dictionary.result = newResult;

  // update UI using state
  document.getElementById('result').innerHTML = dictionary.result;

  // log user interaction
  //  story name, user input, copy of state
  log.push({
    handler: 'add',
    newWord,
    dictionary: JSON.parse(JSON.stringify(dictionary))
  })
}
