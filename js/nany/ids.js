var qs = require('qs');

function get(doc) {
    var querystring = doc.location.search.substring(1);
    return qs.parse(querystring).IDS;
}

module.exports = {
    get: get
};
