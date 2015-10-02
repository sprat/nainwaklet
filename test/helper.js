define(function () {
    /*
    function getJSLintWarnings(source) {
        var analysis = jslint(source),
            sourceLines = source.split(/\r?\n/g),
            warnings = [];

        analysis.warnings.forEach(function (warning) {
            var str = '@ line ' + warning.line + ' column ' + warning.column + ': '
                    + warning.message + '\n'
                    + sourceLines[warning.line];
            warnings.push(str);
        });

        return warnings.join('\n\n');
    }
    */

    function parseHTMLDocument(html) {
        /*
        var parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
        */
        var doc = document.implementation.createHTMLDocument('');
        doc.open();
        doc.write(html);
        doc.close();
        return doc;
    }

    // module API
    return {
        parseHTMLDocument: parseHTMLDocument
    };
});