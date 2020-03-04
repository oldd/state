// stepping through in the debugger will be helpful
// this one is a real challenge!
// hint: try using nested loops

const table = (id, x, y) => { };


const testTableComponent = (component, id, x, y) => {
  console.assert(component.id === id, 'component.id  --  ' + id);
  console.assert(component.children.length === x, 'component.children.length');
  for (let i = 0; i < x; i++) {
    const row = component.children[i];
    console.assert(row.nodeName === 'TR', `component.children[${i}].nodeName`);
    console.assert(row.children.length === y, `component.children[${i}].children.length`);
    for (let j = 0; j < y; j++) {
      const cell = row.children[j];
      console.assert(cell.nodeName === 'TD', `component.children[${i}].children[${j}].nodeName`);
    }
  }
};

const id1 = 'first';
const x1 = 2, y1 = 3;
const table1 = table(id1, x1, y1);
testTableComponent(table1, id1, x1, y1);

const id2 = 'second';
const x2 = 2, y2 = 1;
const table2 = table(id2, x2, y2);
testTableComponent(table2, id2, x2, y2);

const id3 = 'third';
const x3 = 4, y3 = 4;
const table3 = table(id3, x3, y3);
testTableComponent(table3, id3, x3, y3);
