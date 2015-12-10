define(['./page', 'utils/ajax', 'utils/log'], function (Page, ajax, log) {
    /* invent page */
    'use strict';

    function getSource(doc) {
        return doc.documentElement.innerHTML;
    }

    function analyze(doc) {
        var source = getSource(doc);
        ajax.post('http://httpbin.org/post', source, function (response) {
            log('POST response received...');
            log(response);
        });
        return 'POST request sent...';
    }

    return Page('invent', analyze, {});
});