/* URL utilities */

function parse(url, document) {
    var doc = document || window.document,
        a = doc.createElement('a');
    // TODO: create a cache of the parser "element"
    // TODO: should we really pass a document here?
    // TODO: use the querystring module to parse the search part?
    a.href = url;
    return a;
}

function normalize(url, document) {
    return parse(url, document).href;
}


module.exports = {
    parse: parse,
    normalize: normalize
};
