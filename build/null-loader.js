// webfonts loader tries to load a lot of formats. woff is used for our app,
// however, the other formats will just be replaced with this, since they are
// not needed
module.exports = function(content) {
    // just have something, otherwise browser parsing will fail
    return "module.exports = " + JSON.stringify("data:application/useless-fonts;base64,nothing");
}
module.exports.raw = true;