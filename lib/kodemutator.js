
var exec = require('child_process').exec,
    fs = require('fs');

function run(options, cb) {
    runSetup(options, cb);
}

function runSetup(options, cb) {
    runCommand(options.setup, function (err, result) {
        if (err) {
            cb(err);
            return;
        }
        
        runFile(options, cb);
    });
}

function runFile(options, cb) {
    if (!options.file) {
        runRun(options, cb);
        return;
    }
    
    var text = fs.readFileSync(options.file).toString();
    var newtext = mutate(text, options.options);
    fs.writeFileSync(options.file, newtext);
    
    runRun(options, cb);
}

function runRun(options, cb) {
    if (!options.run) {
        runCleanup(options, cb);
        return;
    }
    
    runCommand(options.run, function (err, result) {
        if (options.fail) {
            if (err) {
                runCleanup(options, cb);
                return;
            }

            cb('run sucessful');
            
            return;
        }
        
        if (err)
            cb(err);
            
        runCleanup(options, cb);
    });
}

function runCleanup(options, cb) {
    runCommand(options.cleanup, function (err, result) {
        if (err) {
            cb(err);
            return;
        }
        
        cb(null, null);
    });
}

function runCommand(cmd, cb) {
    if (!cmd) {
        cb(null, null);
        return;
    }
    
    exec(cmd, function (err, stdin, stdout) {
        cb(err, null);
    });
}

function mutate(text, options) {
    if (!options || !options.replace)
        return text;
    
    var replace = options.replace;
    
    var keys = Object.keys(replace);
    var nkey = Math.floor(Math.random() * keys.length);
    
    var key = Object.keys(replace)[nkey];
    
    var positions = getPositions(text, key);
    
    if (positions.length == 0)
        return text;
    
    var nposition = Math.floor(Math.random() * positions.length);
    var position = positions[nposition];
    
    var newtext = replace[key];
    
    if (Array.isArray(newtext))
        newtext = newtext[Math.floor(Math.random() * newtext.length)];
        
    return text.substring(0, position) + newtext + text.substring(position + key.length);
}

function getPositions(text, search) {
    var positions = [];
    
    for (var k = 0; k < text.length; k++)
        if (text[k] === search)
            positions.push(k);
     
    return positions;
}

module.exports = {
    mutate: mutate,
    run: run
}