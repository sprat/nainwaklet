define(['nany/urls', 'utils/htmldocument', 'utils/querystring', 'utils/ajax', 'utils/extend', 'utils/log'], function (urls, htmldocument, querystring, ajax, extend, log) {
    'use strict';

    // TODO: put that in config
    var ringUpdateUrl = 'http://httpbin.org/post';
    //var ringUpdateUrl =  'http://dordogne.nainwak.free.fr/idee.php'

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
            var data = JSON.stringify({
                    user: user.name,
                    //pass: 'XXXXXXX',  TODO: user password
                    url: doc.location.href,
                    content: htmldocument.serialize(doc),
                    date: date
                }),
                options = {
                    contentType: 'application/json'
                };

            if (!ringUpdateUrl) {
                return;
            }

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
