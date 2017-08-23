function parseHTMLDocument(html) {
    // The following implementation is not supported in some browsers
    // (e.g. PhantomJS), so we use a more compatible implementation!
    //var parser = new DOMParser();
    //var doc = parser.parseFromString(html, 'text/html');
    var doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;

    // set the baseURI so that the links are properly parsed (they should
    // implement the Location API for some tests to pass)
    var base = doc.createElement('base');
    base.href = 'http://www.nainwak.com';
    doc.head.appendChild(base);

    return doc;
}

module.exports = parseHTMLDocument;
