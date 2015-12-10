define(['./urls', 'utils/querystring', 'utils/ajax', 'utils/extend'], function (urls, querystring, ajax, extend) {
    'use strict';

    /* Page class */
    function Page(name, analyze, loadParams) {
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

        function fetch(IDS, processResult) {
            var fullUrl = getUrl(IDS),
                options = {
                    responseType: 'document'
                };

            ajax.get(fullUrl, options, function (response) {
                var result = null;
                if (response.status === 200) {
                    result = analyze(response.data);
                }
                processResult(result);
            });
        }

        return Object.freeze({
            name: name,
            url: baseUrl,  // base URL without query parameters
            analyze: analyze,
            fetch: fetch
        });
    }

    return Page;
});
