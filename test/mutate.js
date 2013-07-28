
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

// replace not found

var result = kodemutator.mutate(text, { replace: { '*': '/' }});
assert.ok(result);
assert.equal(result, text);

function occurs(text, character) {
    var count = 0;

    for (var k = 0; k < text.length; k++)
        if (text[k] === character)
            count++;
            
    return count;
}

// many mutations, many replacements

var counts1 = [];
var counts2 = [];

for (var k = 0; k < 100; k++) {
    var result = kodemutator.mutate(text, { replace: { '+': ['-', '*'] } });

    assert.ok(result)
    assert.notEqual(result, text);
    assert.equal(result.length, text.length);
    assert.equal(occurs(result, '-') + occurs(result, '*'), 1);
    
    var position = result.indexOf('-');
    
    if (position > 0)
        if (counts1[position])
            counts1[position]++;
        else
            counts1[position] = 1;     
    
    var position = result.indexOf('*');
    
    if (position > 0)
        if (counts2[position])
            counts2[position]++;
        else
            counts2[position] = 1;     
}

assert.ok(counts1[2] > 0);
assert.ok(counts1[6] > 0);
assert.ok(counts1[10] > 0);

assert.ok(counts2[2] > 0);
assert.ok(counts2[6] > 0);
assert.ok(counts2[10] > 0);
