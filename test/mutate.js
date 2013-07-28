
var kodemutator = require('../lib/kodemutator'),
    assert = require('assert');
    
// mutate as function

assert.ok(kodemutator.mutate);
assert.equal(typeof kodemutator.mutate, 'function');

// no mutations

var text = "a + b + c + d";
var result = kodemutator.mutate(text);

assert.equal(result, text);

