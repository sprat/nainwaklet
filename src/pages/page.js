var qs = require('qs');
var xhr = require('xhr');
var assign = require('object-assign');

function getFullUrl(url, IDS, params) {
    params = assign({}, params);  // copy
    params.IDS = IDS;
    return window.location.origin + url + '?' + qs.stringify(params);
}

/* Page class */
function Page(type, options) {
    var url = '/jeu/' + type + '.php';
    var fetchParameters = options.fetchParameters || {};

    function fetch(IDS, processResponse) {
        var fullUrl = getFullUrl(url, IDS, fetchParameters);
        var options = {
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
