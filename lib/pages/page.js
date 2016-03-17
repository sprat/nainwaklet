var urls = require('../urls'),
    querystring = require('querystring'),
    xhr = require('xhr'),
    extend = require('xtend/mutable');

function getFullUrl(pageUrl, IDS, params) {
    params = extend({}, params);  // copy
    params.IDS = IDS;
    return window.location.origin + pageUrl + '?' + querystring.stringify(params);
}

/* Page class */
function Page(type, analyze, fetchParameters) {
    if (typeof analyze !== 'function' && fetchParameters === undefined) {
        fetchParameters = analyze;
        analyze = undefined;
    }

    var pageUrl = urls.getPageUrl(type);
    fetchParameters = fetchParameters || {};

    function fetch(IDS, params, processResponse) {
        if (typeof params === 'function' && processResponse === undefined) {
            processResponse = params;
            params = {};
        }

        var fullUrl = getFullUrl(pageUrl, IDS, params || fetchParameters),
            options = {
                responseType: 'document'
            };

        xhr.get(fullUrl, options, function (error, response) {
            processResponse(response);
        });
    }

    return Object.freeze({
        type: type,
        url: pageUrl,  // base URL without query parameters
        analyze: analyze,
        fetch: fetch
    });
}

module.exports = Page;
