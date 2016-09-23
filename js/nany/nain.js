var qs = require('qs');

function get(menuDocument) {
    var querystring = menuDocument.location.search.substring(1);
    var ids = qs.parse(querystring).IDS;

    // TODO: nom, avatar
    return {
        ids: ids
    };
}

module.exports = {
    get: get
};
