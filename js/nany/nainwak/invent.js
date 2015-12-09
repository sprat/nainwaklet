define(['./page', 'utils/log'], function (Page, log) {
    /* invent page */
    'use strict';

    function post(url, data, processResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);  // async
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                processResponse({
                    status: xhr.status,
                    response: xhr.response
                });
            }
        };
        xhr.send(data);
    }

    function getSource(doc) {
        return doc.documentElement.innerHTML;
    }

    function analyze(doc) {
        var source = getSource(doc);
        post('http://httpbin.org/post', source, function(response) {
            log('POST response received...');
            log(response);
        });
        return 'POST request sent...';
    }

    return Page('invent', analyze, {});
});