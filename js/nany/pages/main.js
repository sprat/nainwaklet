define(['./detect', './invent', 'utils/array'], function (detect, invent, array) {
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

    /*
    Page('even', log, {duree: 240, type: 'ALL'}),
    Page('perso', log),
    Page('invent', log),
    Page('encyclo', log)
    */
    return Pages([detect, invent]);
});