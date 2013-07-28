
var kodemutator = require('../lib/kodemutator'),
    fs = require('fs');
    assert = require('assert');
    
// run setup

kodemutator.run({ setup: 'cmd /c mkdir .\\test\\temp1' }, function (err, result) {
    if (err)
        console.dir(err);
    assert.ok(!err);
    assert.ok(fs.existsSync('./test/temp1'));
    fs.rmdirSync('./test/temp1');
    testCleanup();
});

// run cleanup

function testCleanup() {
    kodemutator.run({ 
        setup: 'cmd /c mkdir .\\test\\temp1',
        cleanup: 'cmd /c rmdir .\\test\\temp1',
        }, function (err, result) {
        if (err)
            console.dir(err);
        assert.ok(!err);
        assert.ok(!fs.existsSync('./test/temp1'));
    });
}