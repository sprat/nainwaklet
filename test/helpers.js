function parseHTMLDocument(html) {
    var doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;
    return doc;
    // The following implementation is not supported by PhantomJS:
    //var parser = new DOMParser();
    //return parser.parseFromString(html, 'text/html');
}


module.exports = {
    parseHTMLDocument: parseHTMLDocument
};
