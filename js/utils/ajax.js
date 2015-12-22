define(function () {
    /* Ajax utilities */
    'use strict';

    function sendXHR(url, method, data, options, processResponse) {
        if (typeof options === 'function' && processResponse === undefined) {
            processResponse = options;
            options = {};
        }

        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);  // async

        if (options.contentType) {
            xhr.setRequestHeader("Content-Type", options.contentType);
        }

        if (options.responseType) {
            xhr.responseType = options.responseType;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  // response received and loaded
                processResponse({
                    status: xhr.status,
                    data: xhr.response
                });
            }
        };
        xhr.send(data);
    }

    function get(url, options, processResponse) {
        sendXHR(url, 'GET', null, options, processResponse);
    }

    function post(url, data, options, processResponse) {
        sendXHR(url, 'POST', data, options, processResponse);
    }

    return {
        get: get,
        post: post
    };
});
