function MaybeJSON(value) {
    let jsonString = value.trim();
    if ( // optimization so we don't try to json.parse every string
    (jsonString[0] === '{' && jsonString[jsonString.length-1] === '}')
    || (jsonString[0] === '[' && jsonString[jsonString.length-1] === ']')
    ) {
        try {
            jsonString = JSON.parse(jsonString);
            return jsonString;
        } catch(e) {}
    }
    return value;
}

exports.MaybeJSON = MaybeJSON;