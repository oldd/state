function addHandler() {
  debugger;
  // read user input
  const newWord = document.getElementById('word').value;

  // read from state
  const newAll = words.all.concat();
  const query = words.query;

  // do core logic
  newAll.push(newWord);
  const newFiltered = newAll.filter(word => word.includes(query));

  // update state
  words.filtered = newFiltered;
  words.all = newAll;

  // update UI with state
  const listEl = document.getElementById('filtered-words');
  listEl.innerHTML = '';
  const newWordsList = wordsList(words.filtered);
  listEl.appendChild(newWordsList);

  // log user interaction
  //  story name, user input, copy of state
  log.push({
    handler: 'add',
    newWord,
    words: JSON.parse(JSON.stringify(words))
  });

}
