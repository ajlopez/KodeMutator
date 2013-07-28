
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
        testRun();
    });
}

// run run

function testRun() {
    kodemutator.run({ 
        setup: 'cmd /c mkdir .\\test\\temp1',
        run: 'cmd /c rmdir .\\test\\temp1',
        }, function (err, result) {
        if (err)
            console.dir(err);
        assert.ok(!err);
        assert.ok(!fs.existsSync('./test/temp1'));
        testFile();
    });
}

// run run

function testFile() {
    if (fs.existsSync('./test/temp')) {
        if (fs.existsSync('./test/temp/text.txt'));
            fs.unlinkSync('./test/temp/text.txt');
            
        fs.rmdirSync('./test/temp');
    }
        
    fs.mkdirSync('./test/temp');
    
    kodemutator.run({ 
        setup: 'xcopy .\\test\\files\\text.txt .\\test\\temp',
        file: '.\\test\\temp\\text.txt',
        options: {
            replace: { '+': '-' }
        }
        }, function (err, result) {
        if (err)
            console.dir(err);
        assert.ok(!err);
        assert.ok(fs.existsSync('./test/temp/text.txt'));
        var text = fs.readFileSync('./test/temp/text.txt').toString();
        assert.ok(text.indexOf('-') > 0);
        fs.unlinkSync('./test/temp/text.txt');
        fs.rmdirSync('./test/temp');
    });
}

