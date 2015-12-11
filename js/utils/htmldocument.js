define(function () {
    'use strict';

    function parse(html) {
        var doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = html;
        return doc;

        // The following implementation is not supported by PhantomJS:
        //var parser = new DOMParser();
        //return parser.parseFromString(html, 'text/html');
    }

    function getDoctypeDeclaration(document) {
        var doctype = document.doctype;

        if (!doctype) {
            return '';
        }

        return [
            '<!DOCTYPE ',
            doctype.name,
            doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '',
            !doctype.publicId && doctype.systemId ? ' SYSTEM' : '',
            doctype.systemId ? ' "' + doctype.systemId + '"' : '',
            '>'
        ].join('');
    }

    function getHTML(document) {
        // Note: this implementation loses the attributes on the root tag
        return document.documentElement.outerHTML;
    }

    function serialize(document) {
        var doctype = getDoctypeDeclaration(document),
            html = getHTML(document);
        return (doctype) ? doctype + '\n' + html : html;
    }

    return {
        parse: parse,
        serialize: serialize
    };
});