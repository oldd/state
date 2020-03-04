debugger;

const wordsList = (array) => {
  const ul = document.createElement('ul');
  for (let string of array) {
    const li = document.createElement('li');
    li.innerHTML = string;
    ul.appendChild(li);
  };
  return ul;
};

console.log('-- testing wordsList component --\n');


console.log('-- Test 1:\n');

const test1 = wordsList(['a', 'b', 'c']);
console.assert(test1.nodeName === 'UL', 'it should be an unordered list');
console.assert(test1.childElementCount === 3, 'it should have 3 children');

console.assert(test1.children[0].nodeName === 'LI', '.children[0].nodeName should be LI');
console.assert(test1.children[0].innerHTML === 'a', '.children[0].innerHTML should be "a"');

console.assert(test1.children[1].nodeName === 'LI', '.children[1].nodeName should be LI');
console.assert(test1.children[1].innerHTML === 'b', '.children[1].innerHTML should be "b"');

console.assert(test1.children[2].nodeName === 'LI', '.children[2].nodeName should be LI');
console.assert(test1.children[2].innerHTML === 'c', '.children[2].innerHTML should be "c"');


console.log('-- Test 2:\n');

const test2 = wordsList([';lkj', 'asdf']);
console.assert(test2.nodeName === 'UL', 'it should be an unordered list');
console.assert(test2.childElementCount === 2, 'it should have 2 children');

console.assert(test2.children[0].nodeName === 'LI', '.children[0].nodeName should be LI');
console.assert(test2.children[0].innerHTML === ';lkj', '.children[0].innerHTML should be ";lkj"');

console.assert(test2.children[1].nodeName === 'LI', '.children[1].nodeName should be LI');
console.assert(test2.children[1].innerHTML === 'asdf', '.children[1].innerHTML should be "asdf"');


console.log('-- Test 3:\n');

const test3 = wordsList(['chunky']);
console.assert(test3.nodeName === 'UL', 'it should be an unordered list');
console.assert(test3.childElementCount === 1, 'it should have 1 children');

console.assert(test3.children[0].nodeName === 'LI', '.children[0].nodeName should be LI');
console.assert(test3.children[0].innerHTML === 'chunky', '.children[0].innerHTML should be "chunky"');


console.log('-- Test 4:\n');

const test4 = wordsList([]);
console.assert(test4.nodeName === 'UL', 'it should be an unordered list');
console.assert(test4.childElementCount === 0, 'it should have 0 children');
