/* Page factory */
define(['app/nainwak', 'url', 'html', 'extend'], function (nainwak, url, html, extend) {
    function createPage(name, analyze, loadParams) {
        var url = nainwak.gameUrl(name);

        function getUrl(IDS) {
            var params = {
                IDS: IDS
            };
            if (loadParams) {
                extend(params, loadParams);
            }
            return url + '?' + url.buildQueryParams(params);
        }

        function load(IDS, processResult) {
            var fullUrl = getUrl(IDS);
            html.load(fullUrl, function (response) {
                var result = null;
                if (response.status === 200) {
                    result = analyze(response.document);
                }
                processResult(result);
            });
        }

        return Object.freeze({
            name: name,
            url: url,  // base URL without query parameters
            analyze: analyze,
            load: load
        });
    }

    return createPage;
});
