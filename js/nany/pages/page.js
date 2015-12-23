define(['nany/urls', 'utils/querystring', 'utils/ajax', 'utils/extend', 'utils/log'], function (urls, querystring, ajax, extend, log) {
    'use strict';

    function getFullUrl(baseUrl, IDS, params) {
        params = extend({}, params || {});  // copy
        params.IDS = IDS;
        return baseUrl + '?' + querystring.encode(params);
    }

    /* Page class */
    function Page(name, analyze, defaultFetchParams) {
        var baseUrl = urls.getPageUrl(name);

        function fetch(IDS, params, processResponse) {
            if (typeof params === 'function' && processResponse === undefined) {
                processResponse = params;
                params = {};
            }

            var fullUrl = getFullUrl(baseUrl, IDS, params || defaultFetchParams),
                options = {
                    responseType: 'document'
                };

            ajax.get(fullUrl, options, function (response) {
                if (response.status === 200) {
                    processResponse(response.data);
                } else {
                    log('Error while fetching page ' + name + ' at ' + fullUrl + ':' + response.status);
                }
            });
        }

        function process(doc) {
            var analysis = analyze(doc);

            if (analysis) {
                log(analysis);
            }
        }

        return Object.freeze({
            name: name,
            url: baseUrl,  // base URL without query parameters
            analyze: analyze,
            process: process,
            fetch: fetch
        });
    }

    return Page;
});
