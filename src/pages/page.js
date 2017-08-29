var assign = require('core-js/library/fn/object/assign');
var qs = require('qs');
var xhr = require('xhr');

/* Page class */
function Page(type, options) {
    var path = '/jeu/' + type + '.php';
    var fetchParameters = options.fetchParameters || {};

    function fetch(IDS, processResponse) {
        var params = {
            IDS: IDS
        };
        assign(params, fetchParameters);

        var fullUrl = window.location.origin + path + '?' + qs.stringify(params);
        var options = {
            responseType: 'document'
        };

        xhr.get(fullUrl, options, function (error, response) {
            processResponse(response, path, params);
        });
    }

    return Object.freeze({
        type: type,
        path: path,  // e.g. /jeu/invent.php, without query parameters
        analyze: options.analyze,
        enhance: options.enhance,
        fetch: fetch
    });
}

module.exports = Page;
