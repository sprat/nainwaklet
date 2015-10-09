/* HTML utilities */
define(['utils/extend'], function (extend) {
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

    function parseDocument(html) {
        // The HTML parsing is not supported on all the browsers, maybe we
        // should use a polyfill?
        var parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }

    function load(url, processResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);  // async
        xhr.responseType = 'document';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                processResponse({
                    status: xhr.status,
                    document: xhr.response
                });
            }
        };
        xhr.send(null);
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
        load: load,
        renderer: renderer
    };
});