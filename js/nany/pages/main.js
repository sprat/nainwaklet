define(['./page', './detect', 'utils/array'], function (Page, detect, array) {
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

    var invent = Page('invent'),
        perso = Page('perso'),
        encyclo = Page('encyclo'),
        even = Page('even', {
            fetchParams: {
                duree: 240,
                type: 'ALL'
            }
        });

    return Pages([detect, invent, perso, encyclo, even]);
});