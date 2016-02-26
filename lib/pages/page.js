var urls = require('../urls'),
    encodeQueryString = require('querystring2/stringify'),
    xhr = require('xhr'),
    extend = require('xtend/mutable'),
    log = require('../log');

function getFullUrl(baseUrl, IDS, params) {
    params = extend({}, params);  // copy
    params.IDS = IDS;
    return baseUrl + '?' + encodeQueryString(params);
}

/* Page class */
function Page(name, analyze, fetchParameters) {
    if (typeof analyze !== 'function' && fetchParameters === undefined) {
        fetchParameters = analyze;
        analyze = undefined;
    }

    var baseUrl = urls.getPageUrl(name);
    fetchParameters = fetchParameters || {};

    function fetch(IDS, params, processResponse) {
        if (typeof params === 'function' && processResponse === undefined) {
            processResponse = params;
            params = {};
        }

        var fullUrl = getFullUrl(baseUrl, IDS, params || fetchParameters),
            options = {
                responseType: 'document'
            };

        xhr.get(fullUrl, options, function (error, response) {
            if (response.statusCode === 200) {
                processResponse(response.body);
            } else {
                log('Error while fetching page ' + name + ' at ' + fullUrl + ':' + response.status);
            }
        });
    }

    return Object.freeze({
        name: name,
        url: baseUrl,  // base URL without query parameters
        analyze: analyze,
        fetch: fetch
    });
}

module.exports = Page;
