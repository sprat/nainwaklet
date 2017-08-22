function parseHTMLDocument(html) {
    var doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = html;

    var base = doc.createElement('base');
    base.href = 'http://www.nainwak.com';
    doc.head.appendChild(base);

    return doc;
    // The following implementation is not supported by PhantomJS:
    //var parser = new DOMParser();
    //return parser.parseFromString(html, 'text/html');
}

module.exports = parseHTMLDocument;
