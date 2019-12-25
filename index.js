import R from 'ramda';

const issues = [
  {
    id: 16,
    sprintIds: [1, 2, 4, 5, 6],
    type: 'Project',
    value: '10100',
    title: 'test'
  },
  {
    id: 17,
    sprintIds: [1, 2, 3, 10],
    type: 'Project',
    value: '10002',
    title: 'third project with samples'
  },
  {
    id: 18,
    sprintIds: [1, 2, 4, 5.6],
    type: 'Board',
    value: '10001',
    title: 'custom project'
  },
  {
    id: 14,
    sprintIds: [],
    type: 'Project',
    value: '10000',
    title: 'SCRUM EXAMPLE PROJEFCT'
  },
  {
    id: 15,
    sprintIds: [4, 56, 7, 8, 9, 1, 2, 3],
    type: 'Board',
    value: '10001',
    title: 'custom project'
  }
];

// custom curring
// const add = (x, y, z, d) => x + y + z + d;

const curry = function(fn) {
  const arity = fn.length;
  console.log('arity', arity);

  return function f1(...args) {
    console.log('f1 args', args);
    if (args.length >= arity) {
      console.log('enough arguments');
      return fn(...args);
    }
    console.log('need more arguments');
    return function f2(...moreArgs) {
      console.log('f2', moreArgs);
      return f1(...args, ...moreArgs);
    };
  };
};

const cAdd = curry(add);
console.log(cAdd);
const cAddResult = cAdd(1, 2)(3);
const v = cAddResult(4);
console.log(v);

/* ************* NEXT EXAMPLE */

const arrMin = [1, 2, 3, 4, 5];
const min = Math.min(...arrMin);
console.log(min);

const minC = R.curry(Math.min);

console.log(minC(1)(-1)(9));
-1(9);
console.log(min(1)(2));

const minN = R.curryN(10, Math.min);
console.log(minN(1)(2)(3));

/* ************* NEXT EXAMPLE */

const arr = [1, 2, 10, 6, 7, 3];
const [lessThan, moreThan] = R.partition(x => x < 5, arr);
console.log(lessThan);
console.log(moreThan);

// R.prop

const ids = R.props([0, 'sprintIds'])(issues);
console.log(ids);
console.log(issues[0] === ids);
/* ************* NEXT EXAMPLE */
// chain

const sprintIds = R.chain(R.prop('sprintIds'))(issues);
console.log(sprintIds);

// dissoc assoc

const editedIssue = R.assocPath(['sprintIds', 2], 'EDITED TITLE')(issues[0]);
const editedIssueD = R.dissocPath(['sprintIds', 2])(issues[0]);

console.log(editedIssue);

// clamp (easy) /* ************* NEXT EXAMPLE */

const result = R.clamp(1, 10, -5);
const result2 = R.clamp(1, 10, 15);
const result3 = R.clamp(1, 10, 4);
console.log(result);

/* ************* NEXT EXAMPLE */
// converge

const validArr = [6, 3, 4, 5, 2];
const isFirstElementBiggest = elements =>
  elements[0] === elements.sort((a, b) => b - a)[0];
const sortByBiggestFirst = R.sort(R.descend(R.identity));
// (b) => b;
const isFirstElementBiggestR = R.converge(R.equals, [
  R.head,
  R.compose(R.head, sortByBiggestFirst)
])(validArr);

const Rconv = R.converge(
  (a, b, c) => {
    console.log(a, b, c);
    return [a, b, c];
  },
  [
    elements => elements.map(el => el * 2),
    elements => elements.map(el => el - 2),
    elements => elements.map(el => el / 3)
  ]
);

console.log(Rconv(validArr));
const resultC = R.head(validArr);
console.log(result);
console.log(isFirstElementBiggestR);
console.log(isFirstElementBiggest(validArr));

/* ************* NEXT EXAMPLE */
// pipes, compose

const less400 = validArr.map(el => el * 100).filter(el => el < 400);
console.log(less400);

const pcRless400 = R.filter(el => el < 400, R.map(el => el * 100)(validArr));

const mf = R.compose(
  R.tail,
  R.filter(R.flip(R.lt)(600)),
  R.map(R.multiply(100))
)(validArr);

console.log(mf);

console.log(pcRless400);

/* ************* NEXT EXAMPLE */
// R.evolve

const tomato = {
  firstName: '  Tomato ',
  data: { elapsed: 100, remaining: 1400 },
  id: 123
};
const transformations = {
  firstName: R.pipe(R.trim, R.replace(/o/g, 'OO--')),
  lastName: R.trim, // Will not get invoked.
  data: { elapsed: R.add(1), remaining: R.subtract(2100) }
};

const tResult = R.evolve(transformations, tomato);
const tx = R.evolve({
  options: R.pipe(filter, R.take(5))
});

console.log(tResult);

/* ************* NEXT EXAMPLE  R.groupBy */

const filterFN = R.pipe(
  R.prop('id'),
  el => {
    console.log(el);
    return el;
  },
  // eslint-disable-next-line no-underscore-dangle
  R.gt(R.__, 13)
);

console.log(filterFN(issues[0]));
const xs = R.pipe(R.filter(filterFN), R.groupBy(R.prop('type')));

console.log(xs(issues));
