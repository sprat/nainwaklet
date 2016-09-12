var urls = require('../urls'),
    qs = require('qs'),
    xhr = require('xhr'),
    extend = require('xtend/mutable');

function getFullUrl(url, IDS, params) {
    params = extend({}, params);  // copy
    params.IDS = IDS;
    return window.location.origin + url + '?' + qs.stringify(params);
}

/* Page class */
function Page(type, options) {
    var url = urls.getPageUrl(type),
        fetchParameters = options.fetchParameters || {};

    function fetch(IDS, processResponse) {
        var fullUrl = getFullUrl(url, IDS, fetchParameters),
            options = {
                responseType: 'document'
            };

        xhr.get(fullUrl, options, function (error, response) {
            processResponse(response);
        });
    }

    return Object.freeze({
        type: type,
        url: url,  // e.g. /jeu/invent.php, without query parameters
        analyze: options.analyze,
        enhance: options.enhance,
        fetch: fetch
    });
}

module.exports = Page;
