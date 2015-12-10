define(['nany/urls', 'utils/querystring', 'utils/ajax', 'utils/extend', 'utils/log'], function (urls, querystring, ajax, extend, log) {
    'use strict';

    /* Page class */
    function Page(name, analyze, loadParams, ringUpdateUrl) {
        var baseUrl = urls.gameUrl(name);

        function getUrl(IDS) {
            var params = {
                IDS: IDS
            };
            if (loadParams) {
                extend(params, loadParams);
            }
            return baseUrl + '?' + querystring.encode(params);
        }

        function fetch(IDS) {
            var fullUrl = getUrl(IDS),
                options = {
                    responseType: 'document'
                };

            ajax.get(fullUrl, options, function (response) {
                if (response.status === 200) {
                    process(response.data);
                } else {
                    log('Error while fetching page ' + name + ' at ' + fullUrl + ':' + response.status);
                }
            });
        }

        function process(doc) {
            var analysis;

            log('Processing ' + name);

            analysis = analyze(doc);
            if (analysis) {
                log(analysis);
            }

            sendRingUpdate(doc);
        }

        function sendRingUpdate(doc) {
            var source = doc.documentElement.innerHTML;

            if (!ringUpdateUrl) {
                return;
            }

            ajax.post(ringUpdateUrl, source, function (response) {
                log('POST response received...');
                log(response);
            });

            log('POST request sent...');
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
