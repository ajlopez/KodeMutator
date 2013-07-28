
var kodemutator = require('../lib/kodemutator'),
    assert = require('assert');
    
// mutate as function

assert.ok(kodemutator.mutate);
assert.equal(typeof kodemutator.mutate, 'function');

// no mutations

var text = "a + b + c + d";
var result = kodemutator.mutate(text);

assert.equal(result, text);

// one mutation

var result = kodemutator.mutate(text, { replace: { '+': '-' } });

assert.ok(result)
assert.notEqual(result, text);
assert.equal(result.length, text.length);
assert.ok(result.indexOf('-') > 0);
assert.equal(occurs(result, '-'), 1);

// many mutations

var counts = [];

for (var k = 0; k < 100; k++) {
    var result = kodemutator.mutate(text, { replace: { '+': '-' } });

    assert.ok(result)
    assert.notEqual(result, text);
    assert.equal(result.length, text.length);
    assert.equal(occurs(result, '-'), 1);
    
    var position = result.indexOf('-');
    
    if (counts[position])
        counts[position]++;
    else
        counts[position] = 1;     
}

assert.ok(counts[2] > 0);
assert.ok(counts[6] > 0);
assert.ok(counts[10] > 0);

function occurs(text, character) {
    var count = 0;

    for (var k = 0; k < text.length; k++)
        if (text[k] === character)
            count++;
            
    return count;
}

