var assert = require('assert');

require('./Object.map');


var source = { a: 1, b: 2 };
function sum(x) { return x + x };

assert.deepEqual(source.map(sum), { a: 2, b: 4 });
assert.deepEqual(source.map(undefined, sum), { aa: 1, bb: 2 });
assert.deepEqual(source.map(sum, sum), { aa: 2, bb: 4 });
