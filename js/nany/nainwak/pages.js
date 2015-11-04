define(['utils/array'], function (array) {
    /* Collection of pages */
    'use strict';

    function Pages(pages) {
        function byUrl(url) {
            return array.find(pages, function (page) {
                return page.url === url;
            });
        }

        function byName(name) {
            return array.find(pages, function (page) {
                return page.name === name;
            });
        }

        return Object.freeze({
            list: pages,
            byName: byName,
            byUrl: byUrl
        });
    }

    return Pages;
});