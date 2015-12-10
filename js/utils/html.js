define(['./extend'], function (extend) {
    /* HTML utilities */
    'use strict';

    // TODO: remove this list of tags, it takes too much space...
    var tags = [
        'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
        'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas',
        'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'data',
        'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em',
        'embed', 'eventsource', 'fieldset', 'figcaption', 'figure', 'footer',
        'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup',
        'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen',
        'label', 'legend', 'li', 'link', 'mark', 'map', 'menu', 'meta', 'meter',
        'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p',
        'param', 'pre', 'progress', 'q', 'ruby', 'rp', 'rt', 's', 'samp',
        'script', 'section', 'select', 'small', 'source', 'span', 'strong',
        'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea',
        'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul',
        'var', 'video', 'wbr'
    ];

    function decodeEntities(string) {
        // TODO: not really efficient, a regex-based implementation would be better
        var txt = document.createElement('textarea');
        txt.innerHTML = string;
        return txt.value;
    }

    function parseDocument(html) {
        var doc = document.implementation.createHTMLDocument('');
        doc.documentElement.innerHTML = html;
        return doc;

        // The following implementation is not supported by PhantomJS:
        //var parser = new DOMParser();
        //return parser.parseFromString(html, 'text/html');
    }

    function renderer(document) {
        var h = {};

        function text(str) {
            return document.createTextNode(str);
        }

        function element(name, children, options) {
            var el = document.createElement(name);

            // append the children
            if (children) {
                if (!Array.isArray(children)) {
                    children = [children];
                }

                children.forEach(function (child) {
                    if (typeof child === 'string' || child instanceof String) {
                        child = text(child);
                    }
                    el.appendChild(child);
                });
            }

            // add the options
            extend(el, options);

            return el;
        }

        h.text = text;
        tags.forEach(function (name) {
            h[name] = element.bind(null, name);
        });

        return h;
    }

    return {
        parseDocument: parseDocument,
        decodeEntities: decodeEntities,
        renderer: renderer
    };
});