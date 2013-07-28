
function mutate(text, options) {
    if (!options || !options.replace)
        return text;
    
    var replace = options.replace;
    
    var key = Object.keys(replace)[0];
    
    var position = text.indexOf(key);
    
    return text.substring(0, position) + replace[key] + text.substring(position + key.length);
}

module.exports = {
    mutate: mutate
}