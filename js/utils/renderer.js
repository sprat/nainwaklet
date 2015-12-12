define(['./extend'], function (extend) {
    /* HTML utilities */
    'use strict';

    function renderer(document) {
        function text(str) {
            return document.createTextNode(str);
        }

        function create(name, children, options) {
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

        create.text = text;

        return create;
    }

    return renderer;
});