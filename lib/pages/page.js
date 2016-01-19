var urls = require('../urls'),
    querystring = require('../utils/querystring'),
    ajax = require('../utils/ajax'),
    extend = require('xtend/mutable'),
    log = require('../utils/log');


function getFullUrl(baseUrl, IDS, params) {
    params = extend({}, params);  // copy
    params.IDS = IDS;
    return baseUrl + '?' + querystring.encode(params);
}

/* Page class */
function Page(name, options) {
    options = options || {};

    var baseUrl = urls.getPageUrl(name),
        analyze = options.analyze,
        defaultFetchParams = options.fetchParams || {};

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
        var analysis;

        if (analyze) {
            log('Analyzing ' + name);
            analysis = analyze(doc);
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


module.exports = Page;
