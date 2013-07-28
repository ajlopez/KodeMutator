
function mutate(text, options) {
    if (!options || !options.replace)
        return text;
    
    var replace = options.replace;
    
    var keys = Object.keys(replace);
    var nkey = Math.floor(Math.random() * keys.length);
    
    var key = Object.keys(replace)[nkey];
    
    var positions = getPositions(text, key);
    var nposition = Math.floor(Math.random() * positions.length);
    var position = positions[nposition];
        
    return text.substring(0, position) + replace[key] + text.substring(position + key.length);
}

function getPositions(text, search) {
    var positions = [];
    
    for (var k = 0; k < text.length; k++)
        if (text[k] === search)
            positions.push(k);
     
    return positions;
}

module.exports = {
    mutate: mutate
}