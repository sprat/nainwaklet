define(['module', 'nany/urls', 'utils/htmldocument', 'utils/querystring', 'utils/ajax', 'utils/extend', 'utils/log'], function (module, urls, htmldocument, querystring, ajax, extend, log) {
    'use strict';

    var ringUpdateUrl = module.config().ringUpdateUrl;

    /* Page class */
    function Page(name, analyze, fetchParams) {
        var baseUrl = urls.getPageUrl(name);

        function getUrl(IDS) {
            var params = {
                IDS: IDS
            };
            if (fetchParams) {
                extend(params, fetchParams);
            }
            return baseUrl + '?' + querystring.encode(params);
        }

        function fetch(IDS, user) {
            var fullUrl = getUrl(IDS),
                options = {
                    responseType: 'document'
                };

            ajax.get(fullUrl, options, function (response) {
                if (response.status === 200) {
                    process(response.data, user);
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
