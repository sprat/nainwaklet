define(['module', 'nany/urls', 'utils/htmldocument', 'utils/querystring', 'utils/ajax', 'utils/extend', 'utils/log'], function (module, urls, htmldocument, querystring, ajax, extend, log) {
    'use strict';

    var ringUpdateUrl = module.config().ringUpdateUrl;

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

        function process(doc, user) {
            var date = Date.now(),  // unix timestamp
                analysis;

            log('Processing ' + name);

            analysis = analyze(doc);
            if (analysis) {
                log(analysis);
            }

            sendRingUpdate(doc, date, user);
        }

        function sendRingUpdate(doc, date, user) {
            var canSend = ringUpdateUrl && user && user.password,
                options = { contentType: 'application/json' },
                data;

            if (!canSend) {
                return;  // don't do anything
            }

            data = JSON.stringify({
                user: user.name,
                pass: user.password,
                url: doc.location.href,
                content: htmldocument.serialize(doc),
                date: date
            });

            log('Posting page source code to ' + ringUpdateUrl);
            ajax.post(ringUpdateUrl, data, options, function (response) {
                log('Response received:');
                log(response);
            });
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
